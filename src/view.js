import { state } from './state.js';
import onChange from 'on-change';

const { input, submitBtn, feedbackP } = state.elements.core;

function styleInput() {
	switch (watchedState.input.state) {
		case 'empty':
			input.textContent = null;
			input.setAttribute('autofocus', '');
		case 'ready':
			input.classList.remove('is-invalid');
			break;
		case 'fail':
			input.classList.add('is-invalid');
		default:
			break;
	}
}

function showError() {
	if (watchedState.app.errors.length === 0) return;
	const error = watchedState.app.errors[0];
	if (error.match(/a valid URL$/)) {
		feedbackP.classList.remove('--bs-success-text-emphasis');
		feedbackP.classList.add('--bs-danger-text-emphasis');
		feedbackP.textContent = 'Ссылка должна быть валидным URL';
	} else if (error.match(/one of the following/)) {
		feedbackP.classList.remove('--bs-success-text-emphasis');
		feedbackP.classList.add('--bs-danger-text-emphasis');
		feedbackP.textContent = 'RSS уже существует';
	}
	watchedState.app.errors = [];
}

export const watchedState = onChange(state, (path) => {
	switch (path) {
		case 'input.state':
			styleInput();
			break;
		case 'input.enable':
			if (state.input.enable === true) input.removeAttribute('disabled');
			if (state.input.enable === false) input.setAttribute('disabled', '');		
			break;
		case 'app.errors':
			showError();
		default:
			break;
	}
});
