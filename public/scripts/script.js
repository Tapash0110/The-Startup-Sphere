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
        <div class="startup-card visible">
                <div class="heading">
                    <img class="logo" src='https://play-lh.googleusercontent.com/wspoVFDFfDzh1LgfEp3AEH_x_FGkH-rogOT4-rw_1QBwfvknuljV7T58xTL08hLn8Ds'>
                    <span class="name">${item.name}</span>
                </div>
                <hr>
                <h3>What they do:</h3>
                <p>${item.motive}</p>
                <span>${item.industry}</span>
                <h3>About them:</h3>
                <p>📍HQ: ${item.hq}</p>
                <span>${item.size} employees</span>
                <span>Founded: ${item.founded}</span>
                <h3>Funding:</h3>
                <span>${item.funding}</span>
                <br>
                <br>
                <a href=${item.link} class="link">VIEW JOBS</a>
            </div>`

    }
    itemsContainerElement.innerHTML = innerHtml;
}

