export const state = {
	elements: {
		core: {
			input: document.querySelector('#url-input'),
			submitBtn: document.querySelector('button[type=submit]'),
			feedbackP: document.querySelector('p.feedback'),
		},
	},
	app: {
		state: 'welcome', // welcome, load, success, fail ???
		feeds: [], // { name, url };
		errors: [], // invalid url, empty input, (bad connection)
	},
	input: {
		state: 'empty',
		/*
		empty - fullfilled the load, ready for new input
		ready - successful validation, ready to load resource
		fail - failed validation, ready for new input
	  */
		enable: true,
		value: '',
		feeds: [], // links to urls in state.app.feeds
	},
	feedbackP: {
		state: 'hidden', // visible, hidden
		color: 'green', // green, red
		content: '', // textContent
	}
}
