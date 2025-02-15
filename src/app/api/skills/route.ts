import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db('portfolio');
		const skills = db.collection('skills');
		
		const allSkills = await skills.find({}).toArray();
		return NextResponse.json(allSkills);
	} catch (error) {
		console.error('Failed to fetch skills:', error);
		return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const client = await clientPromise;
		const db = client.db('portfolio');
		const skills = db.collection('skills');
		
		const result = await skills.insertOne({
			...body,
			createdAt: new Date(),
			updatedAt: new Date()
		});
		
		return NextResponse.json({ 
			id: result.insertedId, 
			...body 
		});
	} catch (error) {
		console.error('Failed to create skill:', error);
		return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
	}
}