// search field --------------->
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = "";
    //  spinner show----------->
    document.getElementById('spinner').style.display = "block";
    //error handle --------->
    if (searchText == "") {
        document.getElementById('error-handler').style.display = "block";
    }
    else {
        // load search data --------------------->
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(loadSearchData => showSearchResult(loadSearchData.data));
        document.getElementById('error-handler').style.display = "none";
    }
}
//show result in search---------------->

const showSearchResult = (phones) => {
    const searchResult = document.getElementById('search-result');

    searchResult.textContent = "";
    // console.log(searchResult);
    const phoneDetails = phones.slice(0, 20);
    const perPhoneDetail = document.getElementById('perPhone-detail')
    perPhoneDetail.textContent = "";
    //error handle with alert ------------------->
    if (phones == 0) {
        alert("No Result found");
    }
    else {

        phoneDetails.forEach(phone => {
            // console.log(phone);

            // Phone picture with bootstrap--------------------->
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
              <div class="card h-100 mb-3 w-75 mx-auto">
                 <img src="${phone.image}" class="card-img-top " alt="...">
             <div class="card-body">
                 <h5 class="card-title">${phone.brand}</h5>
                 <h5 class="card-title">${phone.phone_name}</h5>
                 <div class="d-grid gap-2 col-6 mx-auto">
               <button onclick="loadPhoneData('${phone.slug}')"class="btn btn-success"      type="button">Details</button>
                </div>
               </div>
            </div>
                 `;
            searchResult.appendChild(div);
        });
        //spinner closing ----------->
        document.getElementById('spinner').style.display = "none";
    }
}
//load phone data------------------->
const loadPhoneData = (idPhone) => {
    // console.log(idPhone);
    const url = `https://openapi.programming-hero.com/api/phone/${idPhone}`;
    fetch(url)
        .then(res => res.json())
        .then(loadPhoneData => showMobileDetail(loadPhoneData.data));
}
//show single phone details-------------------->
const showMobileDetail = (phoneDetail) => {
    // console.log(phoneDetail);
    const eachPhoneDetail = document.getElementById('perPhone-detail')
    const div = document.createElement('div');
    div.classList.add('card');
    eachPhoneDetail.innerHTML = "";
    //dynamicly showing single phone details------------------>
    div.innerHTML = `
    
    `;
    eachPhoneDetail.appendChild(div);
}