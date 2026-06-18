import { initEmployees } from "./employees.js";
import { initAutopark } from "./autopark.js";
import { initMenu } from "./menu.js";

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initEmployees();
    initAutopark();
});