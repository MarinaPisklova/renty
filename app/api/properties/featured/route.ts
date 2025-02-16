import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/featured
export const GET = async () => {
    try {
        await connectDB();

        const properties = await Property.find({
            is_featured: true,
        });

        return Response.json({ properties, total: properties.length });
    } catch (error) {
        console.log(error);
        return Response.json('Something Went Wrong', { status: 500 });
    }
};
