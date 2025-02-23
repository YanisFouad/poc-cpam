document.addEventListener('DOMContentLoaded', () => {
    const openNavBtn = document.querySelectorAll('.open-main-nav');
    const closeNavBtn = document.querySelector('.close-main-nav');
    const mainNav = document.querySelector('#main-nav');
    const navBackground = document.querySelector('.main-nav-background');

    function toggleNav() {
        mainNav.classList.toggle('open');
        navBackground.classList.toggle('open');
    }

    openNavBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            toggleNav();
        });
    });

    closeNavBtn.addEventListener('click', () => {
        toggleNav();
    });
});
