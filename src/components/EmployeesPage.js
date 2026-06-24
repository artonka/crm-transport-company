import React, { useState, useEffect } from 'react';

export default function EmployeesPage() {
    const [employees, setEmployees] = useState(() => {
        const saved = localStorage.getItem('employeesList');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('employeesList', JSON.stringify(employees));
    }, [employees]);

    const [selectedId, setSelectedId] = useState(null);
    const [activeForm, setActiveForm] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

    const handleActionClick = (action) => {
        if (activeForm === action) {
            setActiveForm(null);
            return;
        }

        if (action === 'add') {
            setFormData({ name: '', email: '', phone: '', address: '' });
            setActiveForm('add');
        } else if (action === 'change' || action === 'delete') {
            if (!selectedId) return alert('Выберите объект в таблице.');

            if (action === 'change') {
                const emp = employees.find(e => e.id === selectedId);
                setFormData({ name: emp.name, email: emp.email, phone: emp.phone, address: emp.address });
            }
            setActiveForm(action);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
        setEmployees([...employees, { id: newId, ...formData }]);
        setActiveForm(null);
    };

    const handleChangeSubmit = (e) => {
        e.preventDefault();
        setEmployees(employees.map(emp => emp.id === selectedId ? { id: selectedId, ...formData } : emp));
        setActiveForm(null);
        setSelectedId(null);
    };

    const handleDelete = (confirm) => {
        if (confirm) {
            setEmployees(employees.filter(emp => emp.id !== selectedId));
            setSelectedId(null);
        }
        setActiveForm(null);
    };

    return (
        <div className="page active">
            <h2>Список сотрудников</h2>
            <div className="employees-table-page">
                <div className="employees-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th><th>ФИО</th><th>Email</th><th>Телефон</th><th>Адрес</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => (
                                <tr
                                    key={emp.id}
                                    className={selectedId === emp.id ? 'selected-row' : ''}
                                    onClick={() => setSelectedId(selectedId === emp.id ? null : emp.id)}
                                >
                                    <td>{emp.id}</td><td>{emp.name}</td><td>{emp.email}</td><td>{emp.phone}</td><td>{emp.address}</td>
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
                                placeholder="ФИО..." required />
                            <input name="email" value={formData.email} onChange={handleInputChange}
                                placeholder="Email..." required type="email" />
                            <input name="phone" value={formData.phone} onChange={handleInputChange}
                                placeholder="Номер телефона..." required type="tel" />
                            <input name="address" value={formData.address} onChange={handleInputChange}
                                placeholder="Адрес..." required />
                            <button type="submit" className="form-btn">
                                {activeForm === 'add' ? "Добавить сотрудника" : "Сохранить изменения"}</button>
                        </form>
                    </div>
                )}
                {activeForm === 'delete' && (
                    <div className="form-container active">
                        <div className="form-text">Вы действительно хотите удалить этого сотрудника?</div>
                        <button type="button" className="form-btn"
                            onClick={() => handleDelete(true)}>Да</button>
                        <button type="button" className="form-btn"
                            onClick={() => handleDelete(false)}>Нет</button>
                    </div>
                )}
            </div>
        </div>
    );
}