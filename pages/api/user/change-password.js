import { getSession } from 'next-auth/client';
import { hashPassword, verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
    if (req.method !== 'PATCH') return;

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: 'Not authenticated!' })
        return;
    }
    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const client = await connectToDatabase();

    const db = client.db('my-site');
    const user = await db.collection('users').findOne({ email: userEmail });

    if (!user) {
        client.close();
        throw new Error('No user found!')
    }

    if (!verifyPassword(oldPassword, user.password)) {
        client.close();
        throw new Error('Could not log you in!')
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await db.collection('users').updateOne({ email: userEmail }, { $set: { password: hashedPassword } });

    client.close();
    res.status(200).json({ message: 'Password updated' });

}

export default handler;