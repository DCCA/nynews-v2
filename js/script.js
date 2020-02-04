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
		const sectionSelector = document.getElementById('section-selector');
		const cardSection = document.querySelector('.card-section');

		sectionList.forEach(element => {
			const optionElement = document.createElement('option');
			optionElement.innerText = uppercaseFirstLetter(element);
			optionElement.value = element;
			sectionSelector.appendChild(optionElement);
		});

		// Add event listener
		sectionSelector.addEventListener('change', event => {
			console.log(event);
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
					data = data.results;
					console.log(data[0]);
					data.forEach(element => {
						createCard(
							cardSection,
							element.multimedia[2].url,
							element.abstract
						);
					});
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
			p.setAttribute('class', 'abstract');
			p.innerText = abstract;
			// Append elements
			div.appendChild(p);
			parentElement.appendChild(div);
		}

		getStories('movies');

		// END - Wrapper for DOM ready
	},
	false
);
