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
		.then(() => link)
		.catch((err) => {
			throw new Error(err.errors[0]);
		}); // was [bool, link];
}

function requestAndValidate(link) {
	return axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(link)}`)
		.then((response) => {
			console.log(response.data.contents);
			return [link, response.data.contents];
		})
		.catch((err) => {
			throw new Error(err);
		});
}

function checkNewPosts(feedLink) {
	axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(feedLink)}`)
		.then((response) => {
			// here we parse it
		})
}

export default function app() {
	submitBtn.addEventListener('click', (e) => {
		e.preventDefault();
		watchedState.input.enable = false;
		watchedState.app.state = 'load';
		validateLink(input.value)
			.then((varifiedLink) => {
				return requestAndValidate(varifiedLink);
			}).then((contents) => {
				return parse(contents);
			}).then(() => {
				watchedState.app.state = 'success';
				watchedState.input.state = 'empty';
				watchedState.input.enable = true;
			})
			.catch((err) => {
				watchedState.input.enable = true;
				watchedState.input.state = 'fail';
				watchedState.app.state = 'fail';
				watchedState.app.errors.push(err.message);
			});
	});
}
