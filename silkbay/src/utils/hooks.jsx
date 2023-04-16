import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react"

export function useTimeout(callback, delay){
    const callBackref = useRef(callback);
    const timeOutRef = useRef();

    useEffect(() => {
        callBackref.current = callback
    }, [callback]);

    const set = useCallback(() => {
        timeOutRef.current = setTimeout(() => callBackref.current(), delay);
    }, [delay])
    const clear = useCallback(() => {
        timeOutRef.current && clearTimeout(timeOutRef.current);
    }, [])
    useEffect(() => {
        set()
        return clear;
    }, [delay, set, clear])
    const reset = useCallback(() => {
        clear()
        set();
    }, [clear, set])

    return {reset, clear}
}

export function useDebounce(callback, delay, dependencies){
    const {reset, clear} = useTimeout(callback, delay)
    useEffect(reset, [...dependencies, reset]);
    useEffect(clear, []);

    return {reset, clear};
}