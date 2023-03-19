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

    fetchCountries(searchQuery);
}



