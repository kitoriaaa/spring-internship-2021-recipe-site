import { useState } from "react";

function usePersist(ky: string, initVal: string[]): [string[], (val: string[]) => void] {
  const key = ky;
  console.log(key);
  const value = () => {
    try {
      const item = window.localStorage.getItem(key);
      const items: string[] = item ? JSON.parse(item) : initVal;
      return items;
    } catch (err) {
      console.log(err);
      return initVal;
    }
  };

  const setValue = (val: string[]) => {
    try {
      setSavedValue(val);
      window.localStorage.setItem(key, JSON.stringify(val));
    } catch (err) {
      console.log(err);
    }
  };
  const [savedValue, setSavedValue] = useState<string[]>(value);
  return [savedValue, setValue];
}

export default usePersist;

