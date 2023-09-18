import { state } from './state.js';
import * as yup from 'yup';
import { watchedState } from './view.js';
import axios from 'axios';
import parse from './parser.js';

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
		.then((bool) => [bool, link]);
}

function requestAndValidate([bool, link]) {
	if (!bool) return;
	return axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(link)}`)
	.then((response) => {
		console.log(response.data.contents);
		return [link, response.data.contents];
	})
	.catch((err) => {
		watchedState.app.errors.push(err.errors[0]);
	})
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
	submitBtn.addEventListener('click', async (e) => {
		e.preventDefault();
		watchedState.input.enable = false;
		watchedState.app.state = 'load';
		validateLink(input.value).then((processed) => {
			console.log(processed);
			return requestAndValidate(processed);
		}).then((xml) => {
			return parse(xml);
		}).then(([link, parsedData]) => {
			console.log(parsedData);
			watchedState.newData = parsedData;
			watchedState.input.feeds.push(link);
		});
	});
/*
	// should make link fade after click
	document.querySelectorAll('posts li')
		.forEach((li) => {
			li.addEventListener('click', (e) => {
				e.target.classList.remove('fw-bold');
				e.target.classList.add('fw-normal', 'link-secondary');
			});
		});
 */
}
