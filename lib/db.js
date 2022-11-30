import { MongoClient } from 'mongodb';

export async function connectToDatabase () {
    const client = await MongoClient.connect(`mongodb+srv://andy:123qweasd@cluster0.xwafvug.mongodb.net/my-site?retryWrites=true&w=majority`);
    return client;
}