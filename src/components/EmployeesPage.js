import React, { useState, useEffect } from 'react';
import usePageState from '../hooks/UsePageState';
import { Table, TableButtons, DeleteForm, OrdersForm } from './UIElements';
import { getListFromStorage } from '../utils/Storage';

const employeesHeaders = ['Id', 'ФИО', 'Email', 'Телефон', 'Адрес'];
const employeesFields = ['id', 'name', 'email', 'phone', 'address'];

export default function EmployeesPage() {
    const {
        items: employees,
        selectedId, setSelectedId,
        activeForm,
        formData,
        errors,
        handleActionClick,
        handleInputChange,
        handleAddSubmit,
        handleChangeSubmit,
        handleDeleteSubmit
    } = usePageState('employeesList', { name: '', email: '', phone: '', address: '' })

    const allOrders = getListFromStorage('ordersList');
    const employeeOrders = allOrders.filter(order => order.employeeId == selectedId);

    return (
        <div className="page">
            <h2>Список сотрудников</h2>
            <div className="table-page">
                <Table className={"employees-table"} headers={employeesHeaders} fields={employeesFields} items={employees}
                    selectedId={selectedId} setSelectedId={setSelectedId} />
                <TableButtons activeForm={activeForm} handleActionClick={handleActionClick} showOrdersButton={true} />
                {(activeForm === 'add' || activeForm === 'change') && (
                    <div className="form-container">
                        <form onSubmit={activeForm === 'add' ? handleAddSubmit : handleChangeSubmit}>
                            <input name="name" value={formData.name} onChange={handleInputChange}
                                placeholder="ФИО..." required />
                            <div className="form-input-error">
                                <input name="email" value={formData.email} onChange={handleInputChange}
                                    placeholder="Email..." required />
                                {errors.email && <p className='error-text'>{errors.email}</p>}
                            </div>
                            <div className="form-input-error">
                                <input name="phone" value={formData.phone} onChange={handleInputChange}
                                    placeholder="Номер телефона..." required />
                                {errors.phone && <p className='error-text'>{errors.phone}</p>}
                            </div>
                            <input name="address" value={formData.address} onChange={handleInputChange}
                                placeholder="Адрес..." required />
                            <button type="submit" className="form-btn">
                                {activeForm === 'add' ? "Добавить сотрудника" : "Сохранить изменения"}
                            </button>
                        </form>
                    </div>
                )}
                {activeForm === 'delete' && (
                    <DeleteForm selectedId={selectedId} handleDeleteSubmit={handleDeleteSubmit} />
                )}
                {activeForm === 'orders' && (
                    <OrdersForm selectedId={selectedId} itemOrders={employeeOrders} />
                )}
            </div>
        </div>
    );
}