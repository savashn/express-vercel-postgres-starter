import { Router, Request, Response } from 'express';
import { Users } from '../db/schemas';
import { drizzle } from 'drizzle-orm/vercel-postgres';

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

	res.send(users);
});

export default router;
