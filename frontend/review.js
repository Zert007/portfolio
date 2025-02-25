document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");
    const reviewText = document.getElementById("reviewText");
    const submitButton = document.getElementById("submitReview");
    const reviewsContainer = document.getElementById("reviewsContainer");
    let selectedRating = 5;

    // Sterren selecteren
    stars.forEach(star => {
        star.addEventListener("click", () => {
            selectedRating = star.getAttribute("data-value");
            stars.forEach(s => s.classList.remove("active"));
            for (let i = 0; i < selectedRating; i++) {
                stars[i].classList.add("active");
            }
        });
    });

    // Review verzenden
    submitButton.addEventListener("click", () => {
        const review = reviewText.value.trim();
        if (review === "") return alert("Vul een review in!");

        const reviewData = { rating: selectedRating, text: review };

        fetch("http://localhost:5000/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reviewData),
        })
        .then(res => res.json())
        .then(() => {
            reviewText.value = "";
            fetchReviews(); // Update de lijst
        })
        .catch(error => console.error("Fout bij verzenden:", error));
    });

    // Reviews ophalen
    function fetchReviews() {
        fetch("http://localhost:5000/reviews")
            .then(res => res.json())
            .then(data => {
                reviewsContainer.innerHTML = "";
                data.forEach(review => {
                    const reviewCard = document.createElement("div");
                    reviewCard.classList.add("review-card");
                    reviewCard.innerHTML = `
                        <div class="stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
                        <p>${review.text}</p>
                    `;
                    reviewsContainer.appendChild(reviewCard);
                });
            })
            .catch(error => console.error("Fout bij ophalen:", error));
    }

    fetchReviews();
});
