import { MongoClient } from 'mongodb';
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const { email, password } = data;

        if (!email || !email.includes('@') || !password || password.trim().length < 7) {
            res.status(422).json({ message: 'Invalid input - password should also be at least 7 chars long!' })
            return;
        }

        const client = await MongoClient.connect(`mongodb+srv://andy:123qweasd@cluster0.xwafvug.mongodb.net/my-site?retryWrites=true&w=majority`);
        const db = client.db('my-site');

        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            res.status(422).json({ message: 'User exists already' })
            client.close();
            return;
        }

        const hashedPassword = await hashPassword(password);

        const result = await db.collection('users').insertOne({
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Created user!' })
        client.close();
    }
}

export default handler;