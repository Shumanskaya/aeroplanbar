const sectionNav = document.querySelectorAll(".section__nav");
let date = new Date();
let month = date.toLocaleString('en-GB', { month: 'long' }).toLocaleLowerCase();

const requestUrl = "https://shumanskaya.github.io/aeroplan-menu/content.json";
const request = new XMLHttpRequest();
request.open("GET", requestUrl);
request.responseType = "json";
request.send();
request.onload = function () {
    const content = request.response;
    const menu = content.content[0];
    const event = content.content[1];

    addMenu(menu, "food");
    addEvents(event, month);

    for (let i = 0; i < sectionNav.length; i++) {
        sectionNav[i].addEventListener("click", function (ev) {
            changeSection(ev, menu, event);
        })
    }

    addactualDate(date);

};

function changeSection(section, menu, event) {
    let element = section.target;
    let parent = element.closest(".section")

    changeBlockMenu(element, parent);

    if (parent.id === "menu") {
        addMenu(menu, element.id);
    } else if (parent.id === "event") {
        addEvents(event, element.id);
    }
    changeMenu(element, parent);
};

function changeMenu(element, parent) {
    let nav = parent.querySelectorAll(".section__nav__title");
    for (let i = 0; i < nav.length; i++) {
        nav[i].classList.remove("section__nav__title--active");
    }
    element.classList.add("section__nav__title--active");
}

function changeBlockMenu(element, parent) {
    let block = parent.querySelector(".section__template");
    if (element.id !== block.dataset.id) {
        block.classList.remove("section__template--active");
    }
}

function addMenu(arr, positionName) {
    let menu;
    let menuId;
    for (let i = 0; i < arr.section.length; i++) {
        if (arr.section[i].name === positionName) {
            menu = arr.section[i].menu;
            menuId = arr.section[i].name;
        }
    }

    if ("content" in document.createElement("template")) {
        var sectionLlist = document.querySelector(".section__list");
        sectionLlist.insertAdjacentHTML("afterbegin", `<div class='section__template section__template--active' data-id=${menuId}></div>`);
        let sectionTemplate = document.querySelector(".section__template");
        let template = document.querySelector("#menu_item");

        for (let i = 0; i < menu.length; i++) {
            let name = menu[i].name;
            let compound = menu[i].compound;
            let price = menu[i].price;

            let clone = template.content.cloneNode(true);
            let title = clone.querySelector(".menu__title");
            let menuDesc = clone.querySelector(".menu__desc-ingredients");
            let menuPrice = clone.querySelector(".menu__price");

            title.textContent = name;
            menuDesc.textContent = compound;
            menuPrice.textContent = price;

            sectionTemplate.appendChild(clone);
        }

    } else {
        console.log("error with template")
    }
}

function addEvents(arr, positionName) {
    let events;
    let eventID;

    for (let i = 0; i < arr.section.length; i++) {
        if (arr.section[i].name === positionName) {
            events = arr.section[i].events;
            eventID = arr.section[i].name;
        }
    }

    if ("content" in document.createElement("template")) {
        var eventList = document.querySelector(".event__list");
        eventList.insertAdjacentHTML("afterbegin", `<div class='section__template section__template--active' data-id=${eventID}></div>`)
        let eventTemplate = eventList.querySelector(".section__template");
        let template = document.querySelector("#event_item");

        for (let i = 0; i < events.length; i++) {
            let event = events[i];
            let title = event.title;
            let date = event.date;
            let desc = event.desc;
            let price = event.price;
            let img = event.img;

            let clone = template.content.cloneNode(true);
            let titleBlock = clone.querySelector(".event__title");
            let dateBlock = clone.querySelector(".event__date");
            let descBlock = clone.querySelector(".event__desc");
            let priceBlock = clone.querySelector(".event__details");
            let imgBlock = clone.querySelector(".event__img");

            titleBlock.textContent = title;
            dateBlock.textContent = date;
            descBlock.textContent = desc;
            priceBlock.textContent = price;
            imgBlock.src = img;

            eventTemplate.appendChild(clone);
        }
    } else {
        console.log("error with template")
    }
}

function addactualDate(date) {
    let month = date.toLocaleString('en-GB', { month: 'long' }).toLocaleLowerCase();
    let dateNav = document.querySelector(".date__nav");
    let months = dateNav.querySelectorAll(".section__nav__title");

    for (let i = 0; i < months.length; i++) {
        if (months[i].id === month) {
            months[i].classList.add("section__nav__title--active");
            months[i].classList.add("date__nav--active");
            if (i === 10) {
                months[i].style.order = "-1";
                months[11].classList.add("date__nav--active");
                months[11].style.order = "-1";
                months[0].classList.add("date__nav--active");
            } else if (i === 11) {
                months[i].style.order = "-1";
                months[0].classList.add("date__nav--active");
                months[1].classList.add("date__nav--active");
            } else {
                months[i+1].classList.add("date__nav--active");
                months[i+2].classList.add("date__nav--active");
            }
        }
    }
}

let slider = document.querySelector('.slider');
let sliders = slider.querySelectorAll(".slide");

// function slideAnimation(active) {
//     if (active !== sliders.length-1) {
//         sliders[active].classList.remove("slide--active");
//         active += 1;
//         sliders[active].classList.add("slide--active");

//         setInterval(() => {
//             slideAnimation(active);
//         }, 5000)
//     } else {
//         sliders[active].classList.remove("slide--active");
//         active = 0;
//         sliders[active].classList.add("slide--active");
//         setInterval(() => {
//             slideAnimation(active);
//         }, 5000)
//     }
// }


// setInterval(() => {
//     slideAnimation(0);
// }, 5000)