import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;


const refs = {
   inputEl: document.querySelector('#search-box'),
   countryListEl: document.querySelector('.country-list'),
   countryInfoEl: document.querySelector('.country-info'),
}

// refs.inputEl.addEventListener('input', onCountrySearch);
refs.inputEl.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));


function onCountrySearch(e) {

    let searchValue = refs.inputEl.value.trim();
    // let searchValue = e.currentTarget.value.trim();

  if (searchValue.length === 0) {
    resetMarkup(refs.countryListEl);
    resetMarkup(refs.countryInfoEl);
    // refs.countryListEl.innerHTML = "";
    // refs.countryInfoEl.innerHTML = "";
    } else {
    fetchCountries(searchValue)
      .then(onResponse)
      .catch(onError);       
    }
}



function onResponse(data) {
      if (data.length > 10) {
        messageInfo();
      } else if (data.length >= 2 && data.length <= 10) {
          createMarkupList(data);
      } else {
        // const countryObj = data[0];
        createMarkup(data[0]);    
      }
  }

function onError(error) {
    console.log(error);
  messageFailure();
  resetMarkup(refs.countryListEl);
  resetMarkup(refs.countryInfoEl);
  // refs.countryListEl.innerHTML = "";
  // refs.countryInfoEl.innerHTML = "";
}


function createMarkupList(countryList) {
  const markup =  countryList.map(({ name, flags}) => `<li class="card-item">
  <div class="card-item__img">
    <img src="${flags.svg}" alt="${name.official}">
  </div>
    <p class="card-title">${name.official}</p>
  </li>`).join("")
  resetMarkup(refs.countryInfoEl);
    // refs.countryInfoEl.innerHTML = "";
  insertMarkup(refs.countryListEl, markup);
    // refs.countryListEl.innerHTML = markup;
}

function createMarkup({ name, capital, population, flags, languages }) {
  
  // const lang = Object.values(languages);
    const markup = `<div class="card">
    <div class="card-img">
        <img src="${flags.svg}" alt="${name.official}">
    </div>
    <div class="card-body">
        <h2 class="card-title">${name.official}</h2>
        <p class="card-text">Capital: ${capital}</p>
        <p class="card-text">Population: ${population}</p>
        <p class="card-text">Languages: ${ Object.values(languages) }</p>
    </div>
    </div>`;
  resetMarkup(refs.countryListEl);
  insertMarkup(refs.countryInfoEl, markup);
    // refs.countryInfoEl.innerHTML = markup;
}


function resetMarkup(elem) {
  elem.innerHTML = "";
}
function insertMarkup(elem, markup) {
  elem.innerHTML = markup;
}


function messageFailure() {
    getMessage('failure', 'Oops, there is no country with that name');
    // Notify.failure('Oops, there is no country with that name', options);
}
function messageInfo() {
    getMessage('info', 'Too many matches found. Please enter a more specific name.');
    // Notify.info('Too many matches found. Please enter a more specific name.', options);
}

function getMessage(type, text) {
  Notify[type](text, options);
}

const options = {
  timeout: 2000,
  width: '360px'
}
