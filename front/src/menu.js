import { state, clearSelection } from './state.js';

export function initMenu() {
    const topButtons = document.querySelectorAll('.top-btn');
    const subButtons = document.querySelectorAll('.sub-btn');

    topButtons.forEach(button => {
        button.addEventListener('click', () => {
            clickMenuBtns(button, topButtons);
            clearSelection();
        });
    });

    subButtons.forEach(button => {
        button.addEventListener('click', () => {
            clickMenuBtns(button, subButtons);
            clearSelection();
        });
    });
};

export function deactivate(element) {
    if (!element) return;

    element.classList.remove('active');
    const targetId = element.getAttribute('data-target');

    if (targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            const activeChildren = target.querySelectorAll('.active');
            activeChildren.forEach(child => deactivate(child));
            target.classList.remove('active');
        }
    }
};

export function clickMenuBtns(button, siblingButtons) {
    const isAlreadyActive = button.classList.contains('active');

    siblingButtons.forEach(btn => {
        if (btn !== button) {
            deactivate(btn);
        }
    });

    if (isAlreadyActive) {
        deactivate(button);
    } else {
        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        const target = document.getElementById(targetId);
        if (target) {
            target.classList.add('active');
        }
    }
};