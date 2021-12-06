require("isomorphic-fetch");

// Updates the missionTarget div - does not need to return anything
function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  // Here is the HTML formatting for our missionTarget div.
  missionTarget = document.getElementById("missionTarget");
  missionTarget.innerHTML = `
    <h2>MissionDestination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter} </li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src=${imageUrl}>
   `;
}

// Function to validateInput of the formSubmission
function validateInput(testInput) {
  let numberInput = Number(testInput);
  if (testInput === "") {
    return "Empty";
  } else if (isNaN(numberInput)) {
    return "Not a Number";
  } else if (isNaN(numberInput) === false) {
    return "Is a Number";
  }
}

// formSubmission function to take userinput and to use for the Shuttle Launch CheckList
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");
  let launch = document.getElementById("launchStatus");

  if (cargoLevel > 10000 && fuelLevel < 10000) {
    list.style.visibility = "visible";
    launch.style.color = "#C7254E";
    launch.innerHTML = "Shuttle Not Ready for Launch";
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    fuelStatus.innerHTML = "Fuel level too low for launch";
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
  } else if (fuelLevel < 10000 && cargoLevel <= 10000) {
    list.style.visibility = "visible";
    launch.style.color = "#C7254E";
    launch.innerHTML = "Shuttle Not Ready for Launch";
    fuelStatus.innerHTML = "Fuel level too low for launch";
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
  } else if (cargoLevel > 10000 && fuelLevel >= 10000) {
    list.style.visibility = "visible";
    launch.style.color = "#C7254E";
    launch.innerHTML = "Shuttle Not Ready for Launch";
    pilotStatus.innerHTML = `Pilot ${pilot} Ready!`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} Ready!`;
    fuelStatus.innerHTML = "Fuel level high enough for launch";
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
  } else {
    list.style.visibility = "visible";
    launch.style.color = "#419F6A";
    launch.innerHTML = "Shuttle is Ready for Launch";
    pilotStatus.innerHTML = `Pilot ${pilot} Ready!`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} Ready!`;
    fuelStatus.innerHTML = "Fuel level high enough for launch";
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
  }
}

// Fetches the data from the planet json
async function myFetch() {
  let fetchPlanet = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  );
  const returned = await fetchPlanet.json();
  return returned;
}

// Returns planet at random index
function pickPlanet(planets) {
  let index = Math.floor(Math.random() * planets.length);
  let selectedPlanet = planets[index];
  return selectedPlanet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
