const API_URL = `https://restcountries.eu/rest/v2/name/`
const search = document.querySelector('#search')
const searchBtn = document.querySelector('.btn')
const main = document.querySelector('#main')
const form = document.getElementById('form')


async function getCountry() {
    try {
        const country = search.value
        const res = await axios.get(`${API_URL}${country}?fullText=true`)
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
            <div class="country-info mr-5">
                <small>Country</small>
                <h5> <i class="fa fa-map " aria-hidden="true"></i>  ${country[0].name} </h5>
                <small>Capital</small>
                <h5> <i class="fa fa-building " aria-hidden="true"></i>  ${country[0].capital}</h5>
                <small>Continent</small>
                <h5><i class="fa fa-globe " aria-hidden="true"></i> ${country[0].region}</h5>
                <small>Region</small> 
                <h5><i class="fa fa-map-marker " aria-hidden="true"></i> ${country[0].subregion}</h5>
                <small>Domain</small>   
                <h5> <i class="fa fa-internet-explorer" aria-hidden="true"></i> ${country[0].topLevelDomain} </h5>
                    
            </div>
            <div class="country-info">
    
                <small>Population</small>   
                <h5> <i class="fa fa-users " aria-hidden="true"></i> ${seperateNmberWithCommas(population)} million </h5>
                <small>Phone Code</small>
                <h5><i class="fa fa-phone " aria-hidden="true"></i>  +${country[0].callingCodes}</h5>
                <small>Language</small>
                <h5><i class="fa fa-language " aria-hidden="true"></i>  ${country[0].languages[0].name}</h5>  
                <small>Currency</small>    
                <h5> <i class="fa fa-credit-card " aria-hidden="true"></i> ${country[0].currencies[0].name}</h5> 
                <small>Currency Symbol</small> 
                <h5><i class="fa fa-credit-card" aria-hidden="true"></i>  ${country[0].currencies[0].symbol}</h5>            
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