const btn = document.querySelector('.button_2');

btn.addEventListener('click', () => {
    let width = window.screen.width;
    let height = window.screen.height;

    return alert(`Ширина экрана = ${width}px, высота экрана = ${height}px`)
});