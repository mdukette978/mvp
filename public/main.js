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
        <p>${trail.distance} mi</p>
        <p>${trail.description}</p>
        <p>${trail.rating} stars</p>
        <div class="card-buttons">
            <button class="edit-button">Edit</button>
            <button class="delete-button" data-trail_id="${trail.trail_id}">Delete</button>
        </div>
    </div>`;
}

const deleteBtn = document.getElementsByClassName('delete-button');
const editBtn = document.getElementsByClassName('edit-button');
const submitBtn = document.getElementById('submitBtn');

document.addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('.delete-button');
    //const editBtn = event.target.closest('.edit-button');

    if (deleteBtn) {
        let confirmation = confirm('Are you sure you want to delete this trail?');
        if (confirmation) {
            const trailId = deleteBtn.dataset.trail_id;
            fetch(`${url}/trails/${trailId}`, {
                method: "DELETE",
            }).then(() => {
                console.log(`Trail was deleted.`);
                getResultsContainer.innerHTML = "";
                getTrails();
            });
        }
    }
});

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
const form = document.getElementById('sidebar-form');

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
            closeNav();
            getTrails();
            form.reset();
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