const requestUrl = "https://shumanskaya.github.io/aeroplan-menu/content.json";
const request = new XMLHttpRequest();
request.open("GET", requestUrl);
request.responseType = "json";
request.send();
request.onload = function () {
    const content = request.response;
    const menu = content.content[0];

    function addGridArea() {
        let blocks = document.querySelectorAll('.menu__block');

        for (let i = 0; i < blocks.length; i++) {
            let section = blocks[i].querySelector('.section');
            let gridAreaName = section.id;
            blocks[i].style.gridArea = gridAreaName;
        }
    }

    // addGridArea();

    function addMenu(arr) {
        let menu = arr.section;
        // console.log(menu);

        if ("content" in document.createElement("template")) {
            let sectionID;
            let sectionMenu;

            for (let i = 0; i < menu.length; i++) {
                sectionID = menu[i].name;
                sectionMenu = menu[i].menu;

                let sectionHTML = document.querySelector(`#${sectionID}`);                
                let templateBlock = sectionHTML.querySelector(".section_template");
                let template = document.querySelector("#menuTemplate");

                for (let j = 0; j < sectionMenu.length; j++) {
                    let name = sectionMenu[j].name;
                    let compound = sectionMenu[j].compound;
                    let price = sectionMenu[j].price;

                    let clone = template.content.cloneNode(true);
                    let title = clone.querySelector(".food_name");
                    let menuDesc = clone.querySelector(".food_desc");
                    let menuPrice = clone.querySelector(".food_price");

                    title.textContent = name;
                    menuDesc.textContent = compound;
                    menuPrice.textContent = price;

                    templateBlock.appendChild(clone);
                }
            }

        } else {
            console.log("error with template")
        }
    }

    addMenu(menu);
};