import { Request, Response } from 'express';
import { Posts, Users } from '../db/schemas';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';

const db = drizzle();

export const helloWorld = (req: Request, res: Response): void => {
	res.status(200).send('Hello World');
};

export const users = async (req: Request, res: Response): Promise<void> => {
	const users = await db.select().from(Users);

	if (users.length === 0) {
		res.status(404).send('Not found');
		return;
	}

	res.status(200).send(users);
};

export const posts = async (req: Request, res: Response): Promise<void> => {
	const posts = await db
		.select({
			post: Posts.post,
			user: Users.name
		})
		.from(Posts)
		.innerJoin(Users, eq(Posts.userId, Users.id));

	if (posts.length === 0) {
		res.status(404).send('Not found');
		return;
	}

	res.status(200).send(posts);
};
