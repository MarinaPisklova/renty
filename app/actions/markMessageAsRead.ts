'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function markMessageAsRead(messageId: string) {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
        throw new Error('Вы должны войти');
    }
    const { userId } = sessionUser;

    const message = await Message.findById(messageId);

    if (!message) throw new Error('Сообщение не найдено');

    if (message.recipient.toString() !== userId) {
        throw new Error('Вы должны войти');
    }

    message.read = !message.read;

    revalidatePath('/messages', 'page');
    await message.save();
    return message.read;
}

export default markMessageAsRead;
