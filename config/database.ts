import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    // If the database is already connected, don't connect again
    if (connected) {
        console.log('MongoDB is already connected...');
        return;
    }

    if (!process.env.MONGO_DB_URL) {
        throw new Error('MONGO_DB_URL is not defined');
    }
    // Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        connected = true;
        console.log('MongoDB connected...');
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
