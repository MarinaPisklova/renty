import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// GET /api/messages/unread-count
export const GET = async () => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.user) {
            return Response.json('User ID is required', {
                status: 401,
            });
        }

        const { userId } = sessionUser;

        const count = await Message.countDocuments({
            recipient: userId,
            read: false,
        });

        return Response.json(count);
    } catch (error) {
        console.log(error);
        return Response.json('Something went wrong', { status: 500 });
    }
};
