import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const client = await clientPromise;
		const db = client.db('portfolio');
		const projects = db.collection('projects');
		
		const project = await projects.findOne({ _id: new ObjectId(params.id) });
		
		if (!project) {
			return NextResponse.json({ error: 'Project not found' }, { status: 404 });
		}
		
		return NextResponse.json(project);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
	}
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const body = await request.json();
		const client = await clientPromise;
		const db = client.db('portfolio');
		const projects = db.collection('projects');
		
		const result = await projects.updateOne(
			{ _id: new ObjectId(params.id) },
			{ 
				$set: {
					...body,
					updatedAt: new Date()
				}
			}
		);
		
		if (result.matchedCount === 0) {
			return NextResponse.json({ error: 'Project not found' }, { status: 404 });
		}
		
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const client = await clientPromise;
		const db = client.db('portfolio');
		const projects = db.collection('projects');
		
		const result = await projects.deleteOne({ _id: new ObjectId(params.id) });
		
		if (result.deletedCount === 0) {
			return NextResponse.json({ error: 'Project not found' }, { status: 404 });
		}
		
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
	}
}