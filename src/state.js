export const state = {
	app: {
		state: 'welcome', // welcome, load, success, fail
		feeds: [], // { name, url }
		errors: [], // INVALID URL, EMPTY INPUT, BAD CONNECTION
		elements: {
			input: document.querySelector('#url-input'),
			submitBtn: document.querySelector('button[type=submit]'),
			feedbackP: document.querySelector('p.feedback'),
		},
	},
	input: {
		state: 'empty', // empty, typing, ready
		value: '',
		feeds: [], // links to urls from state.app.feeds
	},
}