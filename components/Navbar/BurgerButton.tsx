'use client';

interface IBurgerButtonProps {
    onClick: () => void;
}

export default function BurgerButton({ onClick }: IBurgerButtonProps) {
    return (
        <button
            type="button"
            id="mobile-dropdown-button"
            className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-500  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={onClick}
        >
            <span className="absolute -inset-0.5"></span>
            <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
            </svg>
        </button>
    );
}
