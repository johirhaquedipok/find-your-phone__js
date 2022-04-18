const searchBtn = document.getElementById('search-btn');




searchBtn.addEventListener('click', () => {
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
        // .catch( err => console.error(err))
}

// display result to the html 
function displayUi(data) {
   console.log(data)
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
                <div class="card h-100" >
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
        const html = `<div class="alert alert-danger" role="alert">
       ${text} :  ${error}
      </div>
        
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




















// https://github.com/programming-hero-web-course2/phone-hunter-johirhaquedipok