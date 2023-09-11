export const state = {
	elements: {
		core: {
			input: document.querySelector('#url-input'),
			submitBtn: document.querySelector('button[type=submit]'),
			feedbackP: document.querySelector('p.feedback'),
		},
	},
	app: {
		state: 'welcome', // welcome, load, success, fail
		feeds: [], // { name, url };
		errors: [], // invalid url, empty input, (bad connection)
	},
	input: {
		state: 'empty', // empty, typing, ready
		isValid: true,
		value: '',
		feeds: [], // links to urls in state.app.feeds
	},
	feedbackP: {
		state: 'hidden', // visible, hidden
		color: 'green', // green, red
		content: '', // textContent
	}
}