import { Router, Request, Response } from 'express';
import { Users } from '../db/schemas';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';
import { auth } from '../middlewares/authenticator';

const router = Router();
const db = drizzle();

router.delete('/user/:username', auth, async (req: Request, res: Response) => {
	const deleted = await db
		.delete(Users)
		.where(eq(Users.username, req.params.username))
		.returning();

	if (deleted.length === 0) {
		res.status(500).send('An error occured while deleting the user');
		return;
	}

	res.status(204).send();
});

export default router;
