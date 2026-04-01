// static/js/main.js

function scrollToSection() {
    document.getElementById("highlights").scrollIntoView({
        behavior: "smooth"
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});