import noop from 'lodash/noop';
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';


export function useUpdate(callback: EffectCallback, deps: DependencyList): void {
    const isInit = useRef(true);
    useEffect(() => {
        if (isInit.current) {
            isInit.current = false;
            return noop;
        }
        return callback();
    }, deps);
}
