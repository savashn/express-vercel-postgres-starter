import { integer, pgTable, varchar, text, serial, timestamp } from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	username: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull()
});

export const Posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	post: text('post').notNull(),
	createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => Users.id)
});
