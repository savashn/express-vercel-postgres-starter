import { Router, Request, Response } from 'express';
import { Users } from '../db/schemas';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { auth } from '../middlewares/authenticator';
import validator from '../middlewares/validator';
import { password } from '../schemas/put';

const router = Router();
const db = drizzle();

router.put('/password', auth, validator(password), async (req: Request, res: Response) => {
	if (!req.user) {
		res.status(405).send('Not allowed');
		return;
	}

	const users = await db
		.select({
			id: Users.id,
			password: Users.password
		})
		.from(Users)
		.where(eq(Users.id, Number(req.user.id)))
		.limit(1);

	const user = users[0];

	if (!user) {
		res.status(404).send('User not found');
		return;
	}

	const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);

	if (!isMatch) {
		res.status(400).send('Incorrect old password');
		return;
	}

	const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

	const updated = await db
		.update(Users)
		.set({
			password: hashedPassword
		})
		.where(eq(Users.id, user.id))
		.returning();

	if (updated.length === 0) {
		res.status(500).send('An error has occured');
		return;
	}

	res.status(200).send('Password updated successfully');
});

export default router;
