'use server';

import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId: string) {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        return { error: 'Вы должны войти, чтобы выполнить действие' };
    }

    const { userId } = sessionUser;

    const user = await User.findById(userId);
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
    revalidatePath('/properties/saved', 'page');
    return { message, isBookmarked };
}

export default bookmarkProperty;
