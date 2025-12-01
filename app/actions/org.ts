'use server'

import { z } from 'zod'
import { db } from '@/db' 
import { organizations, organizationMembers } from '@/db/schema'
import { createClient } from '@/utils/supabase/server' 
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const createOrgSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
})

export async function createOrganization(formData: FormData) {
  // FIXED: Added 'await' because createClient is now async
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to create an organization' }
  }

  const parsed = createOrgSchema.safeParse({
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return { error: 'Invalid organization name' }
  }

  const slug = parsed.data.name.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(7);

  try {
    await db.transaction(async (tx) => {
      const [newOrg] = await tx.insert(organizations).values({
        name: parsed.data.name,
        slug: slug,
      }).returning()

      await tx.insert(organizationMembers).values({
        userId: user.id,
        organizationId: newOrg.id,
        role: 'owner',
      })
    })
    
    revalidatePath('/dashboard')
    redirect(`/dashboard/${slug}`)
    
  } catch (error) {
    console.error('Failed to create org:', error)
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    return { error: 'Failed to create organization. Please try again.' }
  }
}