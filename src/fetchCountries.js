import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Функція, яка робить HTTP-запит на ресурс і повертає проміс з масивом країн - результатом запиту

function fetchCountries(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;

    return fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error(response.statusText);
        } 
        return response.json();
    })
        .then(countryArray => {
            
            return countryArray;
        })
    .catch(Notify.failure("Oops, there is no country with that name"));
}

export { fetchCountries };