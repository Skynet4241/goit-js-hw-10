export const fetchCountries = query => {
  const urlAPI = `https://restcountries.com/v3.1/name/${query}?fields=name,capital,population,flags,languages`;

  fetch(urlAPI)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      return res.json();
    })
    .then(countries => {
      console.log(countries);
      return countries;
    })
    .catch(err => {
      console.log(err);
    });
};
