console.log('Main JS is working');

const url = "http://localhost:3200";

const body = document.querySelector('body');
const getResultsContainer = document.getElementById('getresults');

async function getTrails() {
    try {
        const response = await fetch(`${url}/trails`);
        const results = await response.json();
        console.log(results);
        results.forEach((trail) => {
            getResultsContainer.innerHTML += makeCard(trail);
        });
    } catch (error) {
        console.error(error);
    }
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
            <button class="edit-button" data-trail_id="${trail.trail_id}">Edit</button>
            <button class="delete-button" data-trail_id="${trail.trail_id}">Delete</button>
        </div>
    </div>`;
}

const deleteBtn = document.getElementsByClassName('delete-button');
const editBtn = document.getElementsByClassName('edit-button');

document.addEventListener('click', async (event) => {
    const deleteBtn = event.target.closest('.delete-button');
    const editBtn = event.target.closest('.edit-button');

    if (deleteBtn) {
        let confirmation = confirm('Are you sure you want to delete this trail?');
        if (confirmation) {
            const trailId = deleteBtn.dataset.trail_id;
            try {
                await fetch(`${url}/trails/${trailId}`, {
                    method: "DELETE",
                });
                console.log(`Trail was deleted.`);
                getResultsContainer.innerHTML = "";
                await getTrails();
            } catch (error) {
                console.error(error);
            }
        }
    }
    if (editBtn) {
        const trailId = editBtn.dataset.trail_id;
        const response = await fetch(`${url}/trails/${trailId}`);
        const results = await response.json();
        console.log(results[0])
        openNav();
        // Populate the form fields with trail data
        document.getElementById("trailName").value = results[0].trail_name;
        document.getElementById("location").value = results[0].location;
        document.getElementById("difficulty").value = results[0].difficulty;
        document.getElementById("distance").value = results[0].distance;
        document.getElementById("description").value = results[0].description;
        document.getElementById("rating").value = results[0].rating;

        // Show the "Save Changes" button and hide the "Submit" button
        submitBtn.style.display = "none";
        document.getElementById("saveChangesBtn").style.display = "block";

        document.getElementById("saveChangesBtn").addEventListener("click", async (e) => {
            e.preventDefault();
            console.log('button clicked');
            const updatedData = {
                trail_name: document.getElementById("trailName").value,
                location: document.getElementById("location").value,
                difficulty: document.getElementById("difficulty").value,
                distance: document.getElementById("distance").value,
                description: document.getElementById("description").value,
                rating: document.getElementById("rating").value
            };

            try {
                const updateResponse = await fetch(`${url}/trails/${trailId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                });

                if (updateResponse.ok) {
                    console.log("Trail updated successfully");
                    closeNav();
                    getResultsContainer.innerHTML = "";
                    getTrails();
                    form.reset();
                } else {
                    throw new Error("Failed to update trail");
                }
            } catch (err) {
                console.error(err);
            }
        });
    }
});

const submitBtn = document.getElementById('submitBtn');
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