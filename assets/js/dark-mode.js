const darkModeToggleContainer = document.getElementById(
    'dark-mode-toggle-container'
)
const darkModeToggleInput = document.getElementById('dark-mode-toggle')

// set up dark mode toggle
function setDarkMode(on) {
    const sunIcon = document.getElementById('sun-icon')
    const moonIcon = document.getElementById('moon-icon')

    if (on) {
        if (darkModeToggleInput) darkModeToggleInput.checked = true
        document.documentElement.classList.add('dark')
        if (sunIcon) sunIcon.classList.add('hidden')
        if (moonIcon) moonIcon.classList.remove('hidden')
    } else {
        if (darkModeToggleInput) darkModeToggleInput.checked = false
        document.documentElement.classList.remove('dark')
        if (moonIcon) moonIcon.classList.add('hidden')
        if (sunIcon) sunIcon.classList.remove('hidden')
    }
}

// Will prefer dark mode, if the user has set it on their device.
const userPrefersDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

// If the user has taken an active choice to set mode, which is stored
// in local storage, use that. Otherwise, prefer user device preference.
if (localStorage.theme) {
    setDarkMode(localStorage.theme === 'dark')
} else if (
    userPrefersDarkMode ||
    document.documentElement.classList.contains('dark')
) {
    setDarkMode(true)
} else {
    setDarkMode(false)
}

if (darkModeToggleContainer && darkModeToggleInput) {
    darkModeToggleContainer.addEventListener('click', function () {
        if (darkModeToggleInput.checked) {
            localStorage.theme = 'light'
            setDarkMode(false)
        } else {
            localStorage.theme = 'dark'
            setDarkMode(true)
        }
    })
}

// remove preload class after the page laods so the styles
// will transition smoothly when switching between dark and
// light mode. Without the preload class, the transition will
// happen on page load if dark mode is enabled
setTimeout(() => {
    document.body.classList.remove('preload')
}, 200)
