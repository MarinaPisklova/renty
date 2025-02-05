'use client';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { LiteralUnion, ClientSafeProvider, signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

interface ILogInButtonProps {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
}

export default function LogInButton({ providers }: ILogInButtonProps) {
    return (
        <div className="hidden md:block md:ml-6">
            <div className="flex items-center">
                {providers &&
                    Object.values(providers).map((provider, index) => (
                        <button
                            key={index}
                            onClick={() => signIn(provider.id)}
                            className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                        >
                            <FaGoogle className="text-white mr-2" />
                            <span>Войти или зарегистрироваться</span>
                        </button>
                    ))}
            </div>
        </div>
    );
}
