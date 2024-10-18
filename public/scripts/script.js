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

async function auth() {
    let a = await fetch("/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ from: "web" }),
    })
    let b = await a.json();
    const navbar = document.getElementById("navbar");

    if (b.statuscode === 1) {
        navbar.innerHTML = `<button class='user' id='user' onclick='logout("uid")'>${b.username}</button>`
    }
}
auth();

function logout(name='') {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = "/";
}


// document.addEventListener('DOMContentLoaded', () => {
//     const cards = document.querySelectorAll('.startup-card');
//     const observerOptions = {
//         root: null, // Use the viewport as the root
//         rootMargin: '0px',
//         threshold: 0.1 // Trigger when 10% of the card is visible
//     };
//     const observerCallback = (entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('visible');
//                 observer.unobserve(entry.target);
//             }
//         });
//     };
//     const observer = new IntersectionObserver(observerCallback, observerOptions);
//     cards.forEach(card => {
//         observer.observe(card);
//     });
// });

// items = [
//     {
//         image: 'https://i.tracxn.com/logo/company/rupeek_61173683-f13f-4707-833d-8b4fd0c69454.PNG?height=120&width=120',
//         comapany_name: 'Rupeek',
//         what_they_do: 'Online gold loans at your doorstep',
//         comapny_tags: {
//             tag1: 'Fintech',
//             tag2: 'Payments',
//         },
//         headquarters: 'Bangalore, India',
//         no_of_employees: '1001-5000',
//         founded: 2005,
//         funding: {
//             investor: 'Sequioa',
//             valuation: '$634M',
//             funding_details: '$16M Series E in 2022',
//         },
//         link: 'https://www.google.com',
//     },
//     {
//         image: 'https://play-lh.googleusercontent.com/wspoVFDFfDzh1LgfEp3AEH_x_FGkH-rogOT4-rw_1QBwfvknuljV7T58xTL08hLn8Ds',
//         comapany_name: 'CueMath',
//         what_they_do: 'Making kids great at math',
//         comapny_tags: {
//             tag1: 'EdTech',
//             tag2: 'Legal',
//         },
//         headquarters: 'Bangalore, India',
//         no_of_employees: '1001-5000',
//         founded: 2011,
//         funding: {
//             investor: 'Sequioa',
//             valuation: '$407M',
//             funding_details: '$57M Series D in 2022',
//         },
//         link: 'https://www.cuemath.com',
//     }
// ];

// displayItemHomePage();
// function displayItemHomePage() {
//     let itemsContainerElement = document.querySelector('.startup-container');
//     if (!itemsContainerElement) {
//         return;
//     }
//     let innerHtml = '';
//     items.forEach(item => {
//         innerHtml += `
//     <div class="startup-card visible">
//             <div class="heading">
//                 <img class="logo" src=${item.image}>
//                 <span class="name">${item.comapany_name}</span>
//             </div>
//             <hr>
//             <h3>What they do:</h3>
//             <p>${item.what_they_do}</p>
//             <span>${item.comapny_tags.tag1}</span>
//             <span>${item.comapny_tags.tag2}</span>
//             <h3>About them:</h3>
//             <p>📍HQ: ${item.headquarters}</p>
//             <span>${item.no_of_employees} employees</span>
//             <span>Founded: ${item.founded}</span>
//             <h3>Funding:</h3>
//             <span>${item.funding.investor}</span>
//             <span>${item.funding.valuation}</span>
//             <span>${item.funding.funding_details}</span>
//             <br>
//             <br>
//             <a href=${item.link} class="link">VIEW JOBS</a>
//         </div>`
//     })

//     itemsContainerElement.innerHTML = innerHtml;
// }

let myform = document.getElementById("myform");
async function find(e) {
    e.preventDefault();
    //recovering deta of form
    let formData = new FormData(myform);
    const data = {};
    for (let keyValue of formData.entries()) {
        data[keyValue[0]] = keyValue[1];
    }
    //fetch from server
    let a = await fetch("/find", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    let b = await a.json();
    // console.log(b);

    let no = document.getElementById("found_card");
    let html = "Startups your search matched : ";
    html += b.length;
    no.innerHTML = html;

    loadd(b);
}
myform.addEventListener("submit", find);

async function loadd(card_list = []) {
    let itemsContainerElement = document.querySelector('.startup-container');
    let innerHtml = "";
    if (!itemsContainerElement) {
        return;
    }
    for (const item of card_list) {
        innerHtml += `
         <div class="card">
        <div class="card-left">
            <img src="https://via.placeholder.com/100" alt="Company Logo">
            <h2>Company Name</h2>
            <p>What the company does</p>
        </div>
        <div class="card-right">
            <h3>Company Details</h3>
            <div class="details">
                <div>
                    <p><strong>Founding Year:</strong> 2020</p>
                    <p><strong>Funding Stage:</strong> Series A</p>
                </div>
                <div>
                    <p><strong>Company Size:</strong> 50-100 Employees</p>
                    <p><strong>Funding Amount:</strong> $5M</p>
                </div>
                <div>
                    <p><strong>Industry:</strong> Technology</p>
                </div>
                <div>
                    <p class="vacancies"><strong>Current Vacancies:</strong> 12 Open Positions</p>
                </div>
            </div>
            <div class="rating">
                <strong>Rating:</strong>
                <span>★★★★☆</span>
            </div>
            <div class="cta">
                <a href="#">Visit Portal</a>
            </div>
            <div class="social-media">
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                        <path
                            d="M22.46 6c-.77.34-1.6.57-2.46.67a4.33 4.33 0 001.89-2.39 8.68 8.68 0 01-2.75 1.05 4.32 4.32 0 00-7.36 3.94A12.27 12.27 0 013 4.73a4.32 4.32 0 001.34 5.77 4.29 4.29 0 01-1.96-.54v.05a4.32 4.32 0 003.46 4.24 4.34 4.34 0 01-1.95.07 4.32 4.32 0 004.03 3 8.7 8.7 0 01-6.38 1.79 12.28 12.28 0 006.64 1.95c7.98 0 12.35-6.61 12.35-12.35 0-.19-.01-.39-.02-.58A8.82 8.82 0 0024 5.53a8.48 8.48 0 01-2.54.7z"
                            fill="#1DA1F2" />
                    </svg>
                </a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                        <path
                            d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9.03h3.56v11.42zm-1.78-13A2.07 2.07 0 013.27 5.3c0-1.14.92-2.07 2.07-2.07s2.07.93 2.07 2.07a2.07 2.07 0 01-2.07 2.15zM20.45 20.45h-3.56v-5.62c0-1.34-.03-3.06-1.86-3.06-1.86 0-2.14 1.46-2.14 2.96v5.72h-3.56V9.03h3.42v1.56h.05c.48-.9 1.66-1.86 3.42-1.86 3.66 0 4.34 2.41 4.34 5.55v6.17z"
                            fill="#0077B5" />
                    </svg>
                </a>
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30"
                        viewBox="0 0 50 50">
                        <path
                            d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"
                            fill="#0077B5" />
                    </svg></a>
            </div>
        </div>
    </div>
`

    }
    itemsContainerElement.innerHTML = innerHtml;
}

