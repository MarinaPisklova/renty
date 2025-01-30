'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';

interface IMobileMenuProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function MobileMenu({ isLoggedIn, setIsLoggedIn }: IMobileMenuProps) {
    const pathname = usePathname();

    return (
        <div id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
                <Link
                    href="/"
                    className={`${
                        pathname === '/' ? 'bg-black' : ''
                    } text-white block rounded-md px-3 py-2 text-base font-medium`}
                >
                    Главная
                </Link>
                <Link
                    href="/properties"
                    className={`${
                        pathname === '/properties' ? 'bg-black' : ''
                    } text-white block rounded-md px-3 py-2 text-base font-medium`}
                >
                    Недвижимость
                </Link>
                {isLoggedIn && (
                    <Link
                        href="/properties/add"
                        className={`${
                            pathname === '/properties/add' ? 'bg-black' : ''
                        } text-white block rounded-md px-3 py-2 text-base font-medium`}
                    >
                        Добавить недвижимость
                    </Link>
                )}
                {!isLoggedIn && (
                    <button
                        onClick={() => setIsLoggedIn(true)}
                        className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-5"
                    >
                        <FaGoogle className="text-white mr-2" />
                        <span>Войти или зарегистрироваться</span>
                    </button>
                )}
            </div>
        </div>
    );
}
