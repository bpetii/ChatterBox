import { Dispatch, SetStateAction, useEffect, useState } from "react";

const PREFIX = 'chatter-box-';

type SetValue<T> = Dispatch<SetStateAction<T>>

const useLocalStorage = <T>(key: string, initialValue?: string | [] | (() => string)):[T, SetValue<T>] => {
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