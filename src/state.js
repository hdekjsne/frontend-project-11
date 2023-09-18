export const state = {
	elements: {
		core: {
			input: document.querySelector('#url-input'),
			submitBtn: document.querySelector('button[type=submit]'),
			feedbackP: document.querySelector('p.feedback'),
		},
		posts: {
			container: document.querySelector('.posts'),
			ul: undefined,
		},
		feeds: {
			container: document.querySelector('.feeds'),
			ul: undefined,
		},
	},
	app: {
		state: 'welcome',
		/*
		welcome - initial state
		load - the process of validation + load
				- empty feedback
				- disabled input
		success - successful load
				- feedback is green + message
		fail - fail in validation
				- feedback is red + message
				- red enabled input
		*/
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
		feeds: [], // links used in input
	},
	feedbackP: {
		state: 'hidden', // visible, hidden
		color: 'green', // green, red
		content: '', // textContent
	},
	newData: undefined,
}
