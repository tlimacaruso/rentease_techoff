function loadFlatsFromLocalStorage() {
    const flatsString = localStorage.getItem("flats");
    if (flatsString) {
        return JSON.parse(flatsString);
    } else {
        return [];
    }
}

function saveFlatsToLocalStorage() {
    localStorage.setItem("flats", JSON.stringify(flats));
}

let flats=loadFlatsFromLocalStorage();

displayFavFlats(flats);

function displayFavFlats(flats){
    const flatRow = document.getElementById("favorites-table-body");
    flatRow.innerHTML = '';

    const loggedInUser = getLoggedInUser();

    if (!loggedInUser) {
        alert("You need to be logged in to see your favorite flats.");
        return;
    }

    let favFlats = flats.filter(f=>f.favorite==true && f.loggedInUser === loggedInUser.email);


    if (favFlats.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 9;
        td.style.textAlign = "center";
        td.textContent = "You don't have favorites yet.";
        tr.appendChild(td);
        flatRow.appendChild(tr);
        return;
    }

    for(let flat of favFlats){
        let tr = document.createElement("tr");

        let cityTd = document.createElement('td');
        cityTd.innerHTML = flat.city;
        tr.appendChild(cityTd);

        let streetTd = document.createElement('td');
        streetTd.innerHTML = flat.street;
        tr.appendChild(streetTd);

        let numberTd = document.createElement('td');
        numberTd.innerHTML = flat.number;
        tr.appendChild(numberTd);

        let areaTd = document.createElement('td');
        areaTd.innerHTML = flat.area;
        tr.appendChild(areaTd);

        let acTd = document.createElement('td');
        acTd.innerHTML = flat.ac;
        tr.appendChild(acTd);

        let yearTd = document.createElement('td');
        yearTd.innerHTML = flat.year;
        tr.appendChild(yearTd);

        let rentTd = document.createElement('td');
        rentTd.innerHTML = flat.rent;
        tr.appendChild(rentTd);

        let availTd = document.createElement('td');
        availTd.innerHTML = flat.avail;
        tr.appendChild(availTd);

        const favCell = document.createElement("td");
        const favButton = document.createElement("button");
        favButton.innerHTML = flat.favorite ? "★" : "☆";
        favButton.style.color = flat.favorite ? "gold" : "gray";
        favButton.style.border = "2px solid red";
        favButton.style.borderRadius= "20px";
        favButton.style.backgroundColor="#FF5E00FF";
        favButton.style.height="35px";
        favButton.style.width="35px";
        favButton.addEventListener("click", () => toggleFavorite(flat));
        favCell.appendChild(favButton);
        tr.appendChild(favCell);

        flatRow.appendChild(tr);
        
    }

}

const toggleFavorite = (flat) => {
    flat.favorite = false;
    saveFlatsToLocalStorage();
    displayFavFlats(flats);
}



