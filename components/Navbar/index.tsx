'use client';
import { useState } from 'react';
import BurgerButton from './BurgerButton';
import DesktopMenu from './DesktopMenu';
import LogInButton from './LogInButton';
import MobileMenu from './MobileMenu';
import NotificationsLink from './NotificationsLink';
import ProfileMenu from './ProfileMenu';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <nav className="bg-emerald-700 border-b border-emerald-500">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-20 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                        <BurgerButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                    </div>

                    <DesktopMenu isLoggedIn={isLoggedIn} />

                    {!isLoggedIn && <LogInButton onClick={() => setIsLoggedIn(true)} />}

                    {isLoggedIn && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                            <NotificationsLink />
                            <ProfileMenu setIsLoggedIn={setIsLoggedIn} />
                        </div>
                    )}
                </div>
            </div>

            {isMobileMenuOpen && (
                <MobileMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            )}
        </nav>
    );
}
