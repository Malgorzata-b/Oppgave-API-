const world = document.querySelector("#World");
const mainWorld = document.querySelector("#Beautiful");

// Make a function to header
function worldWelcome() {
  // make a section with the thing
  const container = document.createElement("section");
  container.classList.add("World-Welcome");

  // Make a title
  const title = document.createElement("h1");
  title.classList.add("Title-main");
  title.textContent = "Discover the World Around You!";

  // Appending
  container.append(title);
  world.append(container);
}

worldWelcome();

// Api from https://restcountries.com/
const apiURLall = "https://restcountries.com/v3.1/all";

let countries;

async function apiFunction() {
  const response = await fetch(apiURLall);
  const countriesJson = await response.json();
  //   console.log(countriesJson);
  // Use map methods to take away values and use them,
  // return them as object in array [{...}, {...},...]
  countries = countriesJson.map((country) => {
    return {
      capital: country.capital,
      population: country.population,
      name: country.name.common,
      region: country.region,
      flagUrl: country.flags.png,
    };
  });

  // function structure
  renderCountriesList(countries);
  // console.log(countries);
}
apiFunction();

function renderCountriesList(countries) {
  // Clear content / refreshment
  mainWorld.innerHTML = "";

  //Make a loop with countires information
  countries.forEach((country) => {
    // Make a div with information
    const countryContainer = document.createElement("div");
    countryContainer.classList.add("container-country");
    // Make image with the flag
    const imgFlag = document.createElement("img");
    imgFlag.classList.add("imgFlag");
    imgFlag.src = country.flagUrl;

    // Makea the name of countries
    const nameCountry = document.createElement("h3");
    nameCountry.classList.add("country-name");
    nameCountry.textContent = country.name;
    // Make the name of capitals
    const capitalCountry = document.createElement("p");
    capitalCountry.classList.add("capital-name");
    capitalCountry.textContent = `Capital: ${country.capital}`;
    // Make the name of regions
    const regionCountry = document.createElement("strong");
    regionCountry.classList.add("region-name");
    regionCountry.textContent = `Region: ${country.region}`;
    // Make the population info
    const populationCountry = document.createElement("p");
    populationCountry.classList.add("population");
    populationCountry.textContent = `Population: ${country.population}`;

    //Appending
    countryContainer.append(
      nameCountry,
      imgFlag,
      capitalCountry,
      populationCountry,
      regionCountry
    );

    // Appending cotainer to the main section
    mainWorld.append(countryContainer);
  });
}

const selectRegion = document.querySelector("#region");

// Select region with addEventlistener
selectRegion.addEventListener("change", (e) => {
  const regionFilter = e.target.value;

  if (regionFilter === "") {
    // If no region is selected it show us all countires
    renderCountriesList(countries);
  } else {
    // Filter and sort(use the name) countries is selected
    const countriesFilter = countries
      .filter((country) => country.region === regionFilter)
      .sort((a, b) => a.name.localeCompare(b.name));
    // console.log(regionFilter);

    // function structure
    renderCountriesList(countriesFilter);
  }
});
