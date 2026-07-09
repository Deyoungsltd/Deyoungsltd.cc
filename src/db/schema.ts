import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ----------------------------- Enums -----------------------------
export const businessEnum = pgEnum("business", ["electronics", "bole"]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "completed",
  "cancelled",
]);

export const repairStatusEnum = pgEnum("repair_status", [
  "received",
  "diagnosed",
  "in_progress",
  "awaiting_parts",
  "repaired",
  "ready_for_pickup",
  "completed",
  "cancelled",
]);

export const messageStatusEnum = pgEnum("message_status", [
  "new",
  "read",
  "replied",
  "resolved",
]);

// ----------------------------- Admins -----------------------------
export const admins = pgTable("admins", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ----------------------------- Users -----------------------------
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  phone: text("phone"),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ----------------------------- Categories -----------------------------
export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description"),
    business: businessEnum("business").notNull(),
    image: text("image"),
    sortOrder: integer("sort_order").default(0).notNull(),
    active: boolean("active").default(true).notNull(),
  },
  (t) => ({
    businessIdx: index("categories_business_idx").on(t.business),
  })
);

// ----------------------------- Products -----------------------------
export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description"),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    image: text("image"),
    gallery: jsonb("gallery").$type<string[]>().default([]),
    categoryId: uuid("category_id").references(() => categories.id),
    business: businessEnum("business").notNull(),
    stock: integer("stock").default(0).notNull(),
    featured: boolean("featured").default(false).notNull(),
    active: boolean("active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    businessIdx: index("products_business_idx").on(t.business),
    categoryIdx: index("products_category_idx").on(t.categoryId),
  })
);

// ----------------------------- Orders -----------------------------
export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderNumber: text("order_number").notNull().unique(),
    customerName: text("customer_name").notNull(),
    customerPhone: text("customer_phone").notNull(),
    customerEmail: text("customer_email"),
    address: text("address"),
    business: businessEnum("business").notNull(),
    subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
    deliveryFee: numeric("delivery_fee", { precision: 10, scale: 2 })
      .default("0")
      .notNull(),
    total: numeric("total", { precision: 10, scale: 2 }).notNull(),
    status: orderStatusEnum("status").default("pending").notNull(),
    paymentProof: text("payment_proof"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    businessIdx: index("orders_business_idx").on(t.business),
    orderNumberIdx: index("orders_order_number_idx").on(t.orderNumber),
  })
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("product_id").references(() => products.id),
    name: text("name").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    quantity: integer("quantity").default(1).notNull(),
    notes: text("notes"),
  },
  (t) => ({
    orderIdx: index("order_items_order_idx").on(t.orderId),
  })
);

// ----------------------------- Repair Requests -----------------------------
export const repairRequests = pgTable(
  "repair_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ticketNumber: text("ticket_number").notNull().unique(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    deviceType: text("device_type").notNull(),
    brand: text("brand"),
    issueDescription: text("issue_description").notNull(),
    preferredDate: timestamp("preferred_date"),
    estimatedCost: numeric("estimated_cost", { precision: 10, scale: 2 }),
    status: repairStatusEnum("status").default("received").notNull(),
    adminNotes: text("admin_notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    ticketIdx: index("repair_ticket_idx").on(t.ticketNumber),
  })
);

// ----------------------------- Messages -----------------------------
export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  body: text("body").notNull(),
  status: messageStatusEnum("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ----------------------------- Testimonials -----------------------------
export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerName: text("customer_name").notNull(),
  business: businessEnum("business"),
  rating: integer("rating").default(5).notNull(),
  content: text("content").notNull(),
  approved: boolean("approved").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ----------------------------- Settings -----------------------------
export const settings = pgTable("settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ----------------------------- Rate Limits -----------------------------
export const rateLimits = pgTable("rate_limits", {
  ip: text("ip").notNull().primaryKey(),
  requests: integer("requests").default(0).notNull(),
  lastRequest: timestamp("last_request").defaultNow().notNull(),
});

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));