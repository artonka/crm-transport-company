import { useState } from 'react';
import { isUnique, validateEmail, validatePhone, validateDate, validateNumberRange } from "../utils/Validators";

export function useErrorState() {
    const [errors, setErrors] = useState({});

    const validateForm = (formData, items, selectedId = null) => {
        const tempErrors = {};

        if (formData.email !== undefined && formData.phone !== undefined) {
            if (!validateEmail(formData.email)) {
                tempErrors.email = 'Некорректный формат ввода email';
            } else if (!isUnique(items, 'email', formData.email, selectedId)) {
                tempErrors.email = 'Такой email уже существует';
            }

            if (!validatePhone(formData.phone)) {
                tempErrors.phone = 'Некорректный формат ввода телефона';
            } else if (!isUnique(items, 'phone', formData.phone, selectedId)) {
                tempErrors.phone = 'Такой телефон уже существует';
            }
        }

        if (formData.date !== undefined && !validateDate(formData.date)) {
            tempErrors.date = 'Дата регистрации не может быть в будущем или до 2000 года';
        }

        if (formData.volume !== undefined && !validateNumberRange(formData.volume, 1, 150)) {
            tempErrors.volume = 'Объём кузова должен находиться в диапазоне о 1 до 150 м³';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    return { errors, setErrors, validateForm };
}