/* eslint-disable no-use-before-define */
import { useCallback, useEffect, useRef } from 'react';


export function useInfinityScroll(callback: () => void, offset = 5) {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    const addEvent = useCallback(() => {
        window.addEventListener('scroll', scrollHandle);
    }, []);

    const removeEvent = useCallback(() => {
        window.removeEventListener('scroll', scrollHandle);
    }, []);

    const scrollHandle = useCallback(() => {
        const scroll = window.scrollY + document.documentElement.clientHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (documentHeight - scroll < offset) {
            removeEvent();
            callbackRef.current();
        }
    }, []);

    useEffect(() => () => removeEvent(), []);

    return { addEvent, removeEvent };
}
