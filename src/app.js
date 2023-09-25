import { state } from './state.js';
import * as yup from 'yup';
import { watchedState } from './view.js';
import axios from 'axios';
import parse from './parser.js';
import { p } from './parser.js';

const { input, submitBtn } = state.elements.core;

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
		});
}

export default function app() {
	submitBtn.addEventListener('click', (e) => {
		e.preventDefault();
		watchedState.input.enable = false;
		watchedState.app.state = 'load';
		validateLink(input.value).then((processed) => {
			console.log(processed);
			return requestAndValidate(processed);
		}).then((xml) => {
			p(xml);
			return parse(xml);
		}).then(([link, parsedData]) => {
			console.log(parsedData);
			watchedState.newData = parsedData;
			watchedState.input.feeds.push(link);
			return Promise.resolve(true);
		})
		.then(() => {
			watchedState.app.state = 'success';
			watchedState.input.state = 'empty';
			watchedState.input.enable = true;
		});
		// add catch here
	});
}
