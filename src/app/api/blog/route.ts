import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
const client = new MongoClient(uri);

export async function GET() {
	try {
		await client.connect();
		const database = client.db('portfolio');
		const posts = database.collection('posts');
		
		const allPosts = await posts.find({}).toArray();
		return NextResponse.json(allPosts);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
	} finally {
		await client.close();
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		await client.connect();
		const database = client.db('portfolio');
		const posts = database.collection('posts');
		
		const result = await posts.insertOne({
			...body,
			createdAt: new Date(),
			updatedAt: new Date()
		});
		
		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
	} finally {
		await client.close();
	}
}