/* eslint-disable @typescript-eslint/no-explicit-any */
export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassDictionary
  | ClassValue[];

interface ClassDictionary {
  [key: string]: any;
}

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const handle = (value: ClassValue) => {
    if (!value && value !== 0) return; // ігноруємо false, null, undefined (але враховуємо 0)
    if (typeof value === "string" || typeof value === "number") {
      classes.push(String(value));
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(handle);
      return;
    }
    if (typeof value === "object") {
      for (const key in value as ClassDictionary) {
        if ((value as ClassDictionary)[key]) {
          classes.push(key);
        }
      }
      return;
    }
  };

  inputs.forEach(handle);
  return classes.join(" ");
}
