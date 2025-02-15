import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db('portfolio');
		const posts = db.collection('posts');
		
		const allPosts = await posts.find({}).toArray();
		return NextResponse.json(allPosts);
	} catch (error) {
		console.error('Failed to fetch posts:', error);
		return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const client = await clientPromise;
		const db = client.db('portfolio');
		const posts = db.collection('posts');
		
		const result = await posts.insertOne({
			...body,
			date: new Date(),
			createdAt: new Date(),
			updatedAt: new Date()
		});
		
		return NextResponse.json({ success: true, id: result.insertedId });
	} catch (error) {
		console.error('Failed to create post:', error);
		return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
	}
}
