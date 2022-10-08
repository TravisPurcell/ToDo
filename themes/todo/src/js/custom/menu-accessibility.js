jQuery(document).ready(function($) {

	/**
	 * Fix for Samsung browser resize bug
	 */

	var resizeEnabled = true;

	document.querySelector('.search-field').addEventListener('focus', function() {
		resizeEnabled = false;
		setTimeout(function() {
			resizeEnabled = true;
		}, 500)
	})

	/**
     * Screen Resize Checks
     */

    var $window = $(window);
    var w = $window.width();
    var h = $window.height();

    function closeMenu() {
		$('.sub-menu').removeClass('active').attr('aria-expanded', 'false');
		$('.menu-item-has-children:not(.top-level-menu-item) > .sub-menu').slideUp();
		$('.top-level-menu-item .sub-menu-toggle').attr('aria-expanded', 'false');
		$('#site-navigation').removeClass('toggled');
		$('.sub-menu-toggle').removeClass('toggled').attr('aria-expanded', 'false');
		$('.sub-menu a').attr('tabindex', '-1');
		$('.sub-menu-toggle:not(.sub-menu-toggle-top)').attr('tabindex', '-1');
	}

	function closeMobileMenu() {
		$('#site-navigation').removeClass('toggled');
    	$('.menu-toggle').attr('aria-expanded', 'false');
		$('#primary-menu').attr('aria-expanded', 'false');
		$('.sub-menu-toggle').removeClass('toggled').attr('aria-expanded', 'false');
		$('.sub-menu').slideUp();
		$('.sub-menu a').attr('tabindex', '-1');
		$('.sub-menu-toggle:not(.sub-menu-toggle-top)').attr('tabindex', '-1');
	}

	function checkScreenWidth() {

	    if ( w > 991 ) {
	    	
	    	/**
	    	 * Main Menu
	    	 */

	    	// Primary Menu Reset

	    	$('#primary-menu').removeAttr('aria-expanded');
	    	$('#menu-toggle').attr('aria-expanded', 'false');
	    	$('#site-navigation').removeClass('toggled');
	    	$('.sub-menu').removeAttr('style').attr('aria-expanded', 'false');
	    	$('.sub-menu-toggle').removeClass('toggled').attr('aria-expanded', 'false');

	    	closeMenu();

	    	// Top level menu items

	    	$('.sub-menu-toggle-top').unbind('click').removeClass('toggled');

			$('.sub-menu-toggle-top').on('click', function() {
				$(this).next('.sub-menu').addClass('active');
				$('#site-navigation').addClass('toggled');

				// Close other open menus if tab navigation is being used to open other sub-menus

				$(this).closest('li').siblings('li.menu-item-has-children').children('.sub-menu').removeClass('active').attr('aria-expanded', 'false');
				$(this).closest('li').siblings('li.menu-item-has-children').children('.sub-menu-toggle').attr('aria-expanded', 'false');
				$(this).closest('li').siblings('li.menu-item-has-children').children('.sub-menu').find('a').attr('tabindex', '-1');
				$(this).closest('li').siblings('li.menu-item-has-children').children('.sub-menu').find('.sub-menu-toggle').attr('tabindex', '-1');

				if ( $(this).attr('aria-expanded') == 'false' ) {
		    		$(this).attr('aria-expanded', 'true');
		    		$(this).next('.sub-menu').attr('aria-expanded', 'true');
		    		$(this).next('.sub-menu').find('li > a').attr('tabindex', '0');
		    		$(this).next('.sub-menu').find('a.close-menu').attr('tabindex', '0');
		    		$(this).next('.sub-menu').find('.sub-menu-toggle').attr('tabindex', '0');
		    	} else {
		    		closeMenu();
		    		$(this).next('.sub-menu').find('li > a').attr('tabindex', '-1');
	    			$(this).next('.sub-menu').find('.sub-menu-toggle').attr('tabindex', '-1');
	    			$(this).next('.sub-menu').find('a.close-menu').attr('tabindex', '-1');
		    	}
			});

			// Esc key to exit main menu

			$(document).unbind('keyup');

			$(document).on('keyup', function(e) {
				if (e.keyCode == 27 && $('#site-navigation').hasClass('toggled')) {
					closeMenu();
				}
			});

			// Esc buttons

			$('a.close-menu').on('click', function(e) {
				e.preventDefault();
				closeMenu();
			});

			$('a.close-menu').on('keyup', function(e) {
				if (e.keyCode == 27 || e.keyCode == 13 ) {
					e.preventDefault();
					closeMenu();
				}
			});

			// Close when clicking outside of main nav

		    $('#main-menu-overlay').unbind('click');

		    $('#main-menu-overlay').on('click', function() {
				closeMenu();
		    });

		    /**
			 * Search Menu
			 */

			$('.searchbar .search-field').attr('tabindex', '-1');
			$('.searchbar .search-submit').attr('tabindex', '-1');

			var $search = $('li.menu-search');

			// Prevent window resizing from causing double click event
			$('.search-toggle').unbind('click');

			$('.search-toggle').on('click', function() {
				if ( !$(this).closest('li').hasClass('active') ) {
					$(this).closest('li').addClass('active');
					$('.searchbar .search-field').focus().attr('tabindex', '0');
					$('.searchbar .search-submit').attr('tabindex', '0');

					$(document).one('click', function closeSearch(e) {
						if ($search.has(e.target).length === 0) {
							$search.removeClass('active');
							$('.searchbar .search-field').attr('tabindex', '-1');
							$('.searchbar .search-submit').attr('tabindex', '-1');
						} else if ( $search.hasClass('active') ) {
							$(document).one('click', closeSearch);
						}
					});
				} else {
					$('.searchbar .search-field').attr('tabindex', '-1');
					$('.searchbar .search-submit').attr('tabindex', '-1');
					$(this).closest('li').removeClass('active');
				}
			});

		}

		if ( w < 992 ) {
		
			/**
			 * Main Menu
			 */

			// Reset Main Menu

			$('#primary-menu').attr('aria-expanded', 'false');
			$('#site-navigation').removeClass('toggled');
			$('.sub-menu').removeAttr('style').attr('aria-expanded', 'false');
			$('.sub-menu-toggle').removeClass('toggled').attr('aria-expanded', 'false');

			closeMobileMenu();

			// Reset top-level sub-menus

			$('.top-level-menu-item > .sub-menu').removeClass('active').attr('aria-expanded', 'false');

			// Top level menu items

			$('.sub-menu-toggle-top').unbind('click');

			$('.sub-menu-toggle-top').on('click', function() {
				$(this).toggleClass('toggled');
				$(this).next('.sub-menu').slideToggle();

				if ( $(this).attr('aria-expanded') == 'false' ) {
		    		$(this).attr('aria-expanded', 'true');
		    		$(this).next('.sub-menu').attr('aria-expanded', 'true');
		    		$(this).next('.sub-menu').find('li > a').attr('tabindex', '0');
	    			$(this).next('.sub-menu').find('.sub-menu-toggle').attr('tabindex', '0');
		    	} else {
		    		$(this).attr('aria-expanded', 'false');
		    		$(this).next('.sub-menu').attr('aria-expanded', 'false');
		    		$(this).next('.sub-menu').find('li > a').attr('tabindex', '-1');
	    			$(this).next('.sub-menu').find('.sub-menu-toggle').attr('tabindex', '-1');
		    	}
			});

			// Esc key to exit main menu

			$(document).unbind('keyup');

		    $(document).on('keyup', function(e) {
		    	if (e.keyCode == 27 && $('#site-navigation').hasClass('toggled')) {
		    		closeMobileMenu();
		    	}
		    });

		    // Mobile esc button

		    $('.close-menu-top a').on('click', function(e) {
		    	e.preventDefault();
		    	closeMobileMenu();
		    });

		    // Close when clicking outside of main nav

		    $('#main-menu-overlay').unbind('click');

		    $('#main-menu-overlay').on('click', function() {
				closeMobileMenu();
		    });

		    /**
			 * Search Menu
			 */
			
			$('.searchbar .search-field').removeAttr('tabindex');
			$('.searchbar .search-submit').removeAttr('tabindex');
			$('li.menu-search').removeClass('active');
			$('.search-toggle').unbind('click');

		}
		
	}

	// Execute checkScreenWidth function

	$(window).load(function() {
		checkScreenWidth();
	});

    setInterval(function () {
        if ((w != $window.width()) || (h != $window.height())) {
            w = $window.width();
            h = $window.height();

        	if (resizeEnabled === true) {
				checkScreenWidth();
			} else {
				return;
			}

        }
    }, 300);

	/**
     * Menu Toggles
     */

    // Sub-menu buttons

    $('.sub-menu-toggle').on('click', function() {
    	$(this).toggleClass('toggled');
    	$(this).next('.sub-menu').slideToggle();
    	
    	if ( $(this).attr('aria-expanded') == 'false' ) {
    		$(this).attr('aria-expanded', 'true');
    		$(this).next('.sub-menu').attr('aria-expanded', 'true');
    		$(this).next('.sub-menu').find('li > a').attr('tabindex', '0');
    		$(this).next('.sub-menu').find('.sub-menu-toggle').attr('tabindex', '0');
    	} else {
    		$(this).attr('aria-expanded', 'false');
    		$(this).next('.sub-menu').attr('aria-expanded', 'false');
    		$(this).next('.sub-menu').find('li > a').attr('tabindex', '-1');
    		$(this).next('.sub-menu').find('.sub-menu-toggle').attr('tabindex', '-1');
    	}
    });

    $('.top-level-menu-item.menu-item-has-children > a').removeAttr('href').attr('tabindex', -1);

});