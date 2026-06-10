document.addEventListener('DOMContentLoaded', () => {
    
    const modeButtons = document.querySelectorAll('.mode-btn');
    const subMenus = document.querySelectorAll('.sub-menu');

    modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const isAlreadyActive = button.classList.contains('active');

        modeButtons.forEach(btn => btn.classList.remove('active'));
        subMenus.forEach(menu => menu.classList.remove('active-menu'));

        navButtons.forEach(btn => btn.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));

        if (!isAlreadyActive) {
            button.classList.add('active');

            const targetMenuId = button.getAttribute('data-target'); 
            const targetMenu = document.getElementById(targetMenuId);
            if (targetMenu) {
                targetMenu.classList.add('active-menu');
            }
        }
    });
});

    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isAlreadyActive = button.classList.contains('active');
            
            navButtons.forEach(btn => btn.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));

            
            if(!isAlreadyActive) {
                button.classList.add("active")
                const targetId = button.getAttribute('data-target');
                const targetPage = document.getElementById(targetId);                
                if (targetPage) {
                    targetPage.classList.add('active');
                }
            }
        });
    });
});