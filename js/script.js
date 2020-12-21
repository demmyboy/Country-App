const API_URL = `https://restcountries.eu/rest/v2/name/`
const search = document.querySelector('#search')
const searchBtn = document.querySelector('.btn')
const main = document.querySelector('#main')
const form = document.getElementById('form')


async function getCountry() {
    try {
        const country = search.value
        const res = await axios.get(`${API_URL}${country}`)
        createCountryCard(res.data)
            // console.log(res.data[0].languages)
    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard('Country not found, check spelling error')
            console.log(err)
        }
    }
}

function seperateNmberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}



function createCountryCard(country) {
    let population = country[0].population
    const cardHTML = `
        <div class="cards">
            <div>
                <img class="flag" src="${country[0].flag}" alt="Flag">
            </div>
            <div class="country-info">
                <h5> Country : ${country[0].name}</h5>
                <h5>Capital : ${country[0].capital}</h5>
                <h5>Continent : ${country[0].region}</h5>
                <h5>Subregion : ${country[0].subregion}</h5>
                <h5> Population : ${seperateNmberWithCommas(population)} million </h5>
                <h5>Telephone Code :  +${country[0].callingCodes}</h5>
                <h5>Language :  ${country[0].languages[0].name}</h5>  
                <h5>Currency :  ${country[0].currencies[0].name}</h5> 
                <h5>Currency symbol :  ${country[0].currencies[0].symbol}</h5>            
            </div>
        </div>
    `
    main.innerHTML = cardHTML
}

function createErrorCard(message) {
    const cardHTML = `
    <div class="cards">
        <h3>${message}</h3>
    </div>`

    main.innerHTML = cardHTML
}
searchBtn.addEventListener('click', () => {
    const searchCountry = search.value
    if (searchCountry) {
        getCountry()
        search.value = ''
    }
})

// Allows to use the enter button on keyboard
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchCountry = search.value
    if (searchCountry) {
        getCountry()
        search.value = ''
    }
})