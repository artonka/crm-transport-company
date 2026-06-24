import React, { useState } from 'react';
import './styles.css';
import Employees from './components/EmployeesPage';
import Autopark from './components/AutoparkPage';
import Client from './components/ClientPage';
import Order from './components/OrderPage';
import Report from './components/ReportPage';

export default function App() {
    const [activeTop, setActiveTop] = useState(null);
    const [activeSub, setActiveSub] = useState(null);

    const handleTopClick = (menu) => {
        setActiveTop(activeTop === menu ? null : menu);
        setActiveSub(null);
    };

    const handleSubClick = (menu) => {
        setActiveSub(activeSub === menu ? null : menu);
    };

    return (
        <>
            <nav className="top-menu">
                <h2>Компания</h2>
                <div className="top-menu-buttons">
                    <button className={`top-btn ${activeTop === 'admin' ? 'active' : ''}`}
                        onClick={() => handleTopClick('admin')}
                    >
                        Администрирование
                    </button>
                    <button className={`top-btn ${activeTop === 'worker' ? 'active' : ''}`}
                        onClick={() => handleTopClick('worker')}
                    >
                        Клиенты и заказы
                    </button>
                </div>
            </nav>
            <nav className={`sub-menu ${activeTop === 'admin' ? 'active' : ''}`}>
                <button className={`sub-btn ${activeSub === 'employees' ? 'active' : ''}`}
                    onClick={() => handleSubClick('employees')}>Управление сотрудниками</button>
                <button className={`sub-btn ${activeSub === 'autopark' ? 'active' : ''}`}
                    onClick={() => handleSubClick('autopark')}>Управление автопарком</button>
            </nav>
            <nav className={`sub-menu ${activeTop === 'worker' ? 'active' : ''}`}>
                <button className={`sub-btn ${activeSub === 'client' ? 'active' : ''}`}
                    onClick={() => handleSubClick('client')}>Регистрация клиента</button>
                <button className={`sub-btn ${activeSub === 'order' ? 'active' : ''}`}
                    onClick={() => handleSubClick('order')}>Регистрация заказа</button>
                <button className={`sub-btn ${activeSub === 'report' ? 'active' : ''}`}
                    onClick={() => handleSubClick('report')}>Отчёты о заказах</button>
            </nav>
            {activeSub === 'employees' && <Employees />}
            {activeSub === 'autopark' && <Autopark />}
            {activeSub === 'client' && <Client />}
            {activeSub === 'order' && <Order />}
            {activeSub === 'report' && <Report />}
        </>
    );
}