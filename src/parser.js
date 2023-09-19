import { watchedState } from "./view.js";

export default function parse([link, xml]) {
	const parser = new DOMParser;
	const tree = parser.parseFromString(xml, 'text/xml');
	if (tree.querySelectorAll('rss').length === 0) {
		watchedState.app.errors.push('should be a valid URL');
		watchedState.input.state = 'fail';
		watchedState.input.enable = true;
		return;
	}
	const items = [];
	tree.querySelectorAll('item')
		.forEach((item) => {
			items.push({
				title: item.querySelector('title').textContent,
				link: item.querySelector('link').textContent,
				description: item.querySelector('description').textContent,
			});
		});
	const result = {
		feed: {
			title: tree.querySelector('channel > title').textContent,
			description: tree.querySelector('channel > description').textContent,
		},
		items: items,
	};
	console.log(result);
	return Promise.resolve([link, result]);
}