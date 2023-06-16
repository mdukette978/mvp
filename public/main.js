console.log('Main JS is working');

const url = "http://localhost:3200";

const body = document.querySelector('body');
const getResultsContainer = document.getElementById('getresults');

function getTrails() {
    fetch(`${url}/trails`)
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
//         getResultsContainer.textContent += makeCard();
       });
   }
  
//   getTrails();

//   function makeCard(results) {
//     return `<div class="getresults-card">
//         <img class="photo" src="${trails.image_path}" />
//         <h3 class="name">${trails.trail_name}</h3>
//         <p>${trail.location}</p>
//         <p>${trail.difficulty}</p>
//         <p>${trail.distance} miles</p>
//         <p>${trail.duration}</p>
//         <p>${trail.rating} stars</p>
//       </div>`;
//   }