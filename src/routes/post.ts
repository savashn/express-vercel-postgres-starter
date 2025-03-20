import { Router, Request, Response } from 'express';
import { Posts, Users } from '../db/schemas';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { eq, or } from 'drizzle-orm';
import validator from '../middlewares/validator';
import { login, register } from '../schemas/post';
import { auth } from '../middlewares/authenticator';

const router = Router();
const db = drizzle();

router.post('/register', validator(register), async (req: Request, res: Response) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	const user: typeof Users.$inferInsert = {
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword
	};

	await db.insert(Users).values(user);

	res.status(201).send('Success');
});

router.post('/login', validator(login), async (req: Request, res: Response) => {
	const user = await db
		.select()
		.from(Users)
		.where(
			or(
				eq(Users.username, req.body.user),
				eq(Users.email, req.body.user)
			)
		)
		.limit(1);

	if (user.length === 0) {
		res.status(404).send('There is no such a user.');
		return;
	}

	const isSuccess = await bcrypt.compare(req.body.password, user[0].password);

	if (!isSuccess) {
		res.status(400).send('Invalid email or password.');
		return;
	}

	const token: string = jwt.sign({ id: user[0].id, user: user[0].username }, process.env.JWT_SECRET as string, {
		expiresIn: '1d'
	});

	res.status(200).send(token);
});

router.post('/post', auth, async (req: Request, res: Response) => {
	if (!req.user) {
		res.status(500).send('An error occured while deleting the user');
		return;
	}

	const post: typeof Posts.$inferInsert = {
		post: req.body.post,
		userId: req.user.id,
	};

	await db.insert(Posts).values(post);
	res.status(201).send('Success');
});

export default router;
