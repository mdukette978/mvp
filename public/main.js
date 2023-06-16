console.log('Main JS is working');

const url = "http://localhost:3200";

const body = document.querySelector('body');
const getResultsContainer = document.getElementById('getresults');

function getTrails() {
    fetch(`${url}/trails`)
        .then((res) => res.json())
        .then((results) => {
            console.log(results);
            results.forEach((trail) => {
                getResultsContainer.innerHTML += makeCard(trail);
            });
        });
   }
  
   getTrails();

   function makeCard(trail) {
     return `
        <div class="getresults-card">
            <h3 class="name">${trail.trail_name}</h3>
            <p>${trail.location}</p>
            <p>${trail.difficulty}</p>
            <p>${trail.distance} miles</p>
            <p>${trail.description}</p>
            <p>${trail.rating} stars</p>
            <div class="card-buttons">
                <button class="edit-button" onclick="editTrail(${trail.trail_id})">Edit</button>
                <button class="delete-button" onclick="deleteTrail(${trail.trail_id})">Delete</button>
            </div>
       </div>`;
   }

//function editTrail() {};
//function deleteTrail() {};