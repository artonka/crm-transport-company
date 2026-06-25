export function isUnique(items, fieldName, value, currentId = null) {
    return !items.some(item => String(item[fieldName]).toLowerCase() === String(value).toLowerCase() && item.id !== currentId);
}

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org)$/;
    return emailRegex.test(email);
}

export function validatePhone(phone) {
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    const phoneRegex = /^\+375[0-9]{9}$/;
    return phoneRegex.test(cleanPhone);
}

export function validateDate(date) {
    const [year, month, day] = date.split('-');
    const cleanDate = new Date(year, month - 1, day);
    return cleanDate >= new Date(2000, 0, 1) && cleanDate <= new Date();
}

export function validateNumberRange(value, min, max) {
    const num = Number(value);
    return num >= min && num <= max;
}