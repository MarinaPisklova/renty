'use client';
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

interface IErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: IErrorPageProps) {
    return (
        <section className="bg-blue-50 min-h-screen flex-grow">
            <div className="container m-auto max-w-2xl py-24">
                <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <div className="flex justify-center">
                        <FaExclamationTriangle className="fas fa-exclamation-triangle fa-5x text-8xl text-red-400"></FaExclamationTriangle>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mt-4 mb-2">Что-то пошло не так</h1>
                        <h2 className="text-2xl font-bold my-2 text-red-400">{error.message}</h2>
                        <p className="text-gray-500 text-xl my-5">Попробуем еще раз? ...</p>
                        <button
                            onClick={() => reset()}
                            className="bg-yellow-500 hover:bg-yellow-600 font-bold py-4 px-6 rounded"
                        >
                            Обновить
                        </button>
                        <p className="text-gray-500 text-xl my-5">
                            Или вернитесь на главную страницу...
                        </p>
                        <Link
                            href="/"
                            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded inline-block"
                        >
                            Вернуться на главную
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex-grow"></div>
        </section>
    );
}
