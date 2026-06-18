import { state, selectRowTable, clearSelection, renderRowTable } from './state.js';
import { clickMenuBtns } from './menu.js';

export function initEmployees() {
    const employeesTable = document.getElementById("employees-table");
    selectRowTable(employeesTable);

    const savedEmployeesData = localStorage.getItem('employeesList');
    let loadedEmployees = savedEmployeesData ? JSON.parse(savedEmployeesData) : [];
    const employeesFields = ['id', 'name', 'email', 'phone', 'address'];

    loadedEmployees.forEach(employee => {
        renderRowTable(employee, employeesFields, employeesTable);
    });

    // Добавление
    const addEmployeesForm = document.getElementById("add-employees-form");

    addEmployeesForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const addEmployeesId = loadedEmployees.length > 0 ? Math.max(...loadedEmployees.map(emp => emp.id)) + 1 : 0;
        const addEmployeesRow = { id: addEmployeesId };
        const addEmployeesInputs = document.querySelectorAll('#add-employees-form input');
        addEmployeesInputs.forEach((input, index) => {
            addEmployeesRow[employeesFields[index + 1]] = input.value;
        });

        loadedEmployees.push(addEmployeesRow);
        localStorage.setItem('employeesList', JSON.stringify(loadedEmployees));

        addEmployeesForm.reset();
        renderRowTable(addEmployeesRow, employeesFields, employeesTable);
        document.getElementById("add-employees-form-container").classList.remove('active');
        document.getElementById("add-employees-btn").classList.remove('active');
    });

    // Изменение
    const changeEmployeesForm = document.getElementById('change-employees-form');

    changeEmployeesForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const changeEmployeesRow = loadedEmployees.find(emp => emp.id == state.selectedRow.dataset.id);
        const changeEmployeesInputs = document.querySelectorAll('#change-employees-form input');
        changeEmployeesInputs.forEach((input, index) => {
            state.selectedRow.cells[index + 1].textContent = input.value;
            changeEmployeesRow[employeesFields[index + 1]] = input.value;
        });

        localStorage.setItem('employeesList', JSON.stringify(loadedEmployees));

        changeEmployeesForm.reset();
        clearSelection();
        document.getElementById("change-employees-form-container").classList.remove('active');
        document.getElementById("change-employees-btn").classList.remove('active');
    });

    // Удаление
    const deleteEmployeesForm = document.getElementById('delete-employees-form');

    deleteEmployeesForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (event.submitter.value == "Yes") {
            const deleteEmployeesId = Number(state.selectedRow.cells[0].textContent);
            loadedEmployees = loadedEmployees.filter(auto => auto.id != deleteEmployeesId);
            localStorage.setItem('employeesList', JSON.stringify(loadedEmployees));
            state.selectedRow.remove();
            state.selectedRow = null;
        } else {
            clearSelection();
        }
        document.getElementById("delete-employees-form-container").classList.remove('active');
        document.getElementById("delete-employees-btn").classList.remove('active');
    });

    // Работа кнопок таблицы
    const tableButtons = document.querySelectorAll("#employees-page .table-btn");

    tableButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isAdd = button.id.includes('add');
            const isChange = button.id.includes('change');
            const isDelete = button.id.includes('delete');

            if (isAdd || ((isChange || isDelete) && state.selectedRow)) {
                clickMenuBtns(button, tableButtons);
                if (isChange) {
                    const dataInputs = document.querySelectorAll('#change-employees-form input');
                    const currentEmployee = loadedEmployees.find(emp => emp.id == state.selectedRow.dataset.id);
                    dataInputs.forEach((input, index) => {
                        input.value = currentEmployee[employeesFields[index + 1]];
                    });
                }
            } else {
                alert('Выберите объект в таблице.');
            }
        });
    });
};