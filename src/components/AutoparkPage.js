import React, { useState, useEffect } from 'react';

export default function AutoparkPage() {
    const [autopark, setAutopark] = useState(() => {
        const saved = localStorage.getItem('autoparkList');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('autoparkList', JSON.stringify(autopark));
    }, [autopark]);

    const [selectedId, setSelectedId] = useState(null);
    const [activeForm, setActiveForm] = useState(null);
    const [formData, setFormData] = useState({ name: '', date: '', volume: '', type: '', category: '' });

    const handleActionClick = (action) => {
        if (activeForm === action) {
            setActiveForm(null);
            return;
        }
        if (action === 'add') {
            setFormData({ name: '', date: '', volume: '', type: '', category: '' });
            setActiveForm('add');
        } else if (action === 'change' || action === 'delete') {
            if (!selectedId) return alert('Выберите объект в таблице.');
            if (action === 'change') {
                const auto = autopark.find(a => a.id === selectedId);
                setFormData({ name: auto.name, date: auto.date, volume: auto.volume, type: auto.type, category: auto.category });
            }
            setActiveForm(action);
        }
    };

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAddSubmit = (e) => {
        e.preventDefault();
        const newId = autopark.length > 0 ? Math.max(...autopark.map(a => a.id)) + 1 : 1;
        setAutopark([...autopark, { id: newId, ...formData, volume: Number(formData.volume) }]);
        setActiveForm(null);
    };

    const handleChangeSubmit = (e) => {
        e.preventDefault();
        setAutopark(autopark.map(a => a.id === selectedId ? { id: selectedId, ...formData, volume: Number(formData.volume) } : a));
        setActiveForm(null);
        setSelectedId(null);
    };

    const handleDelete = (confirm) => {
        if (confirm) {
            setAutopark(autopark.filter(a => a.id !== selectedId));
            setSelectedId(null);
        }
        setActiveForm(null);
    };

    return (
        <div className="page active">
            <h2>Список транспортных средств</h2>
            <div className="autopark-table-page">
                <div className="autopark-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th><th>Модель</th><th>Дата регистрации</th>
                                <th>Объем</th><th>Тип кузова</th><th>Категория</th>
                            </tr>
                        </thead>
                        <tbody>
                            {autopark.map(auto => (
                                <tr
                                    key={auto.id}
                                    className={selectedId === auto.id ? 'selected-row' : ''}
                                    onClick={() => setSelectedId(selectedId === auto.id ? null : auto.id)}
                                >
                                    <td>{auto.id}</td><td>{auto.name}</td><td>{auto.date}</td>
                                    <td>{auto.volume}</td><td>{auto.type}</td><td>{auto.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="table-btn-container">
                    <button className={`table-btn ${activeForm === 'add' ? 'active' : ''}`}
                        onClick={() => handleActionClick('add')}>Добавить</button>
                    <button className={`table-btn ${activeForm === 'change' ? 'active' : ''}`}
                        onClick={() => handleActionClick('change')}>Изменить</button>
                    <button className={`table-btn ${activeForm === 'delete' ? 'active' : ''}`}
                        onClick={() => handleActionClick('delete')}>Удалить</button>
                </div>
                {(activeForm === 'add' || activeForm === 'change') && (
                    <div className="form-container active">
                        <form onSubmit={activeForm === 'add' ? handleAddSubmit : handleChangeSubmit}>
                            <input name="name" value={formData.name} onChange={handleInputChange}
                                placeholder="Модель..." required />
                            <input name="date" value={formData.date} onChange={handleInputChange}
                                type="date" required />
                            <input name="volume" value={formData.volume} onChange={handleInputChange}
                                placeholder="Объем кузова..." required />
                            <select name="type" value={formData.type} onChange={handleInputChange} required>
                                <option value="" disabled hidden>Тип кузова...</option>
                                <option value="Бортовой">Бортовой</option>
                                <option value="Тентованный">Тентованный</option>
                                <option value="Фургон">Фургон</option>
                                <option value="Рефрижератор">Рефрижератор</option>
                                <option value="Самосвал">Самосвал</option>
                            </select>
                            <select name="category" value={formData.category} onChange={handleInputChange} required>
                                <option value="" disabled hidden>Категория...</option>
                                <option value="Малотоннажный">Малотоннажный</option>
                                <option value="Среднетоннажный">Среднетоннажный</option>
                                <option value="Крупнотоннажный">Крупнотоннажный</option>
                            </select>
                            <button type="submit" className="form-btn">
                                {activeForm === 'add' ? 'Добавить ТС' : 'Сохранить изменения'}
                            </button>
                        </form>
                    </div>
                )}
                {activeForm === 'delete' && (
                    <div className="form-container active">
                        <div className="form-text">Вы действительно хотите удалить это ТС?</div>
                        <button type="button" className="form-btn" onClick={() => handleDelete(true)}>Да</button>
                        <button type="button" className="form-btn" onClick={() => handleDelete(false)}>Нет</button>
                    </div>
                )}
            </div>
        </div>
    );
}