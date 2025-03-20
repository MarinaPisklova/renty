'use client';

import bookmarkProperty from '@/app/actions/bookmarkProperty';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { RentySession } from '@/utils/authOptions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface IBookmarkButtonProps {
    propertyId: string;
}

export default function BookmarkButton({ propertyId }: IBookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const { data: session } = useSession();
    const userId = (session as RentySession)?.user?.id;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        checkBookmarkStatus(propertyId).then((res) => {
            if (res.error) toast.error(res.error);
            if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
            setLoading(false);
        });
    }, [propertyId, userId]);

    const handleClick = async () => {
        if (!userId) {
            toast.error('Вам необходимо войти, чтобы добавить объект в избранное.');
            return;
        }

        bookmarkProperty(propertyId).then((res) => {
            if (res.error) return toast.error(res.error);
            setIsBookmarked(res.isBookmarked);
            toast.success(res.message);
        });
    };

    if (loading) return <p className="text-center">Loading...</p>;

    return (
        <button
            onClick={handleClick}
            className={`${
                isBookmarked ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'
            } text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
        >
            <FaBookmark className="mr-2" />{' '}
            {isBookmarked ? 'Удалить из избранного' : 'Добавить в избранное'}
        </button>
    );
}
