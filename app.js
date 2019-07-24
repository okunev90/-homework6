const themes = {
    white: {
        '--box-bg': 'white',
        '--box-text-color': 'black',
    },
    black: {
        '--box-bg': 'black',
        '--box-text-color': 'white',
    },
};

const controls = [
    'themeName',
    '--box-bg',
    '--box-text-color'
];


const themeSelect = document.getElementById('themes');
const form = document.forms['customThemeFrom'];

console.log(form);


for (let i = 0; i < controls.length; i++) {
    const div = document.createElement('div');
    div.classList.add('controls-item');
    const label = document.createElement('label');
    label.setAttribute('for', controls[i]);
    label.textContent = controls[i];
    const input = document.createElement('input');
    if (controls[i] === 'themeName') {
        input.setAttribute('type', 'text');
    } else {
        input.setAttribute('type', 'color');
    }

    input.setAttribute('id', controls[i]);
    input.setAttribute('data-var', controls[i]);

    form.appendChild(div);
    div.appendChild(label);
    div.appendChild(input);
}


const button = document.createElement('button');
button.setAttribute('type', 'submit');
button.textContent = 'Save property';
form.appendChild(button);

const colorInputs = document.querySelectorAll('[data-var]');
const inputThemeName = form.elements['themeName'];

themeSelect.addEventListener('change', e => {
    const themeVariables = themes[themeSelect.value];
    Object.entries(themeVariables).forEach(([key, value]) => {
        document.body.style.setProperty(key, value);
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const newTheme = {};
    const newThemeName = inputThemeName.value;
    colorInputs.forEach(input => {
        const key = input.dataset.var;
        const value = input.value;
        newTheme[key] = value;
    });

    themes[newThemeName] = newTheme;
    const newSelectOption = new Option(newThemeName, newThemeName);
    themeSelect.appendChild(newSelectOption);
    form.reset();
});
