import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchInput = document.getElementById('search-box');
const countriesField = document.querySelector('.country-info');
const countriesList = document.querySelector('.country-list');

searchInput.addEventListener(
  'input',
  debounce(e => {
    const query = searchInput.value.trim();
    cleanHtml();
    fetchCountries(query);
  }, DEBOUNCE_DELAY)
);

function renderCountries(countries) {
  countriesList.innerHTML = '';
  // const newCountries = fetchCountries().then(countries => {
  //   return countries;
  // });

  const countriesEl = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `<li>
        <img src="${flags.svg}" alt="Flag of ${name.official}" />
        <h2>${name.official}  </h2>
        <p><b>Capital</b>${capital}</p>
        <p><b>Population</b>${population}</p>
        <p><b>Languages</b>${Object.values(languages)}</p>
      </li>`;
    })
    .join('');
  countriesList.insertAdjacentElement('beforeend', countriesEl);
}

function cleanHtml() {
  countriesField.innerHTML = '';
  countriesList.innerHTML = '';
}
