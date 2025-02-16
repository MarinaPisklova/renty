import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
    try {
        await connectDB();

        const { propertyId } = await request.json();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return Response.json('User ID is required', { status: 401 });
        }

        const { userId } = sessionUser;
        const user = await User.findOne({ _id: userId });
        const isBookmarked = user.bookmarks.includes(propertyId);

        return Response.json({ isBookmarked });
    } catch (error) {
        console.log(error);
        return Response.json('Something went wrong', { status: 500 });
    }
};
