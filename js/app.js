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