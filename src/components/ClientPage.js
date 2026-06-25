import React, { useState, useEffect } from 'react';
import usePageState from '../hooks/UsePageState';
import { Table, TableButtons, DeleteForm, OrdersForm } from './UIElements';
import { getListFromStorage } from '../utils/Storage';

const clientsHeaders = ['Id', 'Тип клиента', 'Имя', 'Email', 'Телефон', 'Адрес'];
const clientsFields = ['id', 'type', 'name', 'email', 'phone', 'address'];

export default function ClientPage() {
    const {
        items: clients,
        setItems: setClients,
        selectedId, setSelectedId,
        activeForm,
        formData,
        errors,
        handleActionClick,
        handleInputChange,
        handleAddSubmit,
        handleChangeSubmit,
        handleDeleteSubmit
    } = usePageState('clientsList', { type: '', name: '', email: '', phone: '', address: '' })

    const allOrders = getListFromStorage('ordersList');
    const clientOrders = allOrders.filter(order => order.clientId == selectedId);

    return (
        <div className="page">
            <h2>Список клиентов</h2>
            <div className="table-page">
                <Table className={"clients-table"} headers={clientsHeaders} fields={clientsFields} items={clients}
                    selectedId={selectedId} setSelectedId={setSelectedId} />
                <TableButtons activeForm={activeForm} handleActionClick={handleActionClick} showOrdersButton={true} />
                {(activeForm === 'add' || activeForm === 'change') && (
                    <div className="form-container">
                        <form onSubmit={activeForm === 'add' ? handleAddSubmit : handleChangeSubmit}>
                            <select name="type" value={formData.type} onChange={handleInputChange}>
                                <option value="" disabled hidden>Тип клиента...</option>
                                <option value="Физическое лицо">Физическое лицо</option>
                                <option value="Юридическое лицо">Юридическое лицо</option>
                            </select>
                            <input name="name" value={formData.name} onChange={handleInputChange}
                                placeholder="Имя..." required />
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
                                {activeForm === 'add' ? "Добавить клиента" : "Сохранить изменения"}
                            </button>
                        </form>
                    </div>
                )}
                {activeForm === 'delete' && (
                    <DeleteForm selectedId={selectedId} handleDeleteSubmit={handleDeleteSubmit} />
                )}
                {activeForm === 'orders' && (
                    <OrdersForm selectedId={selectedId} itemOrders={clientOrders} />
                )}
            </div>
        </div>
    )
}