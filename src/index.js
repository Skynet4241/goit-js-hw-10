import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchInput = document.getElementById('search-box');
const countriesField = document.querySelector('.country-info');
const countriesList = document.querySelector('.country-list');

searchInput.addEventListener(
  'input',
  debounce(() => {
    const query = searchInput.value.trim();
    cleanHtml();
    fetchCountries(query).then(foundData => {
      renderCountriesList(foundData);
    });
  }, DEBOUNCE_DELAY)
);

function renderCountriesList(countries) {
  const countryList = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `<li>
        <img src="${flags.svg}" alt="Flag of ${
        name.official
      }" width = 30px height = 20px />
        <h2>${name.official}</h2>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages)}</p>
      </li>`;
    })
    .join('');
  countriesList.insertAdjacentHTML('beforeend', countryList);
}

function renderOneCountry(countries) {
  const countryEl = countries
    .map(({ name, flags }) => {
      return `<li>
      <img src="${flags.svg}" alt="Flag of ${name.official}" width="30" hight="20">
         <b>${name.official}</p>
                </li>`;
    })
    .join('');
  countriesList.insertAdjacentHTML('beforeend', countryEl);
}

function cleanHtml() {
  countriesField.innerHTML = '';
  countriesList.innerHTML = '';
}
