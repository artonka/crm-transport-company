export const state = {
    selectedRow: null
};

export function selectRowTable(table) {
    table.addEventListener('click', (event) => {
        const row = event.target.closest('tr');

        if (!row || row.closest('thead')) { return; }

        if (state.selectedRow === row) {
            row.classList.remove('selected-row');
            state.selectedRow = null;
        } else {
            if (state.selectedRow) { state.selectedRow.classList.remove('selected-row'); }
            row.classList.add('selected-row');
            state.selectedRow = row;
        }
    });
};

export function clearSelection() {
    if (state.selectedRow) {
        state.selectedRow.classList.remove('selected-row');
        state.selectedRow = null;
    }
};

export function addRowTable() {

};

export function changeRowTable() {

};

export function deleteRowTable() {

};

export function renderRowTable(content, fields, table) {
    const row = document.createElement('tr');
    row.dataset.id = content.id;

    fields.forEach(field => {
        const td = document.createElement('td');
        td.textContent = content[field];
        row.appendChild(td);
    });

    table.appendChild(row);
};