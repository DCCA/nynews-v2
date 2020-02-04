import { API_KEY } from '../../config.js';

document.addEventListener(
	'DOMContentLoaded',
	function() {
		//START - Wrapper for DOM ready
		const sectionList = [
			'arts',
			'automobiles',
			'books',
			'business',
			'fashion',
			'food',
			'health',
			'home',
			'insider',
			'magazine',
			'movies',
			'nyregion',
			'obituaries',
			'opinion',
			'politics',
			'realestate',
			'science',
			'sports',
			'sundayreview',
			'technology',
			'theater',
			't - magazine',
			'travel',
			'upshot',
			'us',
			'world'
		];

		// Get elements in the HTML
		const sectionSelector = document.getElementById('section');
		const cardSection = document.querySelector('.card-section');

		sectionList.forEach(e => {
			const optionElement = document.createElement('option');
			optionElement.innerText = uppercaseFirstLetter(e);
			optionElement.value = e;
			sectionSelector.appendChild(optionElement);
		});

		// To Upper Case
		function uppercaseFirstLetter(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		// API Call
		function getStories(section) {
			fetch(
				`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_KEY}`
			)
				.then(res => res.json())
				.then(data => {
					console.log(data.section);
					console.log(data.results);
				})
				.catch(err => {
					console.log(err);
				});
		}

		// Create card
		function createCard(parentElement, imgUrl, abstract) {
			// Create div
			const div = document.createElement('div');
			div.setAttribute('class', 'card');
			div.style.backgroundImage = `url(${imgUrl})`;
			// Create abstract
			const p = document.createElement('p');
			p.setAttribute('class', abstract);
			p.innerText = abstract;
			// Append elements
			div.appendChild(p);
			parentElement.appendChild(div);
		}

		getStories('arts');
		createCard(cardSection, 'https://picsum.photos/640/360', 'Teste');

		// END - Wrapper for DOM ready
	},
	false
);
