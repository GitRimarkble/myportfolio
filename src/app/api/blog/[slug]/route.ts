import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
const client = new MongoClient(uri);

export async function GET(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	try {
		await client.connect();
		const database = client.db('portfolio');
		const posts = database.collection('posts');
		
		const post = await posts.findOne({ slug: params.slug });
		
		if (!post) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 });
		}
		
		return NextResponse.json(post);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
	} finally {
		await client.close();
	}
}

export async function PUT(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	try {
		const body = await request.json();
		await client.connect();
		const database = client.db('portfolio');
		const posts = database.collection('posts');
		
		const result = await posts.updateOne(
			{ slug: params.slug },
			{ 
				$set: {
					...body,
					updatedAt: new Date()
				}
			}
		);
		
		if (result.matchedCount === 0) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 });
		}
		
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
	} finally {
		await client.close();
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	try {
		await client.connect();
		const database = client.db('portfolio');
		const posts = database.collection('posts');
		
		const result = await posts.deleteOne({ slug: params.slug });
		
		if (result.deletedCount === 0) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 });
		}
		
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
	} finally {
		await client.close();
	}
}