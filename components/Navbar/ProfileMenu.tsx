'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import profileDefault from '@/assets/images/profile.png';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';

export default function ProfileMenu({ session }: { session: Session | null }) {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileImage = session?.user?.image;

    return (
        <div className="relative ml-3">
            <button
                type="button"
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            >
                <span className="absolute -inset-1.5"></span>
                <Image
                    className="h-8 w-8 rounded-full"
                    src={profileImage || profileDefault}
                    alt=""
                    width={40}
                    height={40}
                />
            </button>

            {isProfileMenuOpen && (
                <div
                    id="user-menu"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                >
                    <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-0"
                        onClick={() => {
                            setIsProfileMenuOpen(false);
                        }}
                    >
                        Мой профиль
                    </Link>
                    <Link
                        href="/properties/saved"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-2"
                        onClick={() => {
                            setIsProfileMenuOpen(false);
                        }}
                    >
                        Избранное
                    </Link>
                    <button
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-2"
                        onClick={() => {
                            setIsProfileMenuOpen(false);
                            signOut();
                        }}
                    >
                        Выйти
                    </button>
                </div>
            )}
        </div>
    );
}
