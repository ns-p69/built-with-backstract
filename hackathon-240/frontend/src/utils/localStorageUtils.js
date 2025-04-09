export const saveToLocalStorage = (key, value) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getFromLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
};

export const removeFromLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};
