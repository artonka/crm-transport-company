import React, { useState, useEffect } from 'react';
import usePageState from '../hooks/UsePageState';
import { Table, TableButtons, DeleteForm } from './UIElements';

const autoparkHeaders = ['Id', 'Модель', 'Дата регистрации', 'Объем', 'Тип кузова', 'Категория'];
const autoparkFields = ['id', 'name', 'date', 'volume', 'type', 'category'];

export default function AutoparkPage() {
    const {
        items: autopark,
        setItems: setAutopark,
        selectedId, setSelectedId,
        activeForm,
        formData,
        handleActionClick,
        handleInputChange,
        handleAddSubmit,
        handleChangeSubmit,
        handleDeleteSubmit
    } = usePageState('autoparkList', { name: '', date: '', volume: '', type: '', category: '' })

    return (
        <div className="page active">
            <h2>Список транспортных средств</h2>
            <div className="autopark-table-page">
                <Table className="autopark-table" headers={autoparkHeaders} fields={autoparkFields} items={autopark}
                    selectedId={selectedId} setSelectedId={setSelectedId} />
                <TableButtons activeForm={activeForm} handleActionClick={handleActionClick} />
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
                    <DeleteForm selectedId={selectedId} handleDeleteSubmit={handleDeleteSubmit} />
                )}
            </div>
        </div>
    );
}