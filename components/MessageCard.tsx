'use client';

import { Message } from '@/app/messages/types';
import { useMessageContext } from '@/context/MessageContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface IMessageProps {
    message: Message;
}

export default function MessageCard({ message }: IMessageProps) {
    const [isRead, setIsRead] = useState(message.read);
    const [isDeleted, setIsDeleted] = useState(false);
    const { setUnreadCount } = useMessageContext();

    const handleReadClick = async () => {
        try {
            const res = await fetch(`/api/messages/${message._id}`, {
                method: 'PUT',
            });

            if (res.status === 200) {
                const { read } = await res.json();
                setIsRead(read);
                setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
                if (read) {
                    toast.success('Сообщение отмечено как прочитанное');
                } else {
                    toast.success('Сообщение отмечено как непрочитанное');
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Что-то пошло не так');
        }
    };

    const handleDeleteClick = async () => {
        try {
            const res = await fetch(`/api/messages/${message._id}`, {
                method: 'DELETE',
            });

            if (res.status === 200) {
                setIsDeleted(true);
                setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
                toast.success('Сообщение удалено');
            }
        } catch (error) {
            console.log(error);
            toast.error('Сообщение не было удалено');
        }
    };

    if (isDeleted) {
        return null;
    }

    return (
        <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
            {!isRead && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
                    Новые
                </div>
            )}
            <h2 className="text-xl mb-4">
                <span className="font-bold">Запрос на недвижимость:</span> {message.property.name}
            </h2>
            <p className="text-gray-700">{message.body}</p>

            <ul className="mt-4">
                <li>
                    <strong>Имя:</strong> {message.sender.username}
                </li>

                <li>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${message.email}`} className="text-blue-500">
                        {message.email}
                    </a>
                </li>
                <li>
                    <strong>Телефон:</strong>{' '}
                    <a href={`tel:${message.phone}`} className="text-blue-500">
                        {message.phone}
                    </a>
                </li>
                <li>
                    <strong>Получено:</strong> {new Date(message.createdAt).toLocaleString()}
                </li>
            </ul>
            <button
                onClick={handleReadClick}
                className={`mt-4 mr-3 ${
                    isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
                } py-1 px-3 rounded-md`}
            >
                {isRead ? 'Отметить как непрочитанное' : 'Отметить как прочитанное'}
            </button>
            <button
                onClick={handleDeleteClick}
                className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
            >
                Удалить
            </button>
        </div>
    );
}
