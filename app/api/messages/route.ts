import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// POST /api/messages
export const POST = async (request: Request) => {
    try {
        await connectDB();
        console.log('s');

        const { name, email, phone, message, property, recipient } = await request.json();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.user) {
            return Response.json(
                { message: 'Вы должны войти, чтобы отправить сообщение' },
                { status: 401 },
            );
        }

        const { user } = sessionUser;
        if (user.id === recipient) {
            return Response.json(
                { message: 'Невозможно отправить сообщение самому себе' },
                {
                    status: 400,
                },
            );
        }

        const newMessage = new Message({
            sender: user.id,
            recipient,
            property,
            name,
            email,
            phone,
            body: message,
        });

        await newMessage.save();

        return Response.json({ message: 'Сообщение отправлено' });
    } catch (error) {
        console.log(error);
        return Response.json('Что-то пошло не так', { status: 500 });
    }
};
