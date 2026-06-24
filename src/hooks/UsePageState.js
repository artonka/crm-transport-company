import { useState, useEffect } from 'react';

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

    const handleActionClick = (action) => {
        if (activeForm === action) {
            setActiveForm(null);
            return;
        }

        if (action === 'add') {
            setFormData(initialFormState);
            setActiveForm('add');
        } else if (action === 'change' || action === 'delete') {
            if (!selectedId) return alert('Выберите объект в таблице.');

            if (action === 'change') {
                const currentItem = items.find(i => i.id === selectedId);
                if (currentItem) {
                    const { id, ...dataForForm } = currentItem;
                    setFormData(dataForForm);
                }
            }
            setActiveForm(action);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        setItems([...items, { id: newId, ...formData }]);
        setActiveForm(null);
    };

    const handleChangeSubmit = (i) => {
        i.preventDefault();
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
        handleActionClick,
        handleInputChange,
        handleAddSubmit,
        handleChangeSubmit,
        handleDeleteSubmit
    };
}