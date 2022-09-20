
const BASE_URL = 'https://restcountries.com/v3.1';


// export function fetchCountries(name) {
//     const url = `${BASE_URL}/name/${name}`;
//     return fetch(url).then(response => {
//       if (!response.ok) {
//       // console.log('ошибка');
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
// }

export function fetchCountries(name) {

    const url = `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`;

    return fetch(url).then(response => {
      if (!response.ok) {
      // console.log('ошибка');
      throw new Error(response.status);
    }
    return response.json();
  })
}