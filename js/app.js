/* Hamburger menu */
let hamburger = options => {
	let button = document.querySelector(options.button);
	let menu = document.querySelector(options.menu);
	let list = document.querySelector(".popup-menu__list");

	let _openMenu = e => {
    e.preventDefault();
    menu.classList.toggle("popup-menu--active");
    button.classList.toggle("hamburger-menu-link--active");
		document.body.classList.toggle("lock");
	};

	let _closeMenu = e => {
		e.preventDefault();

		if (e.target.className === "popup-menu__link") {
      menu.classList.remove("popup-menu--active");
      button.classList.remove("hamburger-menu-link--active");
			
			document.body.classList.remove("lock");
		}
	};

	let addListeners = () => {
		button.addEventListener("click", _openMenu);
		list.addEventListener("click", _closeMenu);
	};

	return {
		init: addListeners
	};
};

hamburger({
	button: ".hamburger-menu-link",
	menu: ".popup-menu"
}).init();


