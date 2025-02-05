'use client';
import logo from '@/assets/images/logo-white.png';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface IDesktopMenuProps {
    session: Session | null;
}

export default function DesktopMenu({ session }: IDesktopMenuProps) {
    const pathname = usePathname();

    return (
        <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center" href="/">
                <Image className="h-10 w-auto" src={logo} alt="PropertyPulse" />

                <span className="hidden md:block text-white text-2xl font-bold ml-2">Renty</span>
            </Link>
            <div className="hidden md:ml-6 md:block">
                <div className="flex space-x-2">
                    <Link
                        href="/"
                        className={`${
                            pathname === '/' ? 'bg-black' : ''
                        } text-white  hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                    >
                        Главная
                    </Link>
                    <Link
                        href="/properties"
                        className={`${
                            pathname === '/properties' ? 'bg-black' : ''
                        } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                    >
                        Недвижимость
                    </Link>
                    {session && (
                        <Link
                            href="/properties/add"
                            className={`${
                                pathname === '/properties/add' ? 'bg-black' : ''
                            } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                        >
                            Добавить недвижимость
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
