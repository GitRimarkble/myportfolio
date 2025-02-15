# MongoDB Setup Guide

## Prerequisites
1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier is sufficient)

## Setting Up MongoDB Atlas
1. Create a new project in MongoDB Atlas
2. Build a new database (choose the free shared cluster)
3. Set up database access:
   - Go to Security > Database Access
   - Add a new database user
   - Choose password authentication
   - Give appropriate permissions (readWrite)

4. Set up network access:
   - Go to Security > Network Access
   - Add your IP address or allow access from anywhere (for development)

5. Get your connection string:
   - Go to Databases > Connect
   - Choose "Connect your application"
   - Copy the connection string

## Project Configuration

1. Create a `.env.local` file in the project root:
```env
MONGODB_URI=your_mongodb_connection_string
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret
```

Replace `your_mongodb_connection_string` with the connection string from MongoDB Atlas.
Don't forget to replace `<password>` in the connection string with your database user's password.

## Database Structure

The project uses the following collections:

### Posts Collection
```javascript
{
  id: ObjectId,
  title: String,
  excerpt: String,
  content: String,
  date: Date,
  author: String,
  tags: Array<String>,
  slug: String,
  readTime: Number,
  image: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Projects Collection
```javascript
{
  id: ObjectId,
  title: String,
  description: String,
  technologies: Array<String>,
  imageUrl: String (optional),
  githubUrl: String (optional),
  liveUrl: String (optional),
  category: String,
  featured: Boolean,
  completionDate: Date,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Testing the Connection

1. Start the development server:
```bash
npm run dev
```

2. Test the API endpoints:
- Blog posts: http://localhost:3000/api/blog
- Projects: http://localhost:3000/api/projects

## Troubleshooting

1. Connection Issues:
- Verify your IP is whitelisted in MongoDB Atlas
- Check if the connection string is correct in .env.local
- Ensure the database user has correct permissions

2. Data Issues:
- Check the MongoDB Atlas dashboard for database status
- Verify collection names match the API expectations
- Check the MongoDB logs in Atlas for any errors

## Development Workflow

1. Local Development:
- Use MongoDB Compass for database visualization
- Monitor API responses in browser developer tools
- Check server logs for database operation errors

2. Production:
- Update environment variables in your hosting platform
- Ensure production IP addresses are whitelisted
- Monitor database performance in MongoDB Atlas