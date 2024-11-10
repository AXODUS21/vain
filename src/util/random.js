import { useEffect, useRef } from "react"

export const randomIntFromInterval = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };

    if(delay !== null){
        let id = setInterval(tick,delay)
        return () => clearInterval(id)
    }
  },[delay]);
}

export function reverseLinkedList(head){
    let previousNode = null;
    let currentNode = head;

    while(currentNode!= null){
        const NextNode = currentNode.next;
        currentNode.next = previousNode;
        previousNode = currentNode;
        currentNode = NextNode;
    }
    return previousNode
}
