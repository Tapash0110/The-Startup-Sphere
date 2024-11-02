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

function goto(link='/'){
  window.location.href = link;
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
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



// const locations = [
//   "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Ahmedabad",
//   "Kolkata", "Surat", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore"
// ];
let locations;
async function load() {
  const a = await fetch("/getdata", {
    method: "GET",
  })
  let b = await a.json();
  locations=b.location;
  console.log(locations);
}
load();


function filterLocations() {
  const input = document.getElementById("search-location");
  const dropdown = document.getElementById("location-dropdown");
  const inputRect = input.getBoundingClientRect();

  // Set the dropdown position to match the input box
  dropdown.style.position = "absolute";
  dropdown.style.top = `${inputRect.bottom + window.scrollY}px`;
  dropdown.style.left = `${inputRect.left + window.scrollX}px`;
  dropdown.style.width = `${inputRect.width}px`;

  // Clear previous suggestions
  dropdown.innerHTML = "";

  const inputValue = input.value.toLowerCase();
  if (inputValue.length === 0) {
    dropdown.style.display = "none"; // Hide dropdown if input is empty
    return;
  }

  // Filter locations based on input
  const filteredLocations = locations.filter(location => location.toLowerCase().startsWith(inputValue));

  // Show filtered locations
  filteredLocations.forEach(location => {
    const option = document.createElement("div");
    option.classList.add("location-option");
    option.textContent = location;
    option.onclick = function () {
      input.value = location;
      dropdown.style.display = "none"; // Hide dropdown once a location is selected
    };
    dropdown.appendChild(option);
  });

  dropdown.style.display = filteredLocations.length ? "block" : "none";
}

// Hide dropdown if user clicks outside
window.onclick = function (event) {
  if (!event.target.matches('#search-location')) {
    document.getElementById("location-dropdown").style.display = "none";
  }
}

async function togglebook(link="") {
  const a = await fetch(link, {
    method: "GET",
  })
  let b = await a.json();
  console.log(b);
  let divvv=document.getElementById(b.id);
  if(b.status==1){
    divvv.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                                        <path
                                            d="M 37 48 C 36.824219 48 36.652344 47.953125 36.496094 47.863281 L 25 41.15625 L 13.503906 47.863281 C 13.195313 48.042969 12.8125 48.046875 12.503906 47.867188 C 12.191406 47.6875 12 47.359375 12 47 L 12 3 C 12 2.449219 12.449219 2 13 2 L 37 2 C 37.554688 2 38 2.449219 38 3 L 38 47 C 38 47.359375 37.808594 47.6875 37.496094 47.867188 C 37.34375 47.957031 37.171875 48 37 48 Z">
                                        </path>
                                    </svg>`
  }
  else{
    divvv.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                                        <path
                                            d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z">
                                        </path>
                                    </svg>`
  }
}