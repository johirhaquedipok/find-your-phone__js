const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    emptyUi();
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
    let displayHtml = document.getElementById(id);
    info.forEach(phone => {
        const div= document.createElement('div')
            div.classList.add('col');
            div.innerHTML = `
                <div onclick=detailInfo('${phone.slug}') class="card h-100" >
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
const emptyUi = () => {
    const displayHtml = document.getElementById('display-ui');
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
    const displayHtml = document.getElementById(id);

        const {name, image, slug, brand} = info;
        // const {chipSet, displaySize, memory,sensors, storage} = info.mainFeatures;
        // const {Bluetooth, GPS, NFC,Radio, USB, WLAN} = info.others;

        const div = document.createElement('div');
            div.innerHTML = `
                    <div class="row g-0">
                    <div class="col-md-5">
                    <img src="${image}" class="img-fluid rounded-start" alt="${name}">
                    </div>
                    <div class="col-md-7">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text">${slug}</p>
                        <p class="card-text">${brand}</p>
                        <p class="card-text">${info.releaseDate= "" ? 'Not released yet' : info.releaseDate }</p>
                    </div>
                    </div>
                </div>
            `
            displayHtml.appendChild(div);
   
}











// https://github.com/programming-hero-web-course2/phone-hunter-johirhaquedipok