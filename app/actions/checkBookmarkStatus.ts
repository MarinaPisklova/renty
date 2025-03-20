'use server';

import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

async function checkBookmarkStatus(propertyId: string) {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        return { error: 'Вы должны войти' };
    }

    const { userId } = sessionUser;

    const user = await User.findById(userId);

    const isBookmarked = user.bookmarks.includes(propertyId);

    return { isBookmarked };
}

export default checkBookmarkStatus;
