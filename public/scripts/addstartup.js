function add_card_form(){
    // let name =document.getElementById("name");
    let name ="name";
    let TheyDo = "What They Do";
    let address = "Howra, India";
    let employee_range = "1001-5000";
    let founded = "2023";
    let funding = "Google";
    let valuation = "6340M";
    let specification = "160M Series A in 2024";
    let link_to = "#";
    let card = `<div class="startup-card"><div class="heading"><span class="logo"></span><span class="name">${name}</span></div ><hr><h3>What they do:</h3><p>${TheyDo}</p><span>Fintechee</span><span>Down Payments</span><h3>About them:</h3><p>📍HQ: ${address}</p><span>${employee_range} employees</span><span>Founded: ${founded}</span><h3>Funding:</h3><span>${funding}</span><span>$${valuation} valuation</span><span>${specification}</span><br><div class="link"><a href="${link_to}">View Jobs</a></div></div>`
    
    let temp=document.createElement("div");
    temp.innerHTML=card;
    new_card=temp.getElementsByClassName("startup-card")[0];
    document.getElementById("statup_main_container").append(new_card);
}

add_card_form();