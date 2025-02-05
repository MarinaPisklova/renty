'use client';
import { useEffect, useState } from 'react';
import BurgerButton from './BurgerButton';
import DesktopMenu from './DesktopMenu';
import LogInButton from './LogInButton';
import MobileMenu from './MobileMenu';
import NotificationsLink from './NotificationsLink';
import ProfileMenu from './ProfileMenu';
import { getProviders, useSession } from 'next-auth/react';

export default function Navbar() {
    const { data: session } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [providers, setProviders] = useState<Awaited<ReturnType<typeof getProviders>>>(null);

    useEffect(() => {
        const setAuthProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };

        setAuthProviders();
    }, []);

    return (
        <nav className="bg-emerald-700 border-b border-emerald-500">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-20 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                        <BurgerButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                    </div>

                    <DesktopMenu session={session} />

                    {!session && <LogInButton providers={providers} />}

                    {session && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                            <NotificationsLink />
                            <ProfileMenu session={session} />
                        </div>
                    )}
                </div>
            </div>

            {isMobileMenuOpen && <MobileMenu session={session} providers={providers} />}
        </nav>
    );
}
