document.addEventListener('DOMContentLoaded', function () {
    const text = "StartUp Sphere";
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

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }