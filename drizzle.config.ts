import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // This is your live connection string with the correct Project ID
    url: "postgresql://postgres:NexusProject2025@db.hhzjtowhxmruzbpmuxtw.supabase.co:5432/postgres",
  },
});