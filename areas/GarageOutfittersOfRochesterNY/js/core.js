
$(document).ready(function () {
	buildNavMenu();
	animateNavMenu();
	//animateGarage();
	slowScrollOnClick();
});

function animateGarage() {
	$('#sampleGarage').
		mouseenter(function() { $('#garageDoor').slideUp(1000); }).
		mouseleave(function() { $('#garageDoor').slideDown(1000); });
}

function animateNavMenu() {
	$(window).scroll(function () {
		var isAtTop = $(window).scrollTop() === 0;

		if (isAtTop) {
			$('nav').
				removeClass('shrunk bg-dark-transparent').
				addClass('extended bg-light').
				css({ 'border-bottom': 'transparent' });

			$('#companyName, #navListContainer').
				removeClass('font-light').
				addClass('font-dark');
		} else {
			$('nav').
				removeClass('extended bg-light').
				addClass('shrunk bg-dark-transparent').
				css({ 'border-bottom': '0.5px solid #666666' });

			$('#companyName, #navListContainer').
				removeClass('font-dark').
				addClass('font-light');
		}

		updateActiveNavItem();
	});
}

function buildNavMenu() {
	$('section').each(function (index, element) {
		var id = $(element).attr('id');

		if (id !== undefined) {
			var navItemHtml = '<li class="nav-list-item" id="nav-item-' + id + '"><a href="#' + id + '">' + id.replace('_', ' ') + '</a></li>';
			$('.nav-list').append(navItemHtml);
		}
	});

	$('.nav-list-item').first().addClass('current-view');
}

function slowScrollOnClick() {
	$('.nav-list-item > a, .go-to-contact-section').click(function (event) {
		event.preventDefault();

		var id = $(this).attr('href').replace('#', '');
		var elementTop = $('#' + id).offset().top;
		
		$('html, body').animate({ scrollTop: elementTop }, 600);
	});
}

function updateActiveNavItem() {
	var windowTop = $(window).scrollTop();
	var windowPosition = windowTop + ($(window).height() / 2);

	$('section').each(function (index, element) {
		var id = $(element).attr('id');

		if (id !== undefined) {
			var isActive = $('#nav-item-' + id).hasClass('current-view');

			if (!isActive) {
				var elementTop = $(element).offset().top;
				var elementBottom = elementTop + $(element).height();

				if (windowPosition > elementTop && windowPosition <= elementBottom) {
					$('.current-view').removeClass('current-view');
					$('#nav-item-' + id).addClass('current-view');
				}
			}
		}
	});
}