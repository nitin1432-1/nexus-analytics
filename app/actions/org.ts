'use server'

import { z } from 'zod'
import { db } from '@/db' 
import { organizations, organizationMembers } from '@/db/schema'
import { createClient } from '@/utils/supabase/server' 
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Schema to validate the input
const createOrgSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
})

export async function createOrganization(formData: FormData) {
  // 1. Check if user is logged in
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to create an organization' }
  }

  // 2. Validate the input name
  const parsed = createOrgSchema.safeParse({
    name: formData.get('name'),
  })

  if (!parsed.success) {
    return { error: 'Invalid organization name' }
  }

  // 3. Generate a unique URL slug (e.g. "My Company" -> "my-company-x8z")
  const slug = parsed.data.name.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(7);

  try {
    // 4. Run the Transaction: Create Org AND add user as Owner
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
    
    // 5. Redirect to the new dashboard
    revalidatePath('/dashboard')
    redirect(`/dashboard/${slug}`)
    
  } catch (error) {
    console.error('Failed to create org:', error)
    // If it's a redirect error, re-throw it so Next.js handles the page change
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    return { error: 'Failed to create organization. Please try again.' }
  }
}