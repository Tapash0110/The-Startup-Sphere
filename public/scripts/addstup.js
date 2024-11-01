
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