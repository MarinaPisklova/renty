'use client';

import addMessage from '@/app/actions/addMessage';
import { Property } from '@/app/properties/types';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function PropertyContactForm({ property }: { property: Property }) {
    const { data: session } = useSession();
    const status = useFormStatus();
    const [submitState, formAction] = useFormState<
        { error?: string; submitted?: boolean },
        FormData
    >(addMessage, {});

    useEffect(() => {
        if (submitState.error) toast.error(submitState.error);
        if (submitState.submitted) toast.success('Сообщение отправлено');
    }, [submitState]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">Связаться с владельцем</h3>
            {!session ? (
                <p>Вы должны войти в систему, чтобы отправить сообщение</p>
            ) : submitState.submitted ? (
                <p className="text-green-500 mb-4">Ваше сообщение успешно отправлено</p>
            ) : (
                <form action={formAction}>
                    <input
                        type="hidden"
                        id="property"
                        name="property"
                        defaultValue={property._id}
                    />
                    <input
                        type="hidden"
                        id="recipient"
                        name="recipient"
                        defaultValue={property.owner}
                    />
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
                            name="name"
                            type="text"
                            placeholder="Введите свое имя"
                            required
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
                            name="email"
                            placeholder="Введите свой email"
                            required
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
                            name="phone"
                            type="text"
                            placeholder="Введите ваш номер телефона"
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
                            name="message"
                        ></textarea>
                    </div>
                    <div>
                        <button
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                            type="submit"
                        >
                            <FaPaperPlane className="mr-2" />{' '}
                            {status.pending ? 'Отправляем...' : 'Отправить'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
