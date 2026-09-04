const menuToggleButton = document.getElementById("menu-toggle-button");

if (menuToggleButton) {
    menuToggleButton.addEventListener('click', function() {
        const nav = document.getElementById('nav');
        if (nav) nav.classList.toggle('-ml-64');
    })
}
