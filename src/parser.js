import { watchedState, watchedData } from "./view.js";

/*
export default function parse([link, xml]) {
	const parser = new DOMParser;
	const tree = parser.parseFromString(xml, 'text/xml');
	if (tree.querySelectorAll('rss').length === 0) {
		throw new Error('should be a valid URL');
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
*/

export default function parse([link, xml]) {
	const parser = new DOMParser;
	const tree = parser.parseFromString(xml, 'text/xml');
	if (tree.querySelectorAll('rss').length === 0) {
		throw new Error('should be a valid URL');
	}
	const items = {};
	tree.querySelectorAll('item')
		.forEach((item) => {
			let title = item.querySelector('title').textContent;
			items[title] = {
				title,
				link: item.querySelector('link').textContent,
				description: item.querySelector('description').textContent,
			}
		});
	const feedTitle = tree.querySelector('channel > title').textContent;
	const result = {
		title: feedTitle.includes('.') ? feedTitle.replace('.', '&period;') : feedTitle,
		link: link,
		description: tree.querySelector('channel > description').textContent,
		posts: items,
	};
	watchedState.input.feeds.push(link);
	watchedData[result.title] = result;
}
