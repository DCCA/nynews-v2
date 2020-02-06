import { API_KEY } from '../../config.js';

document.addEventListener(
	'DOMContentLoaded',
	function() {
		//START - Wrapper for DOM ready

		// Sections from NY Time
		const sectionList = [
			'select',
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
		const logo = document.querySelector('.logo');

		sectionList.forEach(element => {
			const optionElement = document.createElement('option');
			optionElement.innerText = uppercaseFirstLetter(element);
			optionElement.value = element;
			sectionSelector.appendChild(optionElement);
		});

		// Add event listener
		sectionSelector.addEventListener('change', event => {
			cleanCard();
			getStories(event.target.value);
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
					console.log(data);
					// Filter articles without multimedia
					data.forEach(e => {
						if (e.multimedia === null) {
							console.log(e);
							data.splice(data.indexOf(e), 1);
						}
					});
					console.log(data);
					// Run the loop to create the card
					for (let i = 0; i < 12; i++) {
						createCard(
							cardSection,
							data[i].multimedia[0].url,
							data[i].abstract,
							data[i].url
						);
					}
					logo.classList.add('logo-with-content');
					logo.classList.remove('logo');
				})
				.catch(err => {
					console.log(err);
				});
		}

		// Create card
		function createCard(parentElement, imgUrl, abstract, articleUrl) {
			// Create div
			const div = createElement('div');
			div.setAttribute('class', 'card');
			div.style.backgroundImage = `url(${imgUrl})`;
			div.style.backgroundPosition = 'center';
			div.style.backgroundSize = 'cover';
			// Create a element
			const a = createElement('a');
			a.setAttribute('href', articleUrl);
			a.setAttribute('class', 'card-link');
			a.setAttribute('target', '_blank');
			// Create abstract
			const p = createElement('p');
			p.setAttribute('class', 'abstract');
			p.innerText = abstract;
			// Append elements
			div.appendChild(p);
			div.appendChild(a);
			parentElement.appendChild(div);
		}
		// Clean the card section to include new cards
		function cleanCard() {
			cardSection.innerHTML = '';
			logo.classList.remove('logo-with-content');
			logo.classList.add('logo');
		}
		// Function to create a new element
		function createElement(e) {
			return document.createElement(e);
		}
		// END - Wrapper for DOM ready
	},
	false
);
