/*window.addEventListener("load", () => {

    // eerste server test
    console.info('testing server');

    fetch("http://localhost:5000/api")
        .then(response => response.json())
        .then(data => {
            document.getElementById("skill-wrapper").innerText = data.message;
        })
        .catch(error => {
            console.error("Fout bij de eerste connectie:", error);
            document.getElementById("skill-wrapper").innerText = "Fout bij laden van gegevens.";
        });


    // Test Database skills

    fetch("http://localhost:5000/skills")
        .then(response => response.json())
        .then(data => {
            console.log('dataRetrieved', data);
            document.getElementById("skill1Title").innerText = data[0].name;
            updateProgress(data[0].level *10)
        })
        .catch(error => {
            console.error("Fout bij ophalen van skil data:", error);
            document.getElementById("skill-wrapper").innerText = "Fout bij laden van gegevens.";
        });
});
*/
/*window.addEventListener("load", () => {
    // First server test
    console.info('testing server');
    fetch("http://localhost:5000/api")
        .then(response => response.json())
        .then(data => {
            document.getElementById("skill-wrapper").innerText = data.message;
        })
        .catch(error => {
            console.error("Fout bij de eerste connectie:", error);
            document.getElementById("skill-wrapper").innerText = "Fout bij laden van gegevens.";
        });

    // Fetch all skills from the database
    fetch("http://localhost:5000/skills")
        .then(response => response.json())
        .then(data => {
            console.log('dataRetrieved', data);
            const skillsContainer = document.getElementById("skillsContainer");
            
            // Loop through each skill in the database
            data.forEach(skill => {
                // Create a new container for each skill
                const skillWrapper = document.createElement('div');
                skillWrapper.classList.add('skill-wrapper');
                
                // Create a title for the skill
                const skillTitle = document.createElement('h3');
                skillTitle.innerText = skill.name;
                skillWrapper.appendChild(skillTitle);

                // Create the progress bar element
                const progressBar = document.createElement('div');
                progressBar.classList.add('progress-bar');

                // Append the progress bar to the skill wrapper
                skillWrapper.appendChild(progressBar);

                // Append the skill wrapper to the container
                skillsContainer.appendChild(skillWrapper);

                // Update the progress of the bar based on the skill level
                updateProgress(progressBar, skill.level * 10);
            });
        })
        .catch(error => {
            console.error("Fout bij ophalen van skill data:", error);
            document.getElementById("skill-wrapper").innerText = "Fout bij laden van gegevens.";
        });
});

// Function to update progress dynamically
function updateProgress(progressBar, progress) {
    // Set the --progress variable dynamically for the progress bar
    progressBar.style.setProperty('--progress', `${progress}%`);
}
*/
function updateProgress(progress, element) {
    // Select the progress bar element
    const progressBar = element.querySelector('.progress-bar');
    
    // Set the progress value for the CSS variable
    progressBar.style.setProperty('--progress', `${progress}%`);
    
    // Remove all color classes first (to avoid conflicts)
    progressBar.classList.remove('blue', 'pink', 'green', 'rainbow');
    
    // Add the appropriate class based on the progress value
    if (progress >= 85) {
        progressBar.classList.add('rainbow'); // cyan if 85% or more
    } else if (progress >= 75) {
        progressBar.classList.add('green'); // Green if between 75% and 79%
    } else if (progress > 50) {
        progressBar.classList.add('blue'); // Blue if between 50% and 74%
    } else {
        progressBar.classList.add('pink'); // Pink if 50% or lower
    }
}

window.addEventListener("load", () => {
    fetch("http://localhost:5000/skills")
        .then(response => response.json())
        .then(data => {
            console.log('dataRetrieved', data);
            
            // Loop through all skills and update progress
            data.forEach((skill, index) => {
                const skillWrapper = document.createElement('div');
                skillWrapper.classList.add('skill-wrapper');
                
                const skillTitle = document.createElement('h3');
                skillTitle.innerText = skill.name;
                skillWrapper.appendChild(skillTitle);

                const progressBar = document.createElement('div');
                progressBar.classList.add('progress-bar');
                skillWrapper.appendChild(progressBar);
                
                // Update the progress and apply the color based on the level
                updateProgress(skill.level * 10, skillWrapper); // Assuming `level` is between 1-10
                
                document.getElementById('skillsContainer').appendChild(skillWrapper);
            });
        })
        .catch(error => {
            console.error("Error retrieving skill data:", error);
        });
});
