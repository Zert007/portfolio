document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const projectsContainer = document.getElementById("projectsContainer");

    let projects = []; // Store projects globally

    // Fetch projects from MongoDB API
    fetch("http://localhost:5000/projects")
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                console.error("API did not return an array!", data);
                return;
            }
            projects = data; // Save fetched projects
            displayProjects(projects);
        })
        .catch(error => console.error("Error fetching projects:", error));

    // Display projects
    function displayProjects(filteredProjects) {
        projectsContainer.innerHTML = ""; // Clear container before updating

        filteredProjects.forEach(project => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");

            projectCard.innerHTML = `
                <h3>${project.Title}</h3>
                <hr>
                <p>${project.beschrijving}</p>
                <div class="tags">
                    ${project.Tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
                </div>
            `;

            projectsContainer.appendChild(projectCard);
        });
    }

    // Search bar event listener
    searchBar.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        const filteredProjects = projects.filter(project =>
            project.Title.toLowerCase().includes(query) ||
            project.Tags.some(tag => tag.toLowerCase().includes(query))
        );
        displayProjects(filteredProjects);
    });
});
