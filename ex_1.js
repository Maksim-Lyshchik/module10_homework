const button = document.querySelector('.button_1');
const icon = document.querySelector('.button_1 svg');

const ONE = 'fill'
const TWO = 'circle'

button.addEventListener('click', (event) => {
	event.preventDefault()
	if (icon.classList.contains(TWO)) {
		icon.classList.remove(TWO)
		icon.classList.add(ONE)
	} else {
		icon.classList.remove(ONE)
		icon.classList.add(TWO)
	}
})