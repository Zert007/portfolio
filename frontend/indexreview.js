document.addEventListener("DOMContentLoaded", () => {
    const reviewFooter = document.getElementById("reviewFooter");

    fetch("http://localhost:5000/reviews/high-rated")
        .then(response => response.json())
        .then(reviews => {
            if (!Array.isArray(reviews)) {
                console.error("API gaf geen array terug!", reviews);
                return;
            }

            displayReviewsInFooter(reviews);
        })
        .catch(error => console.error("Fout bij ophalen van reviews:", error));

    function displayReviewsInFooter(reviews) {
        reviewFooter.innerHTML = ""; // Reset de footer eerst

        reviews.forEach(review => {
            const reviewElement = document.createElement("div");
            reviewElement.classList.add("review-item");

            reviewElement.innerHTML = `
                <p>"${review.text}"</p>
                <div class="stars">${"⭐".repeat(review.stars)}</div>
            `;

            reviewFooter.appendChild(reviewElement);
        });
    }
});
