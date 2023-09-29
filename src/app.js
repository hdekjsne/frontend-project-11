import { state } from './state.js';
import * as yup from 'yup';
import { watchedState } from './view.js';
import axios from 'axios';
import { parse, parseSinglePost } from './parser.js';

const { input, submitBtn } = state.elements.core;
let fiveSecCheck;

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
		});
}

function requestAndValidate(link) {
	return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(link)}`)
		.then((response) => {
			return [link, response.data.contents];
		})
		.catch((err) => {
			throw new Error(err);
		});
}

function checkNewPosts() {
	state.input.feeds.forEach((feedLink) => {
		axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(feedLink)}`)
			.then((response) => {
				parseSinglePost(response.data.contents);
			});
	});
	fiveSecCheck = setTimeout(checkNewPosts, 5000);
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

	fiveSecCheck = setTimeout(checkNewPosts, 5000);
}
