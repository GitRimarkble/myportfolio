const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
	try {
		const uri = process.env.MONGODB_URI;
		if (!uri) {
			throw new Error('MONGODB_URI is not defined');
		}

		console.log('Connecting to MongoDB...');
		const client = new MongoClient(uri);
		await client.connect();
		
		console.log('Connected successfully!');
		
		const db = client.db('portfolio');
		
		// Test Posts Collection
		const posts = db.collection('posts');
		const testPost = {
			title: 'Test Post',
			excerpt: 'This is a test post',
			content: 'Testing MongoDB connection',
			date: new Date(),
			author: 'Admin',
			tags: ['test'],
			slug: 'test-post',
			readTime: 1,
			createdAt: new Date(),
			updatedAt: new Date()
		};
		
		const result = await posts.insertOne(testPost);
		console.log('Test post created:', result.insertedId);
		
		const foundPost = await posts.findOne({ _id: result.insertedId });
		console.log('Found post:', foundPost);
		
		await client.close();
		console.log('Connection closed successfully');
	} catch (error) {
		console.error('Error:', error);
		process.exit(1);
	}
}

testConnection();