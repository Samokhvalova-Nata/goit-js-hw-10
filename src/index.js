import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

    fetchCountries(searchQuery).then(data => {
        console.log(data)

    if (data.length > 2 && data.length < 10) {
        refs.countryContainer.innerHTML = "";
        createCountryListMarkup(data)
    }
    else if (data.length === 1) {
        refs.countrtyList.innerHTML = "";
        createCountryContainerMarkup(data)
    } else if (data.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")    
        }
    });
}


function createCountryListMarkup(countryArray) {
    const makeElementMarkup = ({ flags, name }) => {
        return `
        <li class="list_item">
            <img class="list_img" src="${flags.svg}" alt="${name.official}" width=25>
            <span class="list_span">${name.official}</span>
        </li>`
    };

    const makeListMarkup = countryArray.map(makeElementMarkup).join("");
    refs.countrtyList.insertAdjacentHTML("beforeend", makeListMarkup);
}

function createCountryContainerMarkup(countryArray) {
    const makeCard = ({ capital, name, population, languages, flags }) => {
        return `
        <div class="country_header">
        <img class="list_img" src="${flags.svg}" alt="${name.official}" width=25>
            <span class="country_span">${name.official}</span>
        </div>
        <ul class="country_card_list">
            <li class="country_item">
                <span class="country_key">Capital:</span>
                <span class="country_value">${capital}</span>
            </li>
            <li class="country_item">
                <span class="country_key">Population:</span>
                <span class="country_value">${population}</span>
            </li>
            <li class="country_item">
                <span class="country_key">Languages:</span>
                <span class="country_value">${Object.values(languages)}</span>
            </li>
        </ul>
        `
        
    };
    const makeCardMarkup = countryArray.map(makeCard);
    refs.countryContainer.innerHTML = makeCardMarkup;
}
