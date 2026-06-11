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
            empButtons.forEach(btn => btn.classList.remove('active'));
            empForms.forEach(frm => frm.classList.remove('active'));
            clickMenuBtns(button, topButtons, subMenus);
        });
    });

    subButtons.forEach(button => {
        button.addEventListener('click', () => {
            empButtons.forEach(btn => btn.classList.remove('active'));
            empForms.forEach(frm => frm.classList.remove('active'));
            clickMenuBtns(button, subButtons, pages);
        })
    });

    // Работа кнопок управления сотрудниками с формами
    const empButtons = document.querySelectorAll(".emp-btn");
    const empForms = document.querySelectorAll(".emp-form-container");

    empButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id == "change-emp-btn" && selectedRow) {
                clickMenuBtns(button, empButtons, empForms);
                document.getElementById("change-name").value = selectedRow.cells[1].textContent;
                document.getElementById("change-email").value = selectedRow.cells[2].textContent;
                document.getElementById("change-phone").value = selectedRow.cells[3].textContent;
                document.getElementById("change-address").value = selectedRow.cells[4].textContent;
            } else if (button.id == "add-emp-btn") {
                clickMenuBtns(button, empButtons, empForms);
            } else {
                alert('Выберите сотрудника в таблице для изменения.');
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

    const empTable = document.getElementById("emp-table");

    // Добавление сотрудника в таблицу
    const empAddForm = document.getElementById("emp-add-form");
    let empTableId = 4;

    empAddForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameEmpVal = document.getElementById("add-name").value;
        const emailEmpVal = document.getElementById("add-email").value;
        const phoneEmpVal = document.getElementById("add-phone").value;
        const addressEmpVal = document.getElementById("add-address").value;

        const row = document.createElement('tr');

        row.dataset.id = empTableId;
        const idEmp = document.createElement('td');
        idEmp.textContent = empTableId;
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

        empTable.appendChild(row);

        empTableId++;

        empAddForm.reset();
        document.getElementById("add-emp-form-container").classList.remove('active');
        document.getElementById("add-emp-btn").classList.remove('active');
    })

    // Выделение строки
    let selectedRow = null;

    empTable.addEventListener('click', (event) => {
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

    // Изменение сотрудника в таблице
    const empChangeForm = document.getElementById('emp-change-form');

    empChangeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        selectedRow.cells[1].textContent = document.getElementById("change-name").value;
        selectedRow.cells[2].textContent = document.getElementById("change-email").value;
        selectedRow.cells[3].textContent = document.getElementById("change-phone").value;
        selectedRow.cells[4].textContent = document.getElementById("change-address").value;
        empChangeForm.reset();
        document.getElementById("change-emp-form-container").classList.remove('active');
        document.getElementById("change-emp-btn").classList.remove('active');

        selectedRow.classList.remove('selected-row');
        selectedRow = null;
    })

    // Удаление сотрудника из таблицы    
    const empDeleteBtn = document.getElementById('delete-emp-btn');
    empDeleteBtn.addEventListener('click', () => {
        if (selectedRow) {
            const empId = selectedRow.dataset.id || selectedRow.cells[0].textContent;
            selectedRow.remove();
            selectedRow = null;
        } else {
            alert('Выберите сотрудника в таблице для удаления.');
        }
    });


});