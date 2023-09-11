import { state } from './state.js';
import * as yup from 'yup';
import { inputView } from './view.js';

const { input, submitBtn, feedbackP } = state.app.elements;

// utils
function validate (link) { // async
	const ifLinkUrl = yup.string().url();
	const ifLinkUniq = yup.mixed().notOneOf(state.input.feeds);
	return ifLinkUrl.validate(link).then(() => {
		return ifLinkUniq.validate(link);
	});
}

export default function app() {
	// general utils ?

	// core functionality
	
	// place for listeners
}
