import { Request, Response } from 'express';
import { Users } from '../db/schemas';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';

const db = drizzle();

export const user = async (req: Request, res: Response): Promise<void> => {
	const deleted = await db
		.delete(Users)
		.where(eq(Users.username, req.params.username))
		.returning();

	if (deleted.length === 0) {
		res.status(500).send('An error occured while deleting the user');
		return;
	}

	res.status(204).send();
};
