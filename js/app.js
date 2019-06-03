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





/*Горизонтальный аккордион*/


let accordionTeam = () => {
	let accordionLink = document.querySelectorAll('.team-acco__trigger');

	accordionLink.forEach(function (memberName) {
			memberName.addEventListener('click', function (e) {
					e.preventDefault();
					let activeMember = document.querySelector('.team-acco__item.is-active');

					if (activeMember) {
							let accordionDetails = activeMember.querySelector('.team-acco__content');
							accordionDetails.style.height = '0px';
							activeMember.classList.remove('is-active');
					}

					if (!activeMember || activeMember.querySelector('.team-acco__trigger') !== e.target) {
							let currentMember = e.target.closest('.team-acco__item');
							currentMember.classList.add('is-active');

							let currentMemberInfo = currentMember.querySelector('.team-acco__content');
							currentMemberInfo.style.height = currentMemberInfo.scrollHeight + 'px';
					}
			})
	})
};
accordionTeam();



/*Вертикальный*/
let vertAccordion = () => {
	let calcWidth = () => {
			let windowWidth = window.innerWidth;
			let links = document.querySelectorAll('.menu-acco__trigger');
			let linksWidth = parseFloat(getComputedStyle(links[0]).width);

			let reqWidth = windowWidth - linksWidth * links.length;
			return reqWidth > 550 ? 550 : reqWidth;
	};
	let accordionLink = document.querySelectorAll('.menu-acco__trigger');
	accordionLink.forEach(function (memberName) {
			memberName.addEventListener('click', function (e) {
					e.preventDefault();
					let activeMember = document.querySelector('.menu-acco__item.menu-acco__item_active');
					if (activeMember) {
							let accordionDetails = activeMember.querySelector('.menu-acco__content');
							accordionDetails.style.width = '0px';
							activeMember.classList.remove('menu-acco__item_active');
					}

					if (!activeMember || activeMember.querySelector('.menu-acco__trigger') !== e.target) {
							let currentMember = e.target.closest('.menu-acco__item');
							currentMember.classList.remove('hidden');

							currentMember.classList.add('menu-acco__item_active');
							let currentMemberInfo = currentMember.querySelector('.menu-acco__content');
							currentMemberInfo.style.width = calcWidth() + 'px';
					}
			})
	})
};
vertAccordion();




/* Слайдер*/
const slide = (function () {
	const left = document.querySelector('.slider__button-prev');
	const right = document.querySelector('.slider__button-next');
	const slider = document.querySelector('.slider__list');
	const computed = getComputedStyle(slider);

	let sliderWidth = parseInt(computed.width);
	
	window.addEventListener('resize', function () {
		currentRight = 0;
		slider.style.right = currentRight;
		sliderWidth = parseInt(computed.width);
	}, true);

	var sliderItemsCounter = slider.children.length;

	let moveSlide = function (direction) {
		direction.addEventListener('click', function (e) {
			e.preventDefault();
			let currentRight = parseInt(computed.right);

			if (currentRight < (sliderItemsCounter - 1) * sliderWidth && direction == right) {
				slider.style.right = currentRight + sliderWidth + 'px';
			}else if(currentRight > (sliderItemsCounter - 1) * sliderWidth && direction == right){
				slider.style.right =currentRight - sliderItemsCounter * sliderWidth + 'px';

			}
			if (currentRight > 0 && direction == left) {
				slider.style.right = currentRight - sliderWidth + 'px';
			}else if(currentRight < 0 && direction == left){
				slider.style.right =currentRight + (sliderItemsCounter) * sliderWidth + 'px';
			}
		});
	}
		
	let addListeners = function () {
		moveSlide(right);
		moveSlide(left);
	}
	return { init: addListeners }
})();
slide.init();





/* Form and Modal*/
const overlay = (function () {
	let body = document.querySelector('body');
	let link = document.createElement('a');

	link.classList.add('modal-review__close');
	link.setAttribute('href', '#');

	let openOverlay = function (modalId, content) {
		let overlay = document.querySelector(modalId);
		let innerOverlay = overlay.querySelector('.modal-review__inner');

		overlay.addEventListener('click', (e) => {
			e.preventDefault();
			if (e.target === overlay) {
				closeOverlay(modalId);
			}
		})

		document.addEventListener('keydown', (e) => {
			if (e.keyCode == 27) {
				closeOverlay(modalId);
			}
		});
		if (content) {
			innerOverlay.innerHTML = content;
			innerOverlay.appendChild(link);
		}
		link.addEventListener('click', (e) => {
			e.preventDefault();
			closeOverlay(modalId);
		})
		overlay.classList.add('active');
		body.classList.add('locked');
	}
	let closeOverlay = function (modalId) {
		let overlay = document.querySelector(modalId);

		overlay.classList.remove('active');
		body.classList.remove('locked');
	}
	let setContent = function (modalId, content) {
		let overlay = document.querySelector(modalId);
		let innerOverlay = overlay.querySelector('.modal-review__inner');

		if (content) {
			innerOverlay.innerHTML = content;
			innerOverlay.appendChild(link);
		}
	}

	return {
		open: openOverlay,
		close: closeOverlay,
		setContent: setContent
	}
})();


var ajaxForm = function (form) {
	let formData = new FormData();

	formData.append("name", form.elements.name.value);
	formData.append("phone", form.elements.phone.value);
	formData.append("comment", form.elements.comment.value);
	formData.append("to", "enemikhin@rambler.ru");

	let url = "https://webdev-api.loftschool.com/sendmail/";

	const xhr = new XMLHttpRequest();
	xhr.responseType = "json";
	xhr.open('POST', url);
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhr.send(formData);

	return xhr;
}

var submitform = function (e) {
	e.preventDefault();
	var form = e.target;
	let request = ajaxForm(form);

	request.addEventListener('load', () => {
		if (request.status >= 400) {
			let content = 'Ошибка соединения с сервером, попробуйте позже';

			overlay.open('#modal-review', `${content}. Ошибка ${request.status}`)
		} else {
			let content = request.response.message;
			overlay.open('#modal-review', content);
		}
	});
}

let myForm = document.querySelector('#main-form');
myForm.addEventListener('submit', submitform);


let reviewOpen = function (content) {
	let button = document.querySelector('#button');
	let container = document.querySelector('.reviews__list');

	container.addEventListener('click', function (e) {
		e.preventDefault();
		let target = e.target;
		if (target.className === button.className) {
			overlay.open('#modal-review', content);
		}
	});


}

content = document.querySelector('#overlay').innerHTML;
reviewOpen(content);
