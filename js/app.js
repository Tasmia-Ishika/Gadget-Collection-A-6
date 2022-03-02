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
            .then(viewSearchData => showSearchResult(viewSearchData.data));
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
    <div class="card h-100 mb-3 mx-auto">
    <img src="${phoneDetail.image}" class="w-25 card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title"><span class="fw-bold">Mobile Name:</span> ${phoneDetail.name}</h5>
        <h5 class="card-title"><span class="fw-bold">Brand Name:</span> ${phoneDetail.brand}</h5>
            <ul class="list-group">
            <li class="list-group-item text-center"><span class="fw-bolder ">Main Features </span></li>
     <li class="list-group-item list-group-item-action list-group-item-danger"><span class="fw-bold">Storage:</span> ${phoneDetail.mainFeatures.storage}</li>
     <li class="list-group-item list-group-item-action list-group-item-primary"><span class="fw-bold">DisplaySize:</span> ${phoneDetail.mainFeatures.displaySize}</li>
     <li class="list-group-item list-group-item-action list-group-item-secondary"><span class="fw-bold">ChipSet:</span> ${phoneDetail.mainFeatures.chipSet}</li>
     <li class="list-group-item list-group-item-action list-group-item-success"><span class="fw-bold">Memory:</span> ${phoneDetail.mainFeatures.memory}</li>
     <li class="list-group-item text-center"><span class="fw-bolder">Sensors </span></li>
     <li class="list-group-item list-group-item-action list-group-item-danger"><span class="fw-bold"></span>${phoneDetail.mainFeatures.sensors[0]}</li>
      <li class="list-group-item list-group-item-action list-group-item-warning"><span class="fw-bold"></span>${phoneDetail.mainFeatures.sensors[1]}</li>
      <li class="list-group-item list-group-item-action list-group-item-info"><span class="fw-bold"></span>${phoneDetail.mainFeatures.sensors[2]}</li>
      <li class="list-group-item list-group-item-action list-group-item-success"><span class="fw-bold"></span>${phoneDetail.mainFeatures.sensors[3]}</li>
     <li class="list-group-item list-group-item-action list-group-item-danger"><span class="fw-bold"></span>${phoneDetail.mainFeatures.sensors[4]}</li>
      <li class="list-group-item list-group-item-action list-group-item-warning"><span class="fw-bold"></span>${phoneDetail.mainFeatures.sensors[5]}</li>
      <li class="list-group-item text-center"><span class="fw-bolder">Others </span></li>
    <li class="list-group-item list-group-item-action list-group-item-warning"><span class="fw-bold">WLAN:</span>${phoneDetail.others?.WLAN ? phoneDetail.others.WLAN : " No WLAN found "}</li>
      <li class="list-group-item list-group-item-action list-group-item-info"><span class="fw-bold">Bluetooth:</span>${phoneDetail.others?.Bluetooth ? phoneDetail.others.Bluetooth : " No Bluetooth found "}</li>
         <li class="list-group-item list-group-item-action list-group-item-danger"><span class="fw-bold">GPS:</span>${phoneDetail.others?.GPS ? phoneDetail.others.GPS : " No GPS found "}</li>
          <li class="list-group-item list-group-item-action list-group-item-dark"><span class="fw-bold">NFC:</span>${phoneDetail.others?.NFC ? phoneDetail.others.NFC : " No NFC found "}</li>
         <li class="list-group-item list-group-item-action list-group-item-primary"><span class="fw-bold">Radio:</span> ${phoneDetail.others?.Radio ? phoneDetail.others.Radio : " No Radio found "}</li>
          <li class="list-group-item list-group-item-action list-group-item-success"><span class="fw-bold">USB:</span>
          ${phoneDetail.others?.USB ? phoneDetail.others.USB : " No USB found "}</li>
        <li class="list-group-item text-center"><span class="fw-bolder">Release Date </span></li>
        <li class="list-group-item list-group-item-danger"><span class="fw-bold">ReleaseDate:</span> ${phoneDetail.releaseDate ? phoneDetail.releaseDate : " No release date found "}</li>
</ul>
    </div>
</div>
    `;
    eachPhoneDetail.appendChild(div);
}