import React, { useState, useEffect } from 'react';
import usePageState from '../hooks/UsePageState';
import { Table, TableButtons, DeleteForm } from './UIElements';

const employeesHeaders = ['Id', 'ФИО', 'Email', 'Телефон', 'Адрес'];
const employeesFields = ['id', 'name', 'email', 'phone', 'address'];

export default function EmployeesPage() {
    const {
        items: employees,
        selectedId, setSelectedId,
        activeForm,
        formData,
        handleActionClick,
        handleInputChange,
        handleAddSubmit,
        handleChangeSubmit,
        handleDeleteSubmit
    } = usePageState('employeesList', { name: '', email: '', phone: '', address: '' })

    return (
        <div className="page active">
            <h2>Список сотрудников</h2>
            <div className="employees-table-page">
                <Table className={"employees-table"} headers={employeesHeaders} fields={employeesFields} items={employees}
                    selectedId={selectedId} setSelectedId={setSelectedId} />
                <TableButtons activeForm={activeForm} handleActionClick={handleActionClick} />
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
                    <DeleteForm selectedId={selectedId} handleDeleteSubmit={handleDeleteSubmit} />
                )}
            </div>
        </div>
    );
}