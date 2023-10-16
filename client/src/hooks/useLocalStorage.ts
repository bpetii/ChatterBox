import { useEffect, useState } from "react";

const PREFIX = 'chatter-box-';

const useLocalStorage = (key: string, initialValue?: string | [] | (() => string)) => {
    const prefixedKey:string=  PREFIX + key;
		const [value, setValue] = useState(() => {
			const jsonValue = localStorage.getItem(prefixedKey);
			if (jsonValue != null) {
				return JSON.parse(jsonValue);
			}
			if (typeof initialValue === 'function') {
				return initialValue();
			} else {
				return initialValue;
			}
		});

		useEffect(()=> {
			localStorage.setItem(prefixedKey, JSON.stringify(value))
		}, [value, prefixedKey])


		return [value, setValue];
    
}

export default useLocalStorage