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
		const loader = document.querySelector('.loader');
		const errorMsg = document.querySelector('.error-message');

		start();

		function start() {
			// Set the select elements
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
		}

		// To Upper Case
		function uppercaseFirstLetter(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		// API Call
		function getStories(section) {
			loader.classList.remove('none');
			errorMsg.classList.add('none');
			fetch(
				`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_KEY}`
				// Test wrong URL
				// 'https;//api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_KEY}'
			)
				.then(res => res.json())
				.then(data => {
					data = data.results;
					filterResults(data);
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
					loader.classList.add('none');
				})
				.catch(err => {
					console.log(err);
					loader.classList.add('none');
					if (cardSection.innerHTML === '') {
						errorMsg.classList.remove('none');
					}
				});
		}

		// Filter results
		function filterResults(data){
			data.forEach(e => {
				if (e.multimedia === null) {
					data.splice(data.indexOf(e), 1);
				}
		})};

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
