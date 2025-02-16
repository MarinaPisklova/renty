'use client';

import { Property } from '@/app/properties/types';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function PropertyContactForm({ property }: { property: Property }) {
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const data = {
            name,
            email,
            phone,
            message,
            recipient: property.owner,
            property: property._id,
        };

        console.log(data, property);

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.status === 200) {
                toast.success('Сообщение отправлено');
                setWasSubmitted(true);
            } else if (res.status === 400 || res.status === 401) {
                const dataObj = await res.json();
                toast.error(dataObj.message);
            } else {
                toast.error('Что-то пошло не так');
            }
        } catch (error) {
            console.log(error);
            toast.error('Что-то пошло не так');
        } finally {
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">Связаться с владельцем</h3>
            {!session ? (
                <p>Вы должны войти в систему, чтобы отправить сообщение</p>
            ) : wasSubmitted ? (
                <p className="text-green-500 mb-4">Ваше сообщение успешно отправлено</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Имя:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Введите свое имя"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Введите свой email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="phone"
                        >
                            Телефон:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="text"
                            placeholder="Введите ваш номер телефона"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="message"
                        >
                            Сообщение:
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                            id="message"
                            placeholder="Введите ваше сообщение"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <button
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                            type="submit"
                        >
                            <FaPaperPlane className="mr-2" /> Отправить
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
