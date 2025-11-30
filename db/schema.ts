import { pgTable, text, timestamp, uuid, boolean, pgEnum } from "drizzle-orm/pg-core";

// Enums ensure data consistency (e.g., a role can ONLY be 'owner', 'admin', or 'member')
export const roleEnum = pgEnum("role", ["owner", "admin", "member"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "trialing", "past_due", "canceled", "unpaid"]);

// 1. PROFILES (Linked to Supabase Auth)
// This table automatically syncs with your logged-in users
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().notNull(), // This matches the auth.users ID
  email: text("email").notNull(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. ORGANIZATIONS (The Multi-Tenancy Core)
// Users don't own data directly; Organizations do.
export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(), // unique url: app.com/dashboard/google
  stripeCustomerId: text("stripe_customer_id").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 3. MEMBERS (Who belongs to which Org?)
export const organizationMembers = pgTable("organization_members", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  role: roleEnum("role").default("member").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. SUBSCRIPTIONS (The Money Maker)
export const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey().notNull(), // Stripe Subscription ID
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull()
    .unique(), // One active subscription per organization
  status: subscriptionStatusEnum("status").notNull(),
  priceId: text("price_id").notNull(),
  quantity: text("quantity"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});