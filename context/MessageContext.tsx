'use client';

import getUndreadMessageCount from '@/app/actions/getUnreadMessageCount';
import { useSession } from 'next-auth/react';
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';

interface IMessageContextValue {
    unreadCount: number;
    setUnreadCount: Dispatch<SetStateAction<number>>;
}

const MessageContext = createContext<IMessageContextValue>({
    unreadCount: 0,
    setUnreadCount: () => {},
});

export function MessageProvider({ children }: { children: ReactNode }) {
    const [unreadCount, setUnreadCount] = useState(0);

    const { data: session } = useSession();

    useEffect(() => {
        if (session && session.user) {
            getUndreadMessageCount().then((res) => {
                if (res.count) setUnreadCount(res.count);
            });
        }
    }, [session]);

    return (
        <MessageContext.Provider
            value={{
                unreadCount,
                setUnreadCount,
            }}
        >
            {children}
        </MessageContext.Provider>
    );
}

export function useMessageContext() {
    return useContext(MessageContext);
}
