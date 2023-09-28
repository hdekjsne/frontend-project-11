import { watchedState, watchedData } from "./view.js";
import { data } from "./data/data.js";

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

export function parse([link, xml]) {
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
	const feedTitle = tree.querySelector('channel > title').textContent.replace('.', '&period;');
	const result = {
		title: feedTitle,
		link: link,
		description: tree.querySelector('channel > description').textContent,
		posts: items,
	};
	watchedState.input.feeds.push(link);
	watchedData[result.title] = result;
}

export function parseSinglePost(xml) {
	const parser = new DOMParser;
	const tree = parser.parseFromString(xml, 'text/xml');
	const feedTitle = tree.querySelector('channel > title').textContent.replace('.', '&period;');
	const existingPosts = Object.keys(data[feedTitle].posts);
	tree.querySelectorAll('item')
	.forEach((item) => {
			const postTitle = item.querySelector('title').textContent;
			if (!existingPosts.includes(postTitle)) {
				watchedData[feedTitle].posts[postTitle] = {
					title: postTitle,
					description: item.querySelector('description').textContent,
					link: item.querySelector('link').textContent,
				};
			}
		});
}
