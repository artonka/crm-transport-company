import React, { useState, useEffect } from 'react';
import usePageState from '../hooks/UsePageState';
import { getListFromStorage } from '../utils/Storage';
import { Table, TableButtons, DeleteForm } from './UIElements';

const ordersHeaders = ['Id', 'Название', 'Клиент', 'Сотрудник', 'Авто', 'Дата заказа'];
const ordersFields = ['id', 'name', 'clientName', 'employeeName', 'autoName', 'date'];

export default function OrderPage() {
    const {
        items: orders,
        setItems: setOrders,
        selectedId, setSelectedId,
        activeForm,
        formData,
        errors,
        handleActionClick,
        handleInputChange,
        handleAddSubmit,
        handleChangeSubmit,
        handleDeleteSubmit
    } = usePageState('ordersList', { name: '', clientId: '', employeeId: '', autoId: '', date: '' })

    const clients = getListFromStorage('clientsList');
    const employees = getListFromStorage('employeesList');
    const autopark = getListFromStorage('autoparkList');

    const tableData = orders.map(order => {
    const client = clients.find(c => String(c.id) === String(order.clientId));
    const auto = autopark.find(a => String(a.id) === String(order.autoId));
    const employee = employees.find(e => String(e.id) === String(order.employeeId));
    return {
      ...order, 
      clientName: client ? client.name : 'Удален',
      employeeName: employee ? employee.name : 'Уволен',
      autoName: auto ? auto.name : 'Удален'
    };
  });

    return (
        <div className="page">
            <h2>Список заказов</h2>
            <div className="table-page">
                <Table className={"orders-table"} headers={ordersHeaders} fields={ordersFields} items={tableData}
                    selectedId={selectedId} setSelectedId={setSelectedId} />
                <TableButtons activeForm={activeForm} handleActionClick={handleActionClick} showOrdersButton={false} />
                {(activeForm === 'add' || activeForm === 'change') && (
                    <div className="form-container">
                        <form onSubmit={activeForm === 'add' ? handleAddSubmit : handleChangeSubmit}>
                            <input name="name" value={formData.name} onChange={handleInputChange}
                                placeholder=' Название заказа...' required />
                            <select name="clientId" value={formData.clientId} onChange={handleInputChange}>
                                <option value="" disabled hidden>Выберите клиента...</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>
                                        {client.name} (Телефон: {client.phone})
                                    </option>
                                ))}
                            </select>
                            <select name="employeeId" value={formData.employeeId} onChange={handleInputChange}>
                                <option value="" disabled hidden>Выберите сотрудника...</option>
                                {employees.map(employee => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.name} (Телефон: {employee.phone})
                                    </option>
                                ))}
                            </select>
                            <select name="autoId" value={formData.autoId} onChange={handleInputChange}>
                                <option value="" disabled hidden>Выберите ТС...</option>
                                {autopark.map(auto => (
                                    <option key={auto.id} value={auto.id}>
                                        {auto.name} (Тип кузова: {auto.type}, Категория: {auto.category} ({auto.volume}) м³)
                                    </option>
                                ))}
                            </select>
                            <div className="form-input-error">
                                <input name="date" value={formData.date} onChange={handleInputChange}
                                    type="date" required />
                                {errors.date && <p className='error-text'>{errors.date}</p>}
                            </div>
                            <button type="submit" className="form-btn">
                                {activeForm === 'add' ? "Добавить заказ" : "Сохранить изменения"}
                            </button>
                        </form>
                    </div>
                )}
                {activeForm === 'delete' && (
                    <DeleteForm selectedId={selectedId} handleDeleteSubmit={handleDeleteSubmit} />
                )}
            </div>
        </div>
    )
}