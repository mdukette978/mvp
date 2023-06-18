console.log('Main JS is working');

const url = "http://localhost:3200";

const body = document.querySelector('body');
const getResultsContainer = document.getElementById('getresults');
//getResultsContainer.style = "text-align: center"
getResultsContainer.style = "margin: 50px"

async function getTrails() {
    try {
        const response = await fetch(`${url}/trails`);
        const results = await response.json();
        console.log(results);
        getResultsContainer.innerHTML = "";
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
    <div class="getresults-card" style="display: inline-block; width: 300px; background-color: #FFFEE9; border-radius: 5px; padding: 20px; margin: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
        <a href="${trail.map_link}" target="_blank" style="text-decoration: none;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <i class="fas fa-map-marker-alt" style="text-decoration:none; font-size: 22px; color: #963A2F; margin-right: 12px; margin-top: -18px"></i>
                <h3 class="name" style="color: black; font-size: 20px; font-weight: bold; margin-bottom: 10px;">${trail.trail_name}</h3>
            </div>
        </a>
        <p style="font-size: 14px; color: #555; margin-bottom: 5px;">${trail.location}</p>
        <p style="font-size: 14px; color: #555; margin-bottom: 5px;">${trail.difficulty}</p>
        <p style="font-size: 14px; color: #555; margin-bottom: 5px;">${trail.distance} mi</p>
        <p style="font-size: 16px; color: black; margin-bottom: 10px;">${trail.description}</p>
        <p class="read-more" style="display: none;"><a href="#" onclick="toggleDescription(this); return false;">Read More</a></p>
        <p style="font-size: 16px; color: black; margin-bottom: 15px;">${trail.rating}★</p>
        <div class="card-buttons" style="display: flex; justify-content: flex-end">
            <button class="edit-button" style="border-radius: 5px; background-color: #BEDCB5" data-trail_id="${trail.trail_id}"><i style="color:#303030;" class="fas fa-edit"></i></button>
            <button class="delete-button" style="margin-left: 5px; border-radius: 5px; background-color: #BEDCB5" data-trail_id="${trail.trail_id}"><i style="color:#303030" class="fas fa-trash"></i></button>
        </div>
    </div>`;
}

var dropdown = document.getElementById('dropdown');
    dropdown.addEventListener("change", async function() {
    const userInput = dropdown.value;
    console.log('Yes, working');
    if (userInput === "") {
        return;
    }
    if (userInput === "All") {
        getTrails();
        return;
    }
    try {
        const response = await fetch(`${url}/trailsbyloc`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ location: userInput })
        });
      
        const data = await response.json();
        console.log(data);
        if (data.length === 0) {
            getResultsContainer.innerHTML = `<p style="display:flex; justify-Content: center; font-size: 25px; text-align: center">No results found... Try another location &#128578</p>`;
        }
        if (data.length > 0) {
            getResultsContainer.innerHTML = `<p style="display:flex; justify-Content: center; font-size: 25px; text-align: center">Search results for '${userInput}'</p>`;
            data.forEach((trail) => {
            getResultsContainer.innerHTML += makeCard(trail);
            });
        }
      } catch (error) {
        console.error(error);
      }
    });

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
        console.log(trailId)
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
        document.getElementById("map").value = results[0].map_link;

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
                rating: document.getElementById("rating").value,
                map_link: document.getElementById("map").value
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
                    getResultsContainer.innerHTML = "";
                    await getTrails();
                    closeNav();
                    form.reset();
                    saveChangesBtn.style.display = "none";
                    submitBtn.style.display = "block";
                } else {
                    throw new Error("Failed to update trail");
                }
            } catch (err) {
                console.error(err);
            }
        });
    }
    // function toggleDescription(link) {
    //     const description = link.parentNode.previousElementSibling;
    //     description.classList.toggle('expanded');
    //     link.innerText = description.classList.contains('expanded') ? 'Read Less' : 'Read More';
    // }
    
    // document.addEventListener('DOMContentLoaded', function() {
    //     const descriptions = document.getElementsByClassName('description');
    //     for (let i = 0; i < descriptions.length; i++) {
    //         const description = descriptions[i];
    //         const maxHeight = 60; // Maximum height in pixels for four lines of text
    //         if (description.offsetHeight > maxHeight) {
    //             description.classList.add('collapsed');
    //             const readMore = description.nextElementSibling;
    //             readMore.style.display = 'block';
    //         }
    //     }
    // });
    
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
    const map = document.getElementById("map").value;

    const formData = {
        trail_name: trailName, 
        location: location, 
        difficulty: difficulty, 
        distance: distance, 
        description: description, 
        rating: rating,
        map_link: map
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
            getResultsContainer.innerHTML = '';
            await getTrails();
            closeNav();
            form.reset();
        } else {
            throw new Error("Failed to add trail");
        }
    } catch (err) {
        console.error(err);
    }
});


function openNav() {
    console.log('openning sidebar')
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";

    // document.addEventListener("click", outsideClickHandler);
}
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    form.reset();

    // document.removeEventListener("click", outsideClickHandler);
}
// function outsideClickHandler(event) {
//     const sidebar = document.getElementById("mySidebar");
//     const target = event.target;
//     // Check if the clicked element is outside the sidebar
//     if (!sidebar.contains(target)) {
//         closeNav();
//     }
// }