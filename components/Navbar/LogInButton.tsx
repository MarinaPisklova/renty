'use client';
import { FaGoogle } from 'react-icons/fa';

interface ILogInButtonProps {
    onClick: () => void;
}

export default function LogInButton({ onClick }: ILogInButtonProps) {
    return (
        <div className="hidden md:block md:ml-6">
            <div className="flex items-center">
                <button
                    onClick={onClick}
                    className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                >
                    <FaGoogle className="text-white mr-2" />
                    <span>Войти или зарегистрироваться</span>
                </button>
            </div>
        </div>
    );
}
