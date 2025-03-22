'use client';
import { useFormStatus } from 'react-dom';

interface ISubmitButtonProps {
    pendingText?: string;
    text?: string;
    icon?: React.ReactNode;
}

export default function SubmitButton({
    pendingText = 'Добавляем недвижимость...',
    text = 'Добавить недвижимость',
    icon,
}: ISubmitButtonProps) {
    const status = useFormStatus();

    return (
        <button
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
            type="submit"
            disabled={status.pending}
        >
            {icon}
            {status.pending ? pendingText : text}
        </button>
    );
}
