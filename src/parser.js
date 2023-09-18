import { watchedState } from "./view.js";

export default function parse([link, xml]) {
	const parser = new DOMParser;
	const tree = parser.parseFromString(xml, 'text/xml');
	if (tree.querySelector('rss') == undefined) {
		watchedState.app.errors.push('should be a valid link');
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