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
	let scroll=true;

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
			if (scroll) {
				scroll = false;
			let currentRight = parseInt(computed.right);

			if (currentRight < (sliderItemsCounter - 1) * sliderWidth && direction == right) {
				slider.style.right = currentRight + sliderWidth + 'px';
			}else if (currentRight >= (sliderItemsCounter - 1) * sliderWidth && direction == right){
				slider.style.right = currentRight - (sliderItemsCounter - 1) * sliderWidth + 'px';

			}
			if (currentRight > 0 && direction == left) {
				slider.style.right = currentRight - sliderWidth + 'px';
			}else if (currentRight <= 0 && direction == left) {
				slider.style.right = currentRight + (sliderItemsCounter -1) * sliderWidth + 'px';
			}
			setTimeout(function(){
				scroll=true;
			}, 500);
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
	formData.append("to", "enemikhin@yrambler.ru");

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






/* OnePageScroll*/

let checkMobile = () => {
	let isMobile = false;
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Opera Mobile|Kindle|Windows Phone|PSP|AvantGo|Atomic Web Browser|Blazer|Chrome Mobile|Dolphin|Dolfin|Doris|GO Browser|Jasmine|MicroB|Mobile Firefox|Mobile Safari|Mobile Silk|Motorola Internet Browser|NetFront|NineSky|Nokia Web Browser|Obigo|Openwave Mobile Browser|Palm Pre web browser|Polaris|PS Vita browser|Puffin|QQbrowser|SEMC Browser|Skyfire|Tear|TeaShark|UC Browser|uZard Web|wOSBrowser|Yandex.Browser mobile/i.test(navigator.userAgent)) isMobile = true;
	return isMobile;
};


let OnePageScroll = options => {
	let currentSection = 0;
	let content = document.querySelector('.maincontent');
	let countSections = document.querySelectorAll('.section').length;
	let listLinks = document.querySelectorAll('[' + options.attribute + ']');
	let inscroll = false;
	
	let swipeDetected = element => {
		let startX,
			startY,
			distX,
			distY,
			deviation = 200, //deviation from main direction
			threshold = 150, //min range for swipe
			allowedTime = 1000, //max time for range
			elapsedTime, //runtime
			startTime;

		element.addEventListener('touchstart', e => {
			let touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime(); //time touch with sensor
		});

	//disable touchmove
		element.addEventListener('touchmove', e => e.preventDefault());

		element.addEventListener('touchend', e => {
			let touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX; //get horizontal move
			distY = touchobj.pageY - startY; //get vertical move
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime) {
				if (Math.abs(distY) >= threshold && Math.abs(distX) <= deviation) { //vertical swipe
					swipedir = (distY < 0) ? slideToSection(currentSection + 1) : slideToSection(currentSection - 1)
				}
			}
		});
	};
	let slideToSection = (indexSection) => {
		if (!inscroll) {
			if (indexSection >= 0 && indexSection < countSections) {
				
				currentSection = indexSection;

				inscroll = true;

				let position = indexSection * -100 + '%';

				content.style.transform = `translateY(${position})`;
				content.style.webkitTransform = `translateY(${position})`;

				

				setTimeout(() => {
					inscroll = false;
					let sideNavElements = document.querySelectorAll('.section-nav__item');
				for (let i = 0; i < sideNavElements.length; i++) {
					if (i !== indexSection) {
						sideNavElements[i].classList.remove('section-nav__item--active');
					} else {
						sideNavElements[i].classList.add('section-nav__item--active');
					}
				}
				}, 1000);
			}
		}
	};

	//handlers for keyboard
	document.addEventListener('keydown', e => {
		switch (e.keyCode) {
			case 40: 
				slideToSection(currentSection + 1);
				break;
			case 38: 
				slideToSection(currentSection - 1);
				break;
		}
	});

	//handlers for links
	listLinks.forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault();
			let index = parseInt((e.target).getAttribute(options.attribute));
			//fix for button-down
			if (!(index >= 0)) {
				index = parseInt((e.currentTarget).getAttribute(options.attribute));
			}
			slideToSection(index);
		});
	});

	//handlers for wheel
	document.addEventListener('wheel', e => {
		let deltaY = e.deltaY;
		let index = deltaY > 0 ? currentSection + 1 : currentSection - 1;

		slideToSection(index);
	},'touchmove', e => e.preventDefault());
	
	

 //handlers for swipe
	if (checkMobile) {
		swipeDetected(content);
	}
};

OnePageScroll({
	content: 'content',
	section: 'section',
	sideNavigation: 'section-nav__item',
	attribute: 'data-scroll-to'
});









