export function getListFromStorage(storageKey) {
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            return [];
        }
    }
    return [];
}