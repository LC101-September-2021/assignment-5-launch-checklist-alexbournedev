//VSCode keeps auto-importing the scripthelper functions, so I'm just commenting it out so it won't try again. hopefully.
// const { validateInput } = require("./scriptHelper");

window.addEventListener("load", function () {
  //declare vars we'll need
  let pilotInput = document.querySelector("input[name=pilotName]");
  let pilot = pilotInput.value;

  let copilotInput = document.querySelector("input[name=copilotName]");
  let copilot = copilotInput.value;

  let fuelInput = document.querySelector("input[name=fuelLevel]");
  let fuelLevel = Number(fuelInput.value);

  let cargoInput = document.querySelector("input[name=cargoMass]");
  let cargoLevel = Number(cargoInput.value);

  let list = document.getElementById("faultyItems");
  let form = document.querySelector("form");

  list.style.visibility = "hidden";

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);

    if (
      validateInput(pilot) === "Empty" ||
      validateInput(copilot) === "Empty" ||
      validateInput(fuelLevel) === "Empty" ||
      validateInput(cargoLevel) === "Empty"
    ) {
      list.style.visibility = "hidden";
      alert("Please Fill Out All Fields!");
      event.preventDefault();
    } else if (
      validateInput(pilot) === "Is a Number" ||
      validateInput(copilot) === "Is a Number" ||
      validateInput(fuelLevel) === "Not a Number" ||
      validateInput(cargoLevel) === "Not a Number"
    ) {
      list.style.visibility = "hidden";
      alert(
        "Please Enter Valid Info in All Fields! Pilots should be strings, Fuel and Cargo should be numbers."
      );
      event.preventDefault();
    }
  });

  let listedPlanets;
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse
    .then(function (response) {
      listedPlanets = response;
    })
    .then(function () {
      let chosenPlanet = pickPlanet(listedPlanets);

      addDestinationInfo(
        window.document,
        chosenPlanet.name,
        chosenPlanet.diameter,
        chosenPlanet.star,
        chosenPlanet.distance,
        chosenPlanet.moons,
        chosenPlanet.image
      );
    });
});
