import { state } from './state.js';
import * as yup from 'yup';
import { watchedState } from './view.js';

const { input, submitBtn, feedbackP } = state.elements.core;

// utils
function validate (link) { // async
	const ifLinkUrl = yup.string().url();
	const ifLinkUniq = yup.mixed().notOneOf(state.input.feeds);
	return ifLinkUrl.validate(link).then((bool) => {
		return state.input.feeds.length > 0
			? ifLinkUniq.validate(link)
			: bool;
	});
}

export default function app() {
	// general utils ?
	
	// core functionality
	
	// place for listeners
}
