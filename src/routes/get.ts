import { Router, Request, Response } from 'express';
import { Posts, Users } from '../db/schemas';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';

const router = Router();
const db = drizzle();

router.get('/', (req: Request, res: Response) => {
	res.status(200).send('Hello World');
	return;
});

router.get('/users', async (req: Request, res: Response) => {
	const users = await db.select().from(Users);

	if (users.length === 0) {
		res.status(404).send('Not found');
		return;
	}

	res.status(200).send(users);
});

router.get('/posts', async (req: Request, res: Response) => {
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
});

export default router;
