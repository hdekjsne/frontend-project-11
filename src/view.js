import i18next from 'i18next';
import { ru } from './locales/ru.js';
import { state } from './state.js';
import onChange from 'on-change';

i18next.init({
	lng: 'ru',
	debug: false,
	resources: {
		ru: { ...ru },
	},
});

const { input, feedbackP } = state.elements.core;
const { posts, feeds } = state.elements;

function styleInput() {
	switch (state.input.state) {
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
	if (state.app.errors.length === 0) return;
	const error = state.app.errors[0];
	feedbackP.classList.remove('text-success');
	feedbackP.classList.add('text-danger');
	if (error.match(/a valid URL$/)) {
		feedbackP.textContent = i18next.t('feedback.errors.invalidURL');
	} else if (error.match(/one of the following/)) {
		feedbackP.textContent = i18next.t('feedback.errors.notUniq');
	}
	watchedState.app.errors = [];
}

function initList(side) {
	const h = document.createElement('h2');
	h.classList.add('card-title', 'h4');
	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body');
	cardBody.append(h);
	const card = document.createElement('div');
	card.classList.add('card', 'border-0');
	card.append(cardBody);
	const ul = document.createElement('ul');
	ul.classList.add('list-group', 'border-0', 'rounded-0');
	card.append(ul);
	switch (side) {
		case 'posts':
			h.textContent = i18next.t('DOMelements.posts');
			watchedState.elements.posts.ul = ul;
			posts.container.append(card);
			break;
		case 'feeds':
			h.textContent = i18next.t('DOMelements.feeds');
			watchedState.elements.feeds.ul = ul;
			feeds.container.append(card);
		default:
			break;
	}
}

function createFeed() {
	const li = document.createElement('li');
	li.classList.add('list-group-item', 'border-0', 'border-end-0');
	const h = document.createElement('h3');
	h.classList.add('h6', 'm-0');
	h.textContent = state.newData.feed.title;
	const p = document.createElement('p');
	p.classList.add('m-0', 'small', 'text-black-50');
	p.textContent = state.newData.feed.description;
	li.append(h, p);
	state.elements.feeds.ul.prepend(li);
}

function createPost(item) {
	const li = document.createElement('li');
	li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
	const a = document.createElement('a');
	a.classList.add('fw-bold');
	a.setAttribute('target', '_blank');
	a.setAttribute('rel', 'noopener noreferrer');
	a.href = item.link;
	a.textContent = item.title;
	const button = document.createElement('button');
	button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
	button.setAttribute('type', 'button');
	button.setAttribute('data-bs-toggle', 'modal');
	button.setAttribute('data-bs-target', '#modal');
	button.textContent = i18next.t('DOMelements.watch');
	li.append(a, button);
	li.addEventListener('click', (e) => {
		li.querySelector('a').classList.remove('fw-bold');
		li.querySelector('a').classList.add('fw-normal', 'link-secondary');
	})
	state.elements.posts.ul.prepend(li);
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
			break;
		case 'app.state':
			if (state.app.state === 'load') feedbackP.textContent = '';
			if (state.app.state === 'success') {
				feedbackP.classList.remove('text-danger');			
				feedbackP.classList.add('text-success');
				feedbackP.textContent = i18next.t('feedback.success');
			}
			break;
		case 'input.feeds':
			if (state.input.feeds.length === 1) {
				initList('posts');
				initList('feeds');
			}
			createFeed();
			for (const item of state.newData.items) {
				createPost(item);
			}
		default:
			break;
	}
});
