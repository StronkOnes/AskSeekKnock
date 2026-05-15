import { pgTable, text, timestamp, uuid, boolean, integer, pgEnum } from 'drizzle-orm/pg-core';

export const phoneOsEnum = pgEnum('phone_os', ['Android', 'IOS']);
export const commPrefEnum = pgEnum('comm_pref', ['WhatsApp', 'Email', 'Both', 'None']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  country: text('country'),
  cellNumber: text('cell_number'),
  denomination: text('denomination'),
  homeLanguage: text('home_language'),
  preferredBibleTranslation: text('preferred_bible_translation'),
  gender: text('gender'),
  phoneOs: phoneOsEnum('phone_os'),
  commPref: commPrefEnum('comm_pref').default('None'),
  termsAccepted: boolean('terms_accepted').default(false),
  privacyAccepted: boolean('privacy_accepted').default(false),
  isOnboarded: boolean('is_onboarded').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  lastActivityAt: timestamp('last_activity_at').defaultNow(),
});

export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  senderId: uuid('sender_id').references(() => users.id).notNull(),
  receiverId: uuid('receiver_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  sentAt: timestamp('sent_at').defaultNow(),
  readAt: timestamp('read_at'),
});

export const journalEntries = pgTable('journal_entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  category: text('category').notNull(), // 'Reflections' | 'Words' | 'Revelations' | 'Dreams'
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  authorId: uuid('author_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  linkUrl: text('link_url'),
  category: text('category').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const comments = pgTable('comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  postId: uuid('post_id').references(() => posts.id).notNull(),
  authorId: uuid('author_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sermons = pgTable('sermons', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  topic: text('topic'),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const personalTemplates = pgTable('personal_templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  icon: text('icon'),
  points: text('points').notNull(), // JSON string of PrayerPoint[]
  createdAt: timestamp('created_at').defaultNow(),
});

export const articles = pgTable('articles', {
  id: uuid('id').defaultRandom().primaryKey(),
  authorId: uuid('author_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  category: text('category'),
  slug: text('slug').unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const fastingSchedules = pgTable('fasting_schedules', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});
