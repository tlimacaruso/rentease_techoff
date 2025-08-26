let flats = loadFlatsFromLocalStorage();
displayFlats(flats);

function Flat({ city, street, number, area, ac, year, rent, avail, loggedInUser, favorite = false }) {
    this.city = city;
    this.street = street;
    this.number = number;
    this.area = area;
    this.ac = ac;
    this.year = year;
    this.rent = rent;
    this.avail = avail;
    this.favorite = favorite;
    this.loggedInUser = loggedInUser ? loggedInUser.email : null;
}

function addFlat() {
    const cityInput = document.getElementById("city");
    const streetInput = document.getElementById("street");
    const numberInput = document.getElementById("number");
    const areaInput = document.getElementById("area");
    const acInputs = document.querySelectorAll('input[name="ac"]');
    let acValue;
    acInputs.forEach(input => {
        if (input.checked) {
            acValue = input.value;
        }
    });
    const yearInput = document.getElementById("year");
    const rentInput = document.getElementById("rent");
    const availInput = document.getElementById("avail");

    let isValid = true;
    let errorMessage = "";

    if (!cityInput.value.trim()) {
        isValid = false;
        errorMessage += "The city input is required; "
    }

    if (!streetInput.value.trim()) {
        isValid = false;
        errorMessage += "The street input is required; "
    }

    if (!numberInput.value.trim()) {
        isValid = false;
        errorMessage += "The number input is required; "
    }

    if (!rentInput.value.trim()) {
        isValid = false;
        errorMessage += "The rent input is required; "
    }

    if (!availInput.value.trim()) {
        isValid = false;
        errorMessage += "The available date is required; "
    }

    if (isNaN(parseInt(numberInput.value))) {
        isValid = false;
        errorMessage += "Insert a door number; "
    }

    if (isNaN(parseFloat(rentInput.value))) {
        isValid = false;
        errorMessage += "Insert a rent value"
    }

    if (!isValid) {
        alert("Please make sure the required fields are filled correctly: " + errorMessage);
        return; // Impede que o flat seja adicionado se houver erros
    }


    const city = cityInput.value;
    const street = streetInput.value;
    const number = parseInt(numberInput.value);
    const area = parseFloat(areaInput.value);
    const ac = acValue;
    const year = parseInt(yearInput.value);
    const rent = parseFloat(rentInput.value);
    const avail = availInput.value;

    const loggedInUser = getLoggedInUser();

    const newFlat = new Flat({
        city,
        street,
        number,
        area,
        ac,
        year,
        rent,
        avail,
        loggedInUser
    });

    flats.push(newFlat);

    saveFlatsToLocalStorage();
    window.location.href = "My Flats.html"

}

function saveFlatsToLocalStorage() {
    localStorage.setItem("flats", JSON.stringify(flats));
}

const toggleFavorite = (flat, row) => {
    flat.favorite = !flat.favorite;
    saveFlatsToLocalStorage();
    const favButton = row.cells[8].querySelector("button");
    favButton.textContent = flat.favorite ? "★" : "☆";
    favButton.style.color = flat.favorite ? "gold" : "gray";
}

function loadFlatsFromLocalStorage() {
    const flatsString = localStorage.getItem("flats");
    if (flatsString) {
        return JSON.parse(flatsString);
    } else {
        return [];
    }
}

function displayFlats(flats) {
    const flatRow = document.getElementById("flats-body");
    flatRow.innerHTML = '';

    const loggedInUser = getLoggedInUser();

    const filteredFlats = loggedInUser ? flats.filter(flat => flat.loggedInUser === loggedInUser.email) : [];

    for (let flat of filteredFlats) {
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
        favButton.addEventListener("click", () => toggleFavorite(flat, tr));
        favCell.appendChild(favButton);
        tr.appendChild(favCell);

        const removeCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", () => removeFlat(flat, tr));
        removeCell.appendChild(removeButton);
        tr.appendChild(removeCell);


        flatRow.appendChild(tr);

    }

}

function removeFlat(flatToRemove, rowToRemove) {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser && flatToRemove.loggedInUser === loggedInUser.email) {
        const index = flats.findIndex(flat =>
            flat.city === flatToRemove.city &&
            flat.street === flatToRemove.street &&
            flat.number === flatToRemove.number &&
            flat.area === flatToRemove.area &&
            flat.ac === flatToRemove.ac &&
            flat.year === flatToRemove.year &&
            flat.rent === flatToRemove.rent &&
            flat.avail === flatToRemove.avail
        );

        if (index > -1) {
            flats.splice(index, 1);
            saveFlatsToLocalStorage();
            rowToRemove.remove();
            console.log("Flat removed successfully!");
        } else {
            console.error("Flat not found for removal.");
        }
    } else if (!loggedInUser) {
        alert('You need to be logged in to remove flats');
    } else {
        alert('You can only remove your own flats');
    }
}

function getLoggedInUser(){
    const loggedInUserString = localStorage.getItem('loggedInUser');
    if (loggedInUserString) {
        return JSON.parse(loggedInUserString);
    } else {
        return null;
    }
}




