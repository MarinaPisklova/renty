import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// PUT /api/messages/:id
export const PUT = async (_: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectDB();

        const id = (await params).id;

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.user) {
            return Response.json('User ID is required', {
                status: 401,
            });
        }

        const { userId } = sessionUser;

        const message = await Message.findById(id);

        if (!message) return Response.json('Message Not Found', { status: 404 });

        if (message.recipient.toString() !== userId) {
            return Response.json('Unauthorized', { status: 401 });
        }

        message.read = !message.read;

        await message.save();

        return Response.json(message);
    } catch (error) {
        console.log(error);
        return Response.json('Something went wrong', { status: 500 });
    }
};

// DELETE /api/messages/:id
export const DELETE = async (_: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectDB();

        const id = (await params).id;
        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.user) {
            return Response.json('User ID is required', {
                status: 401,
            });
        }

        const { userId } = sessionUser;

        const message = await Message.findById(id);

        if (!message) return Response.json('Message Not Found', { status: 404 });

        if (message.recipient.toString() !== userId) {
            return Response.json('Unauthorized', { status: 401 });
        }

        await message.deleteOne();

        return Response.json('Message Deleted');
    } catch (error) {
        console.log(error);
        return Response.json('Something went wrong', { status: 500 });
    }
};
