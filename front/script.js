document.addEventListener('DOMContentLoaded', () => {
    // Работа кнопок меню
    const topButtons = document.querySelectorAll('.top-btn');
    const subMenus = document.querySelectorAll('.sub-menu');
    const subButtons = document.querySelectorAll('.sub-btn');
    const pages = document.querySelectorAll('.page');

    topButtons.forEach(button => {
        button.addEventListener('click', () => {
            subButtons.forEach(btn => btn.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            tableButtons.forEach(btn => btn.classList.remove('active'));
            tableForms.forEach(frm => frm.classList.remove('active'));
            clickMenuBtns(button, topButtons, subMenus);
            clearSelection();
        });
    });

    subButtons.forEach(button => {
        button.addEventListener('click', () => {
            tableButtons.forEach(btn => btn.classList.remove('active'));
            tableForms.forEach(frm => frm.classList.remove('active'));
            clickMenuBtns(button, subButtons, pages);
            clearSelection();
        })
    });

    // Работа табличных кнопок управления формами
    const tableButtons = document.querySelectorAll(".table-btn");
    const tableForms = document.querySelectorAll(".form-container");

    tableButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id == "add-employees-btn" || button.id == "add-autopark-btn") {
                clickMenuBtns(button, tableButtons, tableForms);
            } else if (button.id == "change-employees-btn" && selectedRow) {
                clickMenuBtns(button, tableButtons, tableForms);
                document.getElementById("change-employees-name").value = selectedRow.cells[1].textContent;
                document.getElementById("change-employees-email").value = selectedRow.cells[2].textContent;
                document.getElementById("change-employees-phone").value = selectedRow.cells[3].textContent;
                document.getElementById("change-employees-address").value = selectedRow.cells[4].textContent;
            } else if (button.id == "change-autopark-btn" && selectedRow) {
                clickMenuBtns(button, tableButtons, tableForms);
                document.getElementById("change-autopark-name").value = selectedRow.cells[1].textContent;
                document.getElementById("change-autopark-date").value = selectedRow.cells[2].textContent;
                document.getElementById("change-autopark-volume").value = selectedRow.cells[3].textContent;
                document.getElementById("change-autopark-type").value = selectedRow.cells[4].textContent;
                document.getElementById("change-autopark-category").value = selectedRow.cells[5].textContent;
            } else if (button.id == "delete-employees-btn" && selectedRow || button.id == "delete-autopark-btn" && selectedRow) {
                clickMenuBtns(button, tableButtons, tableForms);
            }
            else {
                alert('Выберите объект в таблице.');
            }
        });
    });

    function clickMenuBtns(button, menuButtons, openContent) {
        const isAlreadyActive = button.classList.contains('active');

        menuButtons.forEach(btn => btn.classList.remove('active'));
        openContent.forEach(cnt => cnt.classList.remove('active'));

        if (!isAlreadyActive) {
            button.classList.add("active");
            const targetId = button.getAttribute('data-target');
            const targetPage = document.getElementById(targetId);
            if (targetPage) { targetPage.classList.add('active'); }
        }
    };

    // Выделение строки
    let selectedRow = null;

    function selectRowTable(table) {
        table.addEventListener('click', (event) => {
            const row = event.target.closest('tr');

            if (!row || row.closest('thead')) { return; }

            if (selectedRow === row) {
                row.classList.remove('selected-row');
                selectedRow = null;
            } else {
                if (selectedRow) { selectedRow.classList.remove('selected-row'); }
                row.classList.add('selected-row');
                selectedRow = row;
            }
        });
    }

    function clearSelection() {
        if (selectedRow) {
            selectedRow.classList.remove('selected-row');
            selectedRow = null;
        }
    }

    const employeesTable = document.getElementById("employees-table");
    selectRowTable(employeesTable);

    const savedEmployeesData = localStorage.getItem('employeesList');
    let loadedEmployees = savedEmployeesData ? JSON.parse(savedEmployeesData) : [];

    loadedEmployees.forEach(employee => {
        const row = document.createElement('tr');

        row.dataset.id = employee.id;
        const idEmp = document.createElement('td');
        idEmp.textContent = employee.id;
        const nameEmp = document.createElement('td');
        nameEmp.textContent = employee.name;
        const emailEmp = document.createElement('td');
        emailEmp.textContent = employee.email;
        const phoneEmp = document.createElement('td');
        phoneEmp.textContent = employee.phone;
        const addressEmp = document.createElement('td');
        addressEmp.textContent = employee.address;

        row.appendChild(idEmp);
        row.appendChild(nameEmp);
        row.appendChild(emailEmp);
        row.appendChild(phoneEmp);
        row.appendChild(addressEmp);

        employeesTable.appendChild(row);
    });

    // Добавление сотрудника в таблицу
    const employeesAddForm = document.getElementById("employees-add-form");
    let idEmpVal = Math.max(...loadedEmployees.map(emp => emp.id)) + 1;

    employeesAddForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameEmpVal = document.getElementById("add-employees-name").value;
        const emailEmpVal = document.getElementById("add-employees-email").value;
        const phoneEmpVal = document.getElementById("add-employees-phone").value;
        const addressEmpVal = document.getElementById("add-employees-address").value;

        const employeesRow = { id: idEmpVal, name: nameEmpVal, email: emailEmpVal, phone: phoneEmpVal, address: addressEmpVal };
        loadedEmployees.push(employeesRow);
        localStorage.setItem('employeesList', JSON.stringify(loadedEmployees));

        const row = document.createElement('tr');

        row.dataset.id = idEmpVal;
        const idEmp = document.createElement('td');
        idEmp.textContent = idEmpVal;
        const nameEmp = document.createElement('td');
        nameEmp.textContent = nameEmpVal;
        const emailEmp = document.createElement('td');
        emailEmp.textContent = emailEmpVal;
        const phoneEmp = document.createElement('td');
        phoneEmp.textContent = phoneEmpVal;
        const addressEmp = document.createElement('td');
        addressEmp.textContent = addressEmpVal;

        row.appendChild(idEmp);
        row.appendChild(nameEmp);
        row.appendChild(emailEmp);
        row.appendChild(phoneEmp);
        row.appendChild(addressEmp);

        employeesTable.appendChild(row);

        idEmpVal++;

        employeesAddForm.reset();
        document.getElementById("add-employees-form-container").classList.remove('active');
        document.getElementById("add-employees-btn").classList.remove('active');
    })

    // Изменение сотрудника в таблице
    const employeesChangeForm = document.getElementById('employees-change-form');

    employeesChangeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        selectedRow.cells[1].textContent = document.getElementById("change-employees-name").value;
        selectedRow.cells[2].textContent = document.getElementById("change-employees-email").value;
        selectedRow.cells[3].textContent = document.getElementById("change-employees-phone").value;
        selectedRow.cells[4].textContent = document.getElementById("change-employees-address").value;

        const idChangeEmp = selectedRow.dataset.id;
        const index = loadedEmployees.findIndex(emp => emp.id == idChangeEmp);

        loadedEmployees[index] = {
            id: Number(selectedRow.cells[0].textContent),
            name: document.getElementById("change-employees-name").value,
            email: document.getElementById("change-employees-email").value,
            phone: document.getElementById("change-employees-phone").value,
            address: document.getElementById("change-employees-address").value
        };

        localStorage.setItem('employeesList', JSON.stringify(loadedEmployees));

        employeesChangeForm.reset();
        document.getElementById("change-employees-form-container").classList.remove('active');
        document.getElementById("change-employees-btn").classList.remove('active');

        selectedRow.classList.remove('selected-row');
        selectedRow = null;
    })

    // Удаление сотрудника из таблицы
    const employeesDeleteForm = document.getElementById('employees-delete-form');

    employeesDeleteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (event.submitter.value == "Да") {
            const idChangeEmp = Number(selectedRow.cells[0].textContent);
            loadedEmployees = loadedEmployees.filter(auto => auto.id != idChangeEmp);
            localStorage.setItem('employeesList', JSON.stringify(loadedEmployees));
            selectedRow.remove();
            selectedRow = null;
        } else {
            selectedRow.classList.remove('selected-row');
            selectedRow = null;
        }
        document.getElementById("delete-employees-form-container").classList.remove('active');
        document.getElementById("delete-employees-btn").classList.remove('active');
    });

    const autoparkTable = document.getElementById("autopark-table");
    selectRowTable(autoparkTable);

    const savedAutoData = localStorage.getItem('autoparkList');
    let loadedAutopark = savedAutoData ? JSON.parse(savedAutoData) : [];

    loadedAutopark.forEach(autopark => {
        const row = document.createElement('tr');

        row.dataset.id = autopark.id;
        const idAuto = document.createElement('td');
        idAuto.textContent = autopark.id;
        const nameAuto = document.createElement('td');
        nameAuto.textContent = autopark.name;
        const dateAuto = document.createElement('td');
        dateAuto.textContent = autopark.date;
        const volumeAuto = document.createElement('td');
        volumeAuto.textContent = autopark.volume;
        const typeAuto = document.createElement('td');
        typeAuto.textContent = autopark.type;
        const categoryAuto = document.createElement('td');
        categoryAuto.textContent = autopark.category;

        row.appendChild(idAuto);
        row.appendChild(nameAuto);
        row.appendChild(dateAuto);
        row.appendChild(volumeAuto);
        row.appendChild(typeAuto);
        row.appendChild(categoryAuto);

        autoparkTable.appendChild(row);
    });

    // Добавление ТС в таблицу
    const autoparkAddForm = document.getElementById("autopark-add-form");
    let idAutoVal = Math.max(...loadedAutopark.map(auto => auto.id)) + 1;

    autoparkAddForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameAutoVal = document.getElementById("add-autopark-name").value;
        const dateAutoVal = document.getElementById("add-autopark-date").value;
        const volumeAutoVal = document.getElementById("add-autopark-volume").value;
        const typeAutoVal = document.getElementById("add-autopark-type").value;
        const categoryAutoVal = document.getElementById("add-autopark-category").value;

        const autoparkRow = {
            id: idAutoVal,
            name: nameAutoVal,
            date: dateAutoVal,
            volume: Number(volumeAutoVal),
            type: typeAutoVal,
            category: categoryAutoVal
        };
        loadedAutopark.push(autoparkRow);
        localStorage.setItem('autoparkList', JSON.stringify(loadedAutopark));

        const row = document.createElement('tr');

        row.dataset.id = idAutoVal;
        const idAuto = document.createElement('td');
        idAuto.textContent = idAutoVal;
        const nameAuto = document.createElement('td');
        nameAuto.textContent = nameAutoVal;
        const dateAuto = document.createElement('td');
        dateAuto.textContent = dateAutoVal;
        const volumeAuto = document.createElement('td');
        volumeAuto.textContent = volumeAutoVal;
        const typeAuto = document.createElement('td');
        typeAuto.textContent = typeAutoVal;
        const categoryAuto = document.createElement('td');
        categoryAuto.textContent = categoryAutoVal;

        row.appendChild(idAuto);
        row.appendChild(nameAuto);
        row.appendChild(dateAuto);
        row.appendChild(volumeAuto);
        row.appendChild(typeAuto);
        row.appendChild(categoryAuto);

        autoparkTable.appendChild(row);

        idAutoVal++;

        autoparkAddForm.reset();
        document.getElementById("add-autopark-form-container").classList.remove('active');
        document.getElementById("add-autopark-btn").classList.remove('active');
    })

    // Изменение ТС в таблице
    const autoparkChangeForm = document.getElementById('autopark-change-form');

    autoparkChangeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        selectedRow.cells[1].textContent = document.getElementById("change-autopark-name").value;
        selectedRow.cells[2].textContent = document.getElementById("change-autopark-date").value;
        selectedRow.cells[3].textContent = document.getElementById("change-autopark-volume").value;
        selectedRow.cells[4].textContent = document.getElementById("change-autopark-type").value;
        selectedRow.cells[5].textContent = document.getElementById("change-autopark-category").value;

        const idChangeAuto = selectedRow.dataset.id;
        console.log(idChangeAuto);
        const index = loadedAutopark.findIndex(auto => auto.id == idChangeAuto);

        loadedAutopark[index] = {
            id: Number(selectedRow.cells[0].textContent),
            name: document.getElementById("change-autopark-name").value,
            date: document.getElementById("change-autopark-date").value,
            volume: Number(document.getElementById("change-autopark-volume").value),
            type: document.getElementById("change-autopark-type").value,
            category: document.getElementById("change-autopark-category").value,
        };
        localStorage.setItem('autoparkList', JSON.stringify(loadedAutopark));

        autoparkChangeForm.reset();
        document.getElementById("change-autopark-form-container").classList.remove('active');
        document.getElementById("change-autopark-btn").classList.remove('active');

        selectedRow.classList.remove('selected-row');
        selectedRow = null;
    })

    // Удаление ТС из таблицы
    const autoparkDeleteForm = document.getElementById('autopark-delete-form');

    autoparkDeleteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (event.submitter.value == "Да") {
            const idChangeAuto = Number(selectedRow.cells[0].textContent);
            loadedAutopark = loadedAutopark.filter(auto => auto.id != idChangeAuto);
            localStorage.setItem('autoparkList', JSON.stringify(loadedAutopark));
            selectedRow.remove();
            selectedRow = null;
        } else {
            selectedRow.classList.remove('selected-row');
            selectedRow = null;
        }
        document.getElementById("delete-autopark-form-container").classList.remove('active');
        document.getElementById("delete-autopark-btn").classList.remove('active');
    });
});