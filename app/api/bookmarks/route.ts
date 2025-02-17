import connectDB from '@/config/database';
import Property from '@/models/Property';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// GET /api/bookmarks
export const GET = async () => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            return Response.json('User ID is required', { status: 401 });
        }

        const { userId } = sessionUser;
        const user = await User.findOne({ _id: userId });
        const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

        return Response.json(bookmarks);
    } catch (error) {
        console.log(error);
        return Response.json('Something went wrong', { status: 500 });
    }
};

// POST /api/bookmarks
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
        let isBookmarked = user.bookmarks.includes(propertyId);

        let message;
        if (isBookmarked) {
            user.bookmarks.pull(propertyId);
            message = 'Удалено из избранного';
            isBookmarked = false;
        } else {
            user.bookmarks.push(propertyId);
            message = 'Добавлено в избранное';
            isBookmarked = true;
        }

        await user.save();

        return Response.json({ message, isBookmarked });
    } catch (error) {
        console.log(error);
        return Response.json('Something went wrong', { status: 500 });
    }
};
