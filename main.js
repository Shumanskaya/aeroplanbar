const requestURL = "https://shumanskaya.github.io/aeroplan-menu/menu.json";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function () {
    const menus = request.response;
    addMenu(menus);
};


function addMenu(menu) {
    const foodMenu = menu.section[0].menu;

    if ("content" in document.createElement("template")) {
        var sectionLlist = document.querySelector(".section__list");
        var template = document.querySelector("#menu_item");

        for(let i = 0; i < foodMenu.length; i++) {
           let name = foodMenu[i].name;
           let compound = foodMenu[i].compound;
           let price = foodMenu[i].price;

           let clone = template.content.cloneNode(true);
           let title = clone.querySelector(".menu__title");
           let menuDesc = clone.querySelector(".menu__desc-ingredients");
           let menuPrice = clone.querySelector(".menu__price");
           
           title.textContent = name;
           menuDesc.textContent = compound;
           menuPrice.textContent = price;

           sectionLlist.appendChild(clone);
        }

    } else {
        console.log("error with template")
    }
}