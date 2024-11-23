
// export const isDevEnv = process.env.NODE_ENV === "development";
// export const isProdEnv = process.env.NODE_ENV === "production";
// export const isTestEnv = process.env.NODE_ENV === "test";

export function joinClassNames(...classes: string[]): string {
    return classes.join(" ");
}

export function removeItemFromArray<T>(arrayList: T[], item: T): T[] {
    const itemIndex = arrayList.indexOf(item);
    let newList: Array<T> = [];

    if (itemIndex === 0) {
        newList = newList.concat(arrayList.slice(1));
    } else if (itemIndex === arrayList.length - 1) {
        newList = newList.concat(arrayList.slice(0, itemIndex));
    } else if (itemIndex > 0) {
        newList = newList.concat(arrayList.slice(0, itemIndex), arrayList.slice(itemIndex + 1));
    }
    return newList;
}

export function removeIndexFromArray<T>(arrayList: T[], index: number) {
    let newList: typeof arrayList = [];

    if (index === 0) {
        newList = newList.concat(arrayList.slice(1));
    } else if (index === arrayList.length - 1) {
        newList = newList.concat(arrayList.slice(0, index));
    } else if (index > 0) {
        newList = newList.concat(arrayList.slice(0, index), arrayList.slice(index + 1));
    }
    return newList;
}

/**
 * Detects if a string is a number
 * @param value {string}
 * @returns true if it's a number, otherwise false.
 */
function stringIsNumber(value: string): boolean { return isNaN(Number(value)) === false }

export function enumToArray(enumerator: Record<string, unknown>): Array<string> {
    return Object.keys(enumerator).filter((v: string) => !stringIsNumber(v))
}

export function enumToObject<Type>(enumerator: Type): Record<string, unknown> {
    return Object(enumerator);
}

export function stringToEnum<Type>(
    val: string,
    enumerator: Record<string, unknown>
): Type | null {
    return (Object.values(enumerator) as unknown as string[]).includes(val)
        ? val as unknown as Type
        : null;
}

export function getNameInitials(name: string, length = 2) {
    const arr = name.split(" ");
    let initial = "";

    for (let i = 0; i < length; i++) {
        if (arr[i]) {
            initial += arr[i].charAt(0).toLocaleUpperCase();
        }
    }

    return initial;
}

export function encodeSocialNumberFormat(numb: number) {
    if (numb > 999999999) { //Billions
        const result = Math.round((numb / 1000000000) * 10) / 10;
        return `${result}B`;
    }
    if (numb > 999999) { //Millions
        const result = Math.round((numb / 1000000) * 10) / 10;
        return `${result}M`;
    }
    if (numb > 999) { //Thousands
        const result = Math.round((numb / 1000) * 10) / 10;
        return `${result}K`;
    }

    return `${numb}`;
}

const colorMap: { [key: string]: string } = {
    yellow: "#ca8a04",
    lime: "#84cc16",
    red: "#dc2626",
    blue: "#3b82f6",
    green: "#22c55e",
    purple: "#9333ea",
    fuchsia: "#d946ef",
    cyan: "#22d3ee",
    teal: "#2dd4bf",
    orange: "#ea580c",
};

export function getRandomColor(): string {
    const keys = Object.keys(colorMap);
    if (keys.length === 0) return "yellow";

    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    return colorMap[randomKey];
}

  export function getImageDimensions(file:File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const img = new Image();
  
        img.onload = function () {
          const dimensions = {
            width: img.width,
            height: img.height,
          };
  
          // Resolve the promise with the image dimensions
          resolve(dimensions);
        };
  
        img.src = e.target?.result as string;
      };
  
      // Handle errors
      reader.onerror = function (error) {
        reject(error);
      };
  
      // Read the file as a data URL
      reader.readAsDataURL(file);
    });
  }