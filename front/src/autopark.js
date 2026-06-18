import { state, selectRowTable, clearSelection, renderRowTable } from './state.js';
import { clickMenuBtns } from './menu.js';

export function initAutopark() {
    const autoparkTable = document.getElementById("autopark-table");
    selectRowTable(autoparkTable);

    const savedAutoData = localStorage.getItem('autoparkList');
    let loadedAutopark = savedAutoData ? JSON.parse(savedAutoData) : [];
    const autoparkFields = ['id', 'name', 'date', 'volume', 'type', 'category'];

    loadedAutopark.forEach(autopark => {
        renderRowTable(autopark, autoparkFields, autoparkTable);
    });

    // Добавление
    const addAutoparkForm = document.getElementById("add-autopark-form");

    addAutoparkForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const addAutoparkId = loadedAutopark.length > 0 ? Math.max(...loadedAutopark.map(auto => auto.id)) + 1 : 0;
        const addAutoparkRow = { id: addAutoparkId };
        const addAutoparkInputs = document.querySelectorAll('#add-autopark-form input, #add-autopark-form select');
        addAutoparkInputs.forEach((input, index) => {
            addAutoparkRow[autoparkFields[index + 1]] = input.value;
        });

        loadedAutopark.push(addAutoparkRow);
        localStorage.setItem('autoparkList', JSON.stringify(loadedAutopark));

        addAutoparkForm.reset();
        renderRowTable(addAutoparkRow, autoparkFields, autoparkTable);
        document.getElementById("add-autopark-form-container").classList.remove('active');
        document.getElementById("add-autopark-btn").classList.remove('active');
    })

    // Изменение
    const changeAutoparkForm = document.getElementById('change-autopark-form');

    changeAutoparkForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const changeAutoparkRow = loadedAutopark.find(auto => auto.id == state.selectedRow.dataset.id);
        const changeAutoparkInputs = document.querySelectorAll('#change-autopark-form input, #change-autopark-form select');
        changeAutoparkInputs.forEach((input, index) => {
            state.selectedRow.cells[index + 1].textContent = input.value;
            changeAutoparkRow[autoparkFields[index + 1]] = input.value;
        });

        localStorage.setItem('autoparkList', JSON.stringify(loadedAutopark));

        changeAutoparkForm.reset();
        clearSelection();
        document.getElementById("change-autopark-form-container").classList.remove('active');
        document.getElementById("change-autopark-btn").classList.remove('active');
    })

    // Удаление
    const deleteFutoparkForm = document.getElementById('delete-autopark-form');

    deleteFutoparkForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (event.submitter.value == "Yes") {
            const deleteAutoparkId = Number(state.selectedRow.cells[0].textContent);
            loadedAutopark = loadedAutopark.filter(auto => auto.id != deleteAutoparkId);
            localStorage.setItem('autoparkList', JSON.stringify(loadedAutopark));
            state.selectedRow.remove();
            state.selectedRow = null;
        } else {
            clearSelection();
        }
        document.getElementById("delete-autopark-form-container").classList.remove('active');
        document.getElementById("delete-autopark-btn").classList.remove('active');
    });

    // Работа кнопок таблицы
    const tableButtons = document.querySelectorAll("#autopark-page .table-btn");

    tableButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isAdd = button.id.includes('add');
            const isChange = button.id.includes('change');
            const isDelete = button.id.includes('delete');

            if (isAdd || ((isChange || isDelete) && state.selectedRow)) {
                clickMenuBtns(button, tableButtons);
                if (isChange) {
                    const dataInputs = document.querySelectorAll('#change-autopark-form input, #change-autopark-form select');
                    const currentAutopark = loadedAutopark.find(auto => auto.id == state.selectedRow.dataset.id);
                    dataInputs.forEach((input, index) => {
                        input.value = currentAutopark[autoparkFields[index + 1]];
                    });
                }
            } else {
                alert('Выберите объект в таблице.');
            }
        });
    });
};