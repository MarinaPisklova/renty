import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/user/:userId
export const GET = async (_: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectDB();

        const userId = (await params).id;

        if (!userId) {
            return Response.json('User ID is required', { status: 400 });
        }

        const properties = await Property.find({ owner: userId });

        return Response.json(properties);
    } catch (error) {
        console.log(error);
        return Response.json('Something Went Wrong', { status: 500 });
    }
};
