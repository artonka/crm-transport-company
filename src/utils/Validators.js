export function isUnique(items, fieldName, value, currentId = null) {
    return !items.some(item => String(item[fieldName]).toLowerCase() === String(value).toLowerCase() && item.id !== currentId);
}

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePhone(phone) {
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    const phoneRegex = /^\+?[0-9]{10-15}$/;
    return phoneRegex.test(cleanPhone);
}

export function validateDate(date) {
    const today = new Date();
    return date <= today;
}

export function validateNumberRange(value, min, max) {
    const num = Number(value);
    return num >= min && num <= max;
}