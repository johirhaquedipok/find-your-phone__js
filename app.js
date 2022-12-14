// get search btn
const searchBtn = document.getElementById('search-btn');

//spinner function
const spinner = spin =>  document.getElementById('spinner').classList.toggle(spin);

// get logo to go to home
const brand = document.getElementById('brand');
brand.addEventListener('click', () => {
    emptyUi('display-ui');
    emptyUi('detail-info')
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    emptyUi('display-ui');
    emptyUi('detail-info')
    const searchInput = document.getElementById('search-input');
    const searchInputValue = searchInput.value;
        // spinner
    // spinner('d-block')
    if(searchInputValue === '') {
        emptySearchInputUi();
    }
    else {
        // this function will load api data
        loadData(searchInputValue)
    }
    searchInput.value = ''
})


// api call function
function loadData(searchText) {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText.toLowerCase()}`
    fetch(url)
        .then( response => response.json())
        .then(data => displaySuccess('display-ui',data))
        .catch(err => displayError('display-ui',err))
}


// for success function
const displaySuccess = (id, data) => {
    const {data:info, status} = data;
    const displayHtml = document.getElementById(id);
   
    if(!status) {
        displayError(id) 
    }
    // search result limited up to 20 results
    const twentySearchResults = info.slice(0,20)
    twentySearchResults.forEach(phone => {
        const div= document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="detailInfo('${phone.slug}')" class="card h-100 w-md-75" >
        <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}">
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">${phone.brand}</p>
        </div>
        </div>
        `
        displayHtml.appendChild(div);
    });
    // spinner
    // spinner('d-none')
}

// for error function
const displayError = (id,error) => {
    const displayHtml = document.getElementById(id);
        const html = `<div>
        <div class="alert alert-danger text-center">  ${error ? error : 'No Result Found'}</div>
        <div>
        `
        displayHtml.insertAdjacentHTML('afterbegin', html);
}

// for search input is empty
const emptySearchInputUi = () => {
    const displayHtml = document.getElementById('display-ui');
    displayHtml.innerHTML = '<div class="alert alert-danger text-center">You did not input any search query</div>'
}

// for clearing all errors and search results
const emptyUi = (id) => {
    const displayHtml = document.getElementById(id);
    displayHtml.innerHTML = ''
}

// onclick function after searchf result
const detailInfo = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => detailUiGenerator('detail-info',data))
        .catch(error => displayError('detail-info', error))
}

// full details of a card generate in html
const detailUiGenerator = (id, data) => {
 
    const {status, data:info} = data;

    if(!status) {
        displayError(id) 
    }
        emptyUi(id)
        const displayHtml  = document.getElementById(id)
        const {name, image, slug, brand, mainFeatures} = info;
        const div = document.createElement('div');
            div.innerHTML = `
                    <div class="row g-3">
                    <div class="col-md-5">
                    <img src="${image}" class="img-fluid rounded-start w-75" alt="${name}">
                    </div>
                    <div class="col-md-7">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text"><span class="fw-bold">Brand</span>: ${brand}</p>
                        <p class="card-text"><span class="fw-bold">Display Size</span>: ${mainFeatures?.displaySize}</p>
                        <p class="card-text"><span class="fw-bold">Chipset</span>: ${mainFeatures?.chipSet}</p>
                        <p class="card-text"><span class="fw-bold">Storage</span>: ${mainFeatures?.storage}</p>
                        <p class="card-text"><span class="fw-bold">Memory</span>: ${mainFeatures?.memory}</p>
                        <p class="card-text"><span class="fw-bold"> Sensors</span>: ${mainFeatures?.sensors.map( item => `<span>${item.slice(0,item.length)}</span>`)} </p>
                        <p class="card-text"><span class="fw-bold">Release Date</span>: ${info.releaseDate ? info.releaseDate  :'Not released yet'  }</p>
                        <div id="more-info" class="d-none" >
                        <p class="card-text"><span class="fw-bold">Bluetooth</span>: ${info?.others?.Bluetooth}</p>
                        <p class="card-text"><span class="fw-bold">GPS</span>: ${info?.others?.GPS}</p>
                        <p class="card-text"><span class="fw-bold">NFC</span>:${info?.others?.NFC}</p>
                        <p class="card-text"><span class="fw-bold">Radio</span>: ${info?.others?.Radio}</p>
                        <p class="-text"><span class="fw-bold">WLAN</span>: ${info?.others?.WLAN}</p>
                        <p class="card-text mb-2"><span class="fw-bold">USB Type</span>: ${info?.others?.USB}</p>
                        </div>
                        <p class="card-text"><span class="fw-bold">Code</span>: ${slug}</p>
                        <!-- Btn -->
                        <a class="btn btn-primary" href="#" onclick="(() => document.getElementById('more-info').classList.toggle('d-none'))()" >More Info</a>
                        </div>
                    </div>
                </div>
            `
            displayHtml.appendChild(div);
   
}
