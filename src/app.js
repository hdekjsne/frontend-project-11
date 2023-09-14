import { state } from './state.js';
import * as yup from 'yup';
import { watchedState } from './view.js';

const { input, submitBtn, feedbackP } = state.elements.core;

// utils
function validateLink(link) {
	const ifUrl = yup.string().required().url().trim();
	const ifUniq = yup.mixed().notOneOf(watchedState.input.feeds);
	return Promise.all([ifUrl.validate(link), ifUniq.validate(link)])
		.then(() => {
			watchedState.input.state = 'ready';
			return true;
		})
		.catch((err) => {
			watchedState.input.enable = true;
			watchedState.input.state = 'fail';
			watchedState.app.state = 'fail';
			watchedState.app.errors.push(err.errors[0]);
			return false;
		})
		.then((bool) => bool); // to deliver this value to the next validator, which extracts the RSS
}

/*
next validator: 
- gets the resources
- checks if that's RSS
- delivers resources to parser
- blocks the input for time of loading 
- adds the link to state.app.feeds (and link in state.input.feeds) in case of success
*/

export default function app() {
	// general utils ?

	// core functionality
	
	// place for listeners
	submitBtn.addEventListener('click', (e) => {
		e.preventDefault();
		watchedState.input.enable = false;
		watchedState.app.state = 'load';
		validateLink(input.value); // async
	});
}
