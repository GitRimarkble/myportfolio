import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
	try {
		const client = await clientPromise;
		const db = client.db('portfolio');
		const projects = db.collection('projects');
		
		// Get URL parameters
		const { searchParams } = new URL(request.url);
		const category = searchParams.get('category');
		const technology = searchParams.get('technology');
		const status = searchParams.get('status');

		// Build query
		const query: any = {};
		if (category) query.category = category;
		if (status) query.status = status;
		if (technology) query.technologies = technology;

		const allProjects = await projects.find(query).sort({ completionDate: -1 }).toArray();
		return NextResponse.json(allProjects);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const client = await clientPromise;
		const db = client.db('portfolio');
		const projects = db.collection('projects');
		
		const body = await request.json();
		const result = await projects.insertOne({
			...body,
			createdAt: new Date(),
			updatedAt: new Date()
		});
		
		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
	}
}