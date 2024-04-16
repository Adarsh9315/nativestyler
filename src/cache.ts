import { lru, LRU } from "tiny-lru";
import {stringify} from 'flatted';

interface CacheProps {
  [key: string]: any;
}

const cache: LRU<any> = lru<any>(100); // Set max size to 100 or adjust as needed

function hashFunction(props: CacheProps, theme: CacheProps): string {
  const relevantProps = Object.entries(props).reduce((acc, [key, value]) => {
    if (typeof value !== 'object' && typeof value !== 'function') {
      acc[key] = value;
    } else if (typeof value === 'object' && value !== null) {
      acc[key] = stringify(value); // Careful with nested objects
    }
    return acc;
  }, {} as CacheProps);

  const relevantTheme = Object.entries(theme).reduce((acc, [key, value]) => {
    if (typeof value !== 'object' && typeof value !== 'function') {
      acc[key] = value;
    } else if (typeof value === 'object' && value !== null) {
      acc[key] = stringify(value); // Careful with nested objects
    }
    return acc;
  }, {} as CacheProps);

  const propsString = stringify(relevantProps);
  const themeString = stringify(relevantTheme);
  return `${propsString}|${themeString}`;
}


export { cache, hashFunction };
