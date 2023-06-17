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
                <button id="editBtn" class="edit-button">Edit</button>
                <button id="deleteBtn" class="delete-button">Delete</button>
            </div>
       </div>`;
   }

const deleteBtn = document.getElementById('deleteBtn');
const editBtn = document.getElementById('editBtn');
const submitBtn = document.getElementById('submitBtn');

// deleteBtn.addEventListener("click", () => {
//     let choice = prompt('Are you sure you want to delete this trail?');
//     if (choice == "yes") {
//       fetch(`${url}/trails/${trail.trail_id}`, {
//         method: "DELETE",
//       }).then(() => {
//         console.log(`trail was deleted.`);
//         getTrails();
//       });
//     }
// });

// editBtn.addEventListener("click", () => {
//     fetch(`${url}/trails/${trail.trail_id}`, { 
//         method: "PUT", 
//         }).then(() => {
//         containerEl.innerHTML = "";
//         console.log(`trail was successfully updated`);
//         createForm();
//       }
//     );
// });

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log('button clicked');
    const trailName = document.getElementById("trailName").value;
    const location = document.getElementById("location").value;
    const difficulty = document.getElementById("difficulty").value;
    const distance = document.getElementById("distance").value;
    const description = document.getElementById("description").value;
    const rating = document.getElementById("rating").value;

    const formData = {
        trail_name: trailName, 
        location: location, 
        difficulty: difficulty, 
        distance: distance, 
        description: description, 
        rating: rating
    } 
console.log(formData);
    try {
        const response = await fetch(`${url}/trails`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            console.log("Trail added successfully");
            getTrails();
        } else {
            throw new Error("Failed to add trail");
        }
    } catch (err) {
        console.error(err);
    }
});


function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}