import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export const revalidate = 10;

// GET all reviews
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Review');

    const data = await collection.find({}).toArray();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// POST a new review
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, son, age, description, stars, attend } = body;

    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Review');

    const result = await collection.insertOne({ name, son, age, description, stars, attend });

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
    return NextResponse.json({ error: 'Failed to insert data' }, { status: 500 });
  }
}

// DELETE a review by ID
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Review');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'No document found with that ID' }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Error deleting data from MongoDB:', error);
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}

 
export async function PATCH() {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Review');

    const options = ["Course", "Camp", "Workshop"];
    const allDocs = await collection.find({}).toArray();

    const updatePromises = allDocs.map(doc => {
      const randomForr = options[Math.floor(Math.random() * options.length)];
      return collection.updateOne(
        { _id: doc._id },
        { $set: { attend: randomForr } }
      );
    });

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true, updatedCount: updatePromises.length });
  } catch (error) {
    console.error('Error updating documents in MongoDB:', error);
    return NextResponse.json({ error: 'Failed to update documents' }, { status: 500 });
  }
}


 