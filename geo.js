"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    //   console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // get currency name

    function getCurrencyName(data) {
      const currencies = data.currencies;
      if (currencies) {
        for (let currencyCode in currencies) {
          if (currencies.hasOwnProperty(currencyCode)) {
            return currencies[currencyCode].name;
          }
        }
      }
      return undefined;
    }

    function getCurrencySymbol(data) {
      const currencies = data.currencies;
      if (currencies) {
        for (let currencyCode in currencies) {
          if (currencies.hasOwnProperty(currencyCode)) {
            return currencies[currencyCode].symbol;
          }
        }
      }
      return undefined;
    }

    function getCountryLanguage(data) {
      const languages = data.languages;
      if (languages) {
        return Object.values(languages).join(". ");
        // for (let currencyCode in languages) {
        //   if (languages.hasOwnProperty(currencyCode)) {
        //     return languages[currencyCode].name;
        //   }
        // }
      }
      return undefined;
    }

    const currencyName = getCurrencyName(data);
    const currencySymbol = getCurrencySymbol(data);
    const countryLanguage = getCountryLanguage(data);

    const html = `<article class="country platypi">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common} 
  </h3>
 
            <h4 class="country__region">${data.region}</h4>
             <p class="country__row"><span>🏛</span>${data.capital[0]}</p>
             
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}m people</p>
            <p class="country__row"><span>🗣️</span>${countryLanguage}</p>
            <p class="country__row"><span>🕒</span>${data.timezones[0]}</p>
            <p class="country__row"><span>💰</span>${currencyName}, ${currencySymbol}</p>
            <p class="country__row"><span>🌐</span>${data.borders.join(
              ", "
            )}</p>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML("afterbegin", html);
    countriesContainer.style.opacity = 1;
  });
  request.addEventListener("error", function () {
    alert("An error occured!");
  });
};

// const displayError = function (message) {
//   const html = `<div class='error'>
//   <p>${message}</p>
//   </div>`;
//   countriesContainer.insertAdjacentHTML("afterbegin", html);
//   countriesContainer.style.opacity = 1;
// };

const searchBox = document.getElementById("searchBox");

const SearchButton = document.getElementById("btn");
let inputValue;
SearchButton.addEventListener("click", function () {
  inputValue = searchBox.value;
  getCountryData(inputValue);

  console.log(inputValue);
  // if (!data.name.common) {
  //   alert("not a country name!");
  // }
  searchBox.value = "";
});

// getCountryData("nigeria");
// getCountryData("usa");
