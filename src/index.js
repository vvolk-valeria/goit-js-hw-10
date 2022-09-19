import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;


const refs = {
   inputEl: document.querySelector('#search-box'),
   countryListEl: document.querySelector('.country-list'),
   countryInfoEl: document.querySelector('.country-info'),
}

refs.inputEl.addEventListener('input', onFunc);
// refs.inputEl.addEventListener('input', debounce(onFunc, DEBOUNCE_DELAY));




function onFunc(e) {
  
    let searchValue = e.currentTarget.value;

    if (searchValue.length === 0) {
    refs.countryListEl.innerHTML = "";
    refs.countryInfoEl.innerHTML = "";
    } else {
     fetchCountries(searchValue);       
    }
}


function fetchCountries(name) {

    // const url = `https://restcountries.com/v2/all?fields=${name.official},capital,population,flags.svg,languages`;
    const url = `https://restcountries.com/v3.1/name/${name}`;
    fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(onResponse)
  .catch(onError);
}

function onResponse(data) {
      if (data.length > 10) {
          console.log('больше 10');
          Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (data.length >= 2 & data.length <= 10) {
          console.log('> 2');
          createMarkupList(data);
      } else {
          console.log('= 1');
          console.log('data', data);
          const countryObj = data[0];
          createMarkup(countryObj);       
      }
  }

function onError(error) {
    console.log(error);
    Notify.failure('Oops, there is no country with that name');
    refs.countryListEl.innerHTML = "";
    refs.countryInfoEl.innerHTML = "";
}

function createMarkupList(countryList) {
  const markupLi =  countryList.map(({ name, flags}) => `<li class="card-item">
  <div class="card-item__img">
    <img src="${flags.svg}" alt="${name.official}">
  </div>
    <p class="card-title">${name.official}</p>
  </li>`)
    refs.countryInfoEl.innerHTML = "";
    refs.countryListEl.innerHTML = markupLi;
}

function createMarkup({ name, capital, population, flags, languages }) {
    const lang = Object.values(languages);
    const markup = `<div class="card">
    <div class="card-img">
        <img src="${flags.svg}" alt="${name.official}">
    </div>
    <div class="card-body">
        <h2 class="card-title">${name.official}</h2>
        <p class="card-text">Capital: ${capital}</p>
        <p class="card-text">Population: ${population}</p>
        <p class="card-text">languages: ${lang}</p>
    </div>
    </div>`;
    refs.countryListEl.innerHTML = "";
    refs.countryInfoEl.innerHTML = markup;
}





//  https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
   