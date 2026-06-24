export function Table({ className, headers, fields, items, selectedId, setSelectedId }) {
    return (
        <div className={className}>
            <table>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr
                            key={item.id}
                            className={selectedId === item.id ? 'selected-row' : ''}
                            onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
                        >
                            {fields.map((field) => (
                                <td key={field}>{item[field]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function TableButtons({ activeForm, handleActionClick }) {
    return (
        <div className="table-btn-container">
            <button className={`table-btn ${activeForm === 'add' ? 'active' : ''}`}
                onClick={() => handleActionClick('add')}>Добавить</button>
            <button className={`table-btn ${activeForm === 'change' ? 'active' : ''}`}
                onClick={() => handleActionClick('change')}>Изменить</button>
            <button className={`table-btn ${activeForm === 'delete' ? 'active' : ''}`}
                onClick={() => handleActionClick('delete')}>Удалить</button>
        </div>
    )
}

export function DeleteForm({ selectedId, handleDeleteSubmit }) {
    return (
        <div className="form-container active">
            <div className="form-text">
                Удалить запись с ID {selectedId}?
            </div>
            <button type="button" className="form-btn"
                onClick={() => handleDeleteSubmit(true)}>Да</button>
            <button type="button" className="form-btn"
                onClick={() => handleDeleteSubmit(false)}>Нет</button>
        </div>
    )
}