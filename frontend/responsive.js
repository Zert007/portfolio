document.addEventListener("DOMContentLoaded", function () {
    const burger = document.getElementById("navburger");
    const navLinks = document.querySelector(".nav-links");

    if (burger && navLinks) {  // Checkt of elementen bestaan om errors te voorkomen
        burger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        // Sluit het menu als je buiten klikt
        document.addEventListener("click", function (event) {
            if (!navLinks.contains(event.target) && !burger.contains(event.target)) {
                navLinks.classList.remove("active");
            }
        });
    }
});
