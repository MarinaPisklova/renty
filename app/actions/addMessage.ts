'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function addMessage(_: { error?: string; submitted?: boolean }, formData: FormData) {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
        return { error: 'Вы должны войти, чтобы отправить сообщение' };
    }

    const { user } = sessionUser;

    const recipient = formData.get('recipient');

    if (user.id === recipient) {
        return { error: 'Невозможно отправить сообщение самому себе' };
    }

    const newMessage = new Message({
        sender: user.id,
        recipient,
        property: formData.get('property'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        body: formData.get('message'),
    });

    await newMessage.save();

    revalidatePath('/messages', 'page');
    return { submitted: true };
}

export default addMessage;
