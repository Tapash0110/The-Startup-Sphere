document.addEventListener('DOMContentLoaded', function() {
    const text = "The StartUp Hub"; 
    const span = document.querySelector('.company-name');
    let index = 0;

    function type() {
    if (index < text.length) {
       span.textContent += text.charAt(index);
       index++;
       setTimeout(type, 100); 
    }
  }

   type();
});