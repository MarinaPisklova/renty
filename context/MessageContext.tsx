'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

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
