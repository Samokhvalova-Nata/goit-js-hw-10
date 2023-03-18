import './css/styles.css';
import debounce from 'lodash.debounce';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('input#search-box'),
    countrtyList: document.querySelector('.country-list'),
    countryContainer: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));

function handleSearch(evt) {
    evt.preventDefault();
    const searchQuery = evt.target.value.trim();

    fetchCountries(searchQuery).then(createCountryListMarkup);
}

function createCountryListMarkup(countryArray) {
    const makeElementMarkup = ({ flags, name }) => {
        return `
        <li class="list_item">
            <img class="list_img" src="${flags.svg}" alt="${name.official}" width=15></img>
            <span class="list_span">${name.official}</span>
        </li>`
    };

    const makeListMarkup = countryArray.map(makeElementMarkup).join("");
    refs.countrtyList.insertAdjacentHTML("beforeend", makeListMarkup);
}