ymaps.ready(init);

var placemarks = [
    {
        latitude: 59.97,
        longitude: 30.31,
        hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
        balloonContent: [
            '<div class="map__balloon">',
            '<img class="map__burger-img" src="img/map/burger.png" alt="Бургер"/>',
            'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19',
            '</div>'
        ]
    },
    {
        latitude: 59.94,
        longitude: 30.25,
        hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
        balloonContent: [
            '<div class="map__balloon">',
            '<img class="map__burger-img" src="img/map/burger.png" alt="Бургер"/>',
            'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д 64',
            '</div>'
        ]
    },
    {
        latitude: 59.93,
        longitude: 30.34,
        hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
        balloonContent: [
            '<div class="map__balloon">',
            '<img class="map__burger-img" src="img/map/burger.png" alt="Бургер"/>',
            'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д. 56',
            '</div>'
        ]
    }
],
    geoObjects= [];

function init() {
    var map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    for (var i = 0; i < placemarks.length; i++) {
            geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
            {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent.join('')
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'img/map/sprite.png',
                iconImageSize: [46, 57],
                iconImageOffset: [-23, -57],
                iconImageClipRect: [[415, 0], [461, 57]]
            });
    }

    var clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: 'img/map/burger.png',
                size: [100, 100],
                offset: [-50, -50]
            }
        ],
        clusterIconContentLayout: null
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
}




let video;
let durationControl; 
let soundControl;
let intervalId;

// документ полностью загружен
$().ready(function(){

    video = document.getElementById("player"); 

    // вешаем обработчик события onclick на тег video
    video.addEventListener('click', playStop);

    // обработчики событий для кнопок play
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length;i++){
        playButtons[i].addEventListener('click',playStop);
    }

    // обработчик событий для кнопки динамик
    let micControl = document.getElementById("mic");
    micControl.addEventListener('click',soundOf)
    
    // обработчики событий для ползунка продолжительности видео
    durationControl = document.getElementById("durationLevel");  
    durationControl.addEventListener('mousedown', stopInterval);   
    // durationControl.addEventListener('click',setVideoDuration);
    durationControl.addEventListener('mouseup', setVideoDuration); 

    durationControl.min = 0;
    durationControl.value = 0;    

    // обработчики событий для ползунка громокости
    soundControl = document.getElementById("micLevel");    
    // soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('mouseup', changeSoundVolume); 

    // задаем максимальные и минимальные значения громокости
    soundControl.min = 0;
    soundControl.max = 10;
    // присваиваем ползунку максимальное значение
    soundControl.value = soundControl.max;

    //обрабатываем окончание видео
    video.addEventListener('ended', function () {
        $(".video__player-img").toggleClass("video__player-img--active");
        video.currentTime = 0;
    }, false);
});

/*
 Воспроизведение видео
*/
function playStop(){
    // показывает или скрывает белую кнопку play
    $(".video__player-img").toggleClass("video__player-img--active");  
    // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
    durationControl.max = video.duration;

    // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
    if (video.paused){
        // video.webkitRequestFullScreen(); //возможность открыть в полноэкранном режиме
        // запускаем видео
        video.play();
        intervalId = setInterval(updateDuration,1000/66)
        
    }else{
        // video.webkitExitFullscreen(); //выйти из полноэкранного режима
        // останавливаем видео
        video.pause();  
        clearInterval(intervalId);
        
    }
}

function stopInterval(){
    video.pause();
    clearInterval(intervalId);
}

/*
    Реализует возможность перемотки нашего видео
*/
function setVideoDuration(){
    if (video.paused){
        video.play();
    }else{
        video.pause();  
    }
    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration,1000/66);
}


/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration(){    
    durationControl.value = video.currentTime;
    // console.log(video.currentTime)
}


/*
    Управление звуком
*/
function soundOf(){    
    /*
        Делаем проверку уровня громкости. 
        Если у нас нашего видео есть звук, то мы его выключаем. 
        Предварительно запомнив текущую позицию громкости в переменную soundLevel
    */
    if (video.volume === 0){
        video.volume = soundLevel;
        soundControl.value = soundLevel*10;
    }else{
        /*
            Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
            Хранится в перменной soundLevel
        */
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }    
}

/*
    Управление звуком видео
*/
function changeSoundVolume(){
    /*
        Св-во volume может принимать значения от 0 до 1
        Делим на 10 для того что бы, была возможность более точной регулировки видео. 
         video.volume 0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9  1 
   soundControl.value 0   1   2   3   4   5   6   7   8   9  10
        */
   
    video.volume = soundControl.value/10; 
    console.log(video.volume) 
}