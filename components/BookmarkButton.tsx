'use client';

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

        const checkBookmarkStatus = async () => {
            try {
                const res = await fetch('/api/bookmarks/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        propertyId,
                    }),
                });

                if (res.status === 200) {
                    const data = await res.json();
                    setIsBookmarked(data.isBookmarked);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        checkBookmarkStatus();
    }, [propertyId, userId]);

    const handleClick = async () => {
        if (!userId) {
            toast.error('Вам необходимо войти, чтобы добавить объект в избранное.');
            return;
        }

        try {
            const res = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    propertyId,
                }),
            });

            if (res.status === 200) {
                const data = await res.json();
                toast.success(data.message);
                setIsBookmarked(data.isBookmarked);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
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
