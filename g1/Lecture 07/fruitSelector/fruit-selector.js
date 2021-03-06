$(() => {
    // get the fruit list and then fill the options with the fruit list
    getFruitList()
        .then(fruitList => fillOptions(fruitList));

    $("#fruit-list").on("change", () => loadFruitDetails())
});

// get Fruit List - gets the fruit list from the server
function getFruitList() {
    const fruitListUrl = "http://10.10.83.142:8080/fruit-list.json";

    return fetch(fruitListUrl)
        .then(response => response.json());
}

// fill the fruits from the list into the select as options
function fillOptions(fruitList) {
    $("#fruit-list").empty();

    $("#fruit-list").append($('<option>', {
        value: 0,
        text: "Select a fruit"
    }));

    for (const fruitName of fruitList) {
        $("#fruit-list").append($('<option>', {
            value: fruitName,
            text: fruitName
        }));
    }
}

// loads and displays fruit details, given a selected fruit
function loadFruitDetails() {
    const fruitName = $("#fruit-list").val();

    if (fruitName === "0") {
        displayFruitDetails({});
        return;
    }

    const fruitUrl = `http://10.10.83.142:8080/fruits/${fruitName.toLowerCase()}.json`;

    fetch(fruitUrl)
        .then(response => response.json())
        .then(fruitDetails => {
            displayFruitDetails(fruitDetails);
        })
}

function displayFruitDetails(fruitDetails) {
    $("#fruit-details").empty();

    for (const key in fruitDetails) {
        const value = fruitDetails[key];
        $("#fruit-details").append(`<div>
            <label for="fruit-${key}">${key}:</label>
            <span id="fruit-${key}">${value}</span>
        <div>`);
    }
}