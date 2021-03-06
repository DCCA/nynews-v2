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
		const logoSelectBoxSec = document.querySelector('.logo-select-box-section');
		const thereIsContent = () => {
			if (cardSection.innerHTML === '') {
				return false;
			} else {
				return true;
			}
		};

		start();

		// Start
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
			cardSection.classList.remove('flex-1');
			logoSelectBoxSec.classList.remove('flex-1');
			fetch(
				`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${API_KEY}`
			)
				.then(res => res.json())
				.then(data => {
					const jData = data.results;
					filterResults(jData);
					for (let i = 0; i < Math.min(12, jData.length); i++) {
						createCard(
							cardSection,
							jData[i].multimedia[0].url,
							jData[i].abstract,
							jData[i].url
						);
					}
				})
				.then(() => {
					logo.classList.add('logo-with-content');
					logo.classList.remove('logo');
					loader.classList.add('none');
				})
				.catch(err => {
					loader.classList.add('none');
					if (thereIsContent) {
						errorMsg.classList.remove('none');
						cardSection.classList.add('flex-1');
						logoSelectBoxSec.classList.add('flex-1');
					}
				});
		}

		// Filter results
		function filterResults(data) {
			data.forEach(e => {
				if (e.multimedia === null) {
					data.splice(data.indexOf(e), 1);
				}
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
			const h3 = createElement('h3');
			h3.setAttribute('class', 'abstract');
			h3.innerText = abstract;
			// Append elements
			div.appendChild(h3);
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
