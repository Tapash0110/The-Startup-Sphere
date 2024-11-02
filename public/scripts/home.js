const phrases = [
    "Track India's newest startups.",
    "Kickstart your career.",
    "Powerful filters."
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
const typingElement = document.getElementById("typing-effect");

function type() {
    if (currentCharIndex < phrases[currentPhraseIndex].length) {
        typingElement.textContent += phrases[currentPhraseIndex].charAt(currentCharIndex);
        currentCharIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(deleteText, 2000); 
    }
}

function deleteText() {
    if (currentCharIndex > 0) {
        typingElement.textContent = phrases[currentPhraseIndex].substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(deleteText, 50);
    } else {
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length; 
        setTimeout(type, 1000); 
    }
}


window.onload = function() {
    type();
};
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('.item');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    items.forEach(item => {
        observer.observe(item); 
    });
});
const signupdiv=document.getElementById("create_account");
signupdiv.addEventListener("click",()=>{
    window.location.href = "/signup";
})
const filter=document.getElementById("filter");
filter.addEventListener("click",()=>{
    window.location.href = "/profile";
})
