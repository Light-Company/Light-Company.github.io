import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const rsvps = sqliteTable("rsvps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  source: text("source").notNull().default("august-20-site"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const preorderInterest = sqliteTable("preorder_interest", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  company: text("company").notNull(),
  role: text("role"),
  useCase: text("use_case"),
  robot: text("robot"),
  quantity: integer("quantity"),
  updatesOptIn: integer("updates_opt_in", { mode: "boolean" }).notNull().default(false),
  source: text("source").notNull().default("prism-order-page"),
  consentVersion: text("consent_version").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
