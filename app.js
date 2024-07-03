let allCountries = [];
let mapUrl = "";  // Variable to store the map URL

document.addEventListener('DOMContentLoaded', (event) => {
    let txtSearchValue = document.getElementById("txtSearchValue");

    // Fetch all country data initially
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            allCountries = data;  // Store all country data
            displayCountries(allCountries);  // Display all countries initially
        });

    // Add event listener for the "input" event to trigger search on typing
    txtSearchValue.addEventListener('input', function(event) {
        serchCuntrie();
    });
});

function displayCountries(countries) {
    let tblCountries = document.getElementById("tbl");

    let tblBody = `<tr>
                    <th>Name</th>
                    <th>Flag</th>
                </tr>`;

    countries.forEach(element => {
        let flagUrl = element.flags.svg;
        tblBody += `<tr>
                        <td>${element.name.common}</td>
                        <td><img src="${flagUrl}" alt="Flag of ${element.name.common}" width="50"></td>
                    </tr>`;
    });

    tblCountries.innerHTML = tblBody;
}

function serchCuntrie() {
    let searchValueto = document.getElementById("txtSearchValue").value.toLowerCase();
    let searchValue = document.getElementById("txtSearchValue").value;

    let filteredCountries = allCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchValueto)
    );
    displayCountries(filteredCountries);

    let offitalName = document.getElementById("offitalName");
    let name = document.getElementById("name");
    let img = document.getElementById("img");
    let about = document.getElementById("about");

    fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(obj => {
                offitalName.innerText = obj.name.official;
                name.innerText = obj.name.common;
                img.innerHTML = `<img src="${obj.flags.png}" alt="Flag of ${obj.name.common}">`;
                mapUrl = obj.maps.googleMaps;  // Store the Google Maps URL
                // Add about section details
                about.innerHTML = `
                    <strong>Region:</strong> ${obj.region}<br>
                    <strong>Subregion:</strong> ${obj.subregion}<br>
                    <strong>Capital:</strong> ${obj.capital}<br>
                    <strong>Population:</strong> ${obj.population}<br>
                    <strong>Area:</strong> ${obj.area} km²<br>
                    <strong>Languages:</strong> ${Object.values(obj.languages).join(', ')}
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
        });
}

function serchmap() {
    if (mapUrl) {
        window.open(mapUrl, '_blank');  // Open the map URL in a new tab
    } else {
        alert('Please search for a country first.');
    }
}
