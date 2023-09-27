const $ = element => document.querySelector(element);
const $$ = element => document.querySelectorAll(element);
const ChangeThemeButton = $('#theme');
const currentTheme = localStorage.getItem("theme");
const navButtons = $$("nav li");
const areas = $$(".area")
const updateButton = $('#update');
const updateArea = $('#update-home');
const darkModeSVG = $('#dark-mode');
const lightModeSVG = $('#light-mode');

// Get the last set theme from local storage
if (currentTheme && currentTheme === "light") {
    darkModeSVG.style.display = "none";
    lightModeSVG.style.display = "block";
    document.documentElement.style.setProperty("--primary-color", "#f6f7f8");
    document.documentElement.style.setProperty("--tertiary-color", "#282c34");
    document.documentElement.style.setProperty("--cuaternary-color", "#53535386");
}

// Change theme button
ChangeThemeButton.addEventListener('click', () => {
    const getTheme = getComputedStyle(document.documentElement);
    const theme = getTheme.getPropertyValue('--theme');
    const setTheme = document.documentElement.style;

    if (theme == "dark") {
        localStorage.setItem("theme", "light");
        darkModeSVG.style.display = "none";
        lightModeSVG.style.display = "block";
        setTheme.setProperty("--theme", "light");
        setTheme.setProperty("--primary-color", "#f6f7f8");
        setTheme.setProperty("--tertiary-color", "#282c34");
        setTheme.setProperty("--cuaternary-color", "#53535386");
    } else {
        darkModeSVG.style.display = "block";
        lightModeSVG.style.display = "none";
        localStorage.setItem("theme", "dark");
        setTheme.setProperty("--theme", "dark");
        setTheme.setProperty("--primary-color", "#282c34");
        setTheme.setProperty("--tertiary-color", "#f6f7f8");
        setTheme.setProperty("--cuaternary-color", "#adadad86");
    }
});

// Manage the different sections
navButtons.forEach(nav => {
    const buttonName = nav.textContent.toLowerCase();
    nav.addEventListener('click', () => {
        // Toggle the areas display
        areas.forEach(area => {
            area.id === buttonName ? area.classList.remove("hide") : area.classList.add("hide");
        });

        // Fetch the data
        fetch(`/get/${buttonName}`)
        .then(res => res.json())
        .then(data => {
            $(`#${buttonName}-update`).innerHTML = data;
        });
    });
});