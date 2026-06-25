import { useState, useEffect } from 'react';
import { useErrorState } from './UseErrorState';

export default function usePageState(storageKey, initialFormState) {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(items));
    }, [items]);

    const [selectedId, setSelectedId] = useState(null);
    const [activeForm, setActiveForm] = useState(null);
    const [formData, setFormData] = useState(initialFormState);
    const { errors, setErrors, validateForm } = useErrorState();

    const handleActionClick = (action) => {
        if (activeForm === action) {
            setSelectedId(null);
            setActiveForm(null);
            setErrors({});
            return;
        }

        if (action === 'add') {
            setFormData(initialFormState);
            setActiveForm('add');
            setErrors({});
        } else if (action === 'change' || action === 'delete' || action === 'orders') {
            if (!selectedId) return alert('Выберите объект в таблице.');

            if (action === 'change') {
                const currentItem = items.find(i => i.id === selectedId);
                if (currentItem) {
                    const { id, ...dataForForm } = currentItem;
                    setFormData(dataForForm);
                }
                setErrors({});
            }
            setActiveForm(action);
        }
    };

    const handleInputChange = (i) => {
        setFormData({ ...formData, [i.target.name]: i.target.value });
    };

    const handleAddSubmit = (i) => {
        i.preventDefault();
        if (!validateForm(formData, items, null)) return;

        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        setItems([...items, { id: newId, ...formData }]);
        setActiveForm(null);
    };

    const handleChangeSubmit = (i) => {
        i.preventDefault();
        if (!validateForm(formData, items, selectedId)) return;

        setItems(items.map(i => i.id === selectedId ? { id: selectedId, ...formData } : i));
        setActiveForm(null);
        setSelectedId(null);
    };

    const handleDeleteSubmit = (confirm) => {
        if (confirm) {
            setItems(items.filter(i => i.id !== selectedId));
            setSelectedId(null);
        }
        setActiveForm(null);
    };
    
    return {
        items,
        selectedId, setSelectedId,
        activeForm,
        formData,
        errors,
        handleActionClick,
        handleInputChange,
        handleAddSubmit,
        handleChangeSubmit,
        handleDeleteSubmit
    };
}