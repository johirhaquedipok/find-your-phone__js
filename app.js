const searchBtn = document.getElementById('search-btn');
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
    if(searchInputValue === '') {
        emptyValueUi();
    }
    else {
        // this function will load api data
        loadData(searchInputValue)

    }
})


// api call function
function loadData(searchText) {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText.toLowerCase()}`
    fetch(url)
        .then( response => response.json())
        .then(data => displayUi(data))
        .catch( err => console.error(err))
}

// display result to the html 
function displayUi(data) {
  
    const {data:info, status} = data;
    if(!status) {
        displayError('display-ui',status, 'Status') 
        }

    displaySuccess('display-ui', info)
}

// for success function
const displaySuccess = (id, info) => {
    const displayHtml = document.getElementById(id);
    info.forEach(phone => {
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
}

// for error function
const displayError = (id,error, text) => {
    const displayHtml = document.getElementById(id);
        const html = `<div>
        <div class="alert alert-danger text-center">No Result Found</div>
        <div class="alert alert-danger text-center">${text} : ${error}</div>
        <div>
        `
        displayHtml.insertAdjacentHTML('afterbegin', html);
}

// for empty value
const emptyValueUi = () => {
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
        .then(data => detailUiLoader(data))
}


const detailUiLoader = (data) => {
    const {data:info, status} = data;
    if(!status) {
        displayError('detail-info',status, 'Status') 
        }

        detailUiGenerator('detail-info', info)
}

const detailUiGenerator = (id, info) => {
    // emptyUi("detail-info")
    const displayHtml = document.getElementById(id);
        emptyUi(id)
        const {name, image, slug, brand, mainFeatures, others} = info;      
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

// https://github.com/programming-hero-web-course2/phone-hunter-johirhaquedipok