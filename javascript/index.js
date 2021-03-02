import Highway from '@dogstudio/highway';
import Transitioner from './transitioner';
import ContactRenderer from './contact-renderer';
import { TimelineLite, Back } from 'gsap';
import highway from '@dogstudio/highway';

const highwayCore = new Highway.Core({
    transitions: {
        default: Transitioner
    },
    renderers: {
        contact: ContactRenderer
    }
});
/**
 * Add the on click listener to the hamburger button that determines if it submenu should be loaded or unloaded
 */
function setUpHamburger() {
    const hamburger = document.getElementById("hamburger-button");

    hamburger.onclick = function() {
        hamburger.setAttribute('disabled', true);
        const hamburgerContent = document.getElementById("hamburger-content");
        const opacity = hamburgerContent.style.opacity;
        const navOverlay = document.getElementById("nav-overlay");

        if(opacity === '1') {
            fadeOutHamburgerContent(hamburger, hamburgerContent, navOverlay);
        } else {
            fadeInHamburgerContent(hamburger, hamburgerContent, navOverlay);
        }
    };
}

/**
 * Add an onclick listener to the document to close the nav menu if any click occurs outside of it
 * 
 * @param {MouseEvent} event - The triggering event object
 */
document.onclick = function(event) {
    const hamburger = document.getElementById("hamburger-button");
    const hamburgerContent = document.getElementById("hamburger-content");
    const hamburgerOpacity = hamburgerContent.style.opacity;
    const navOverlay = document.getElementById("nav-overlay");

    if(hamburgerOpacity === '1') {
        event.preventDefault();
        fadeOutHamburgerContent(hamburger, hamburgerContent, navOverlay);
        return;
    }
}

/**
 * An event handling function that find elements and passes them, along with the event object, to trapTabFocus
 * @param {KeyboardEvent} event - the triggering event
 */
function trapTabFocusWrapper(event) {
    const hamburger = document.getElementById("hamburger-button");
    const hamburgerContent = document.getElementById("hamburger-content");
    trapTabFocus(event, hamburger, hamburgerContent);
}

/**
 * Traps tab navigation within the hamburger submenu when it is shown
 * 
 * @param {KeyboardEvent} e - the triggering keypress event
 * @param {HTMLElement} hamburger - the hamburger button element
 * @param {HTMLElement} hamburgerContent - the div that wraps the hamburger submenu
 */
function trapTabFocus(e, hamburger, hamburgerContent) {
    let isTabPressed = e.key === 'Tab';

    //If the key pressed was not tab, return
    if(!isTabPressed) {
        return;
    }

    //Get the elements withing the hamburger submenu and mark the last one as lastFocusableElement
    const tabbableElements = hamburgerContent.querySelectorAll(".hamburger-link");
    const lastFocusableElement = tabbableElements[tabbableElements.length - 1];

    //If shift was held, we need to move backwards
    if(e.shiftKey) {
        if(document.activeElement === hamburger) {
            //If moving backwards from the first element (the hamburger button), go to the last nav element
            lastFocusableElement.focus()
            e.preventDefault();
        }
    } else {
        if(document.activeElement === lastFocusableElement) {
            //If moving forward from the last nav element, wrap around to the beginning
            hamburger.focus();
            e.preventDefault();
        }
    }
}

/**
 * Fade out the hamburger menu and the page overlay, and set the page state back to the defaults
 * 
 * @param {HTMLElement} hamburger - the hamburger button
 * @param {HTMLElement} hamburgerContent - the div containing the hamburger submenu
 * @param {HTMLElement} navOverlay - the overlay div
 */
function fadeOutHamburgerContent(hamburger, hamburgerContent, navOverlay) {
    //animate hamburger menu and the overlay of the rest of the page
    let timeline = new TimelineLite();
    timeline.to(hamburgerContent, {opacity: 0, duration: 0.3, ease: Back.easeOut, onComplete: () => {
        hamburger.removeAttribute('disabled');
        hamburgerContent.style.pointerEvents = 'none';
        navOverlay.style.pointerEvents = 'none';

        //disable tab targetting of navigation menu items since it is gone
        hamburgerContent.querySelectorAll(".hamburger-link").forEach(element => {
            element.setAttribute('tabindex', '-1');
        });

        //remove the tab trapping event listener since the navigation menu is gone
        document.removeEventListener('keydown', trapTabFocusWrapper)
    }}).to(navOverlay, {opacity: 0, duration: 0.3, ease: Back.easeOut}, "-=0.3");
}

/**
 * Fade in the hamburger menu and the page overlay, and set the page state accordingly
 * 
 * @param {HTMLElement} hamburger - the hamburger button
 * @param {HTMLElement} hamburgerContent - the div containing the hamburger submenu
 * @param {HTMLElement} navOverlay - the overlay div
 */
function fadeInHamburgerContent(hamburger, hamburgerContent, navOverlay) {
    //animate hamburger menu and the overlay of the rest of the page
    let timeline = new TimelineLite();
    timeline.to(hamburgerContent, {opacity: 1, duration: 0.3, ease: Back.easeOut, onComplete: () => {
        //Allow pointer events now that content is visible
        hamburgerContent.style.pointerEvents = 'auto';
        navOverlay.style.pointerEvents = 'auto';

        //Allow the navigation items to be tab targetted
        hamburgerContent.querySelectorAll(".hamburger-link").forEach(element => {
            element.setAttribute('tabindex', '0');
        });

        //add the listener to trap tab in the navigation menu
        document.addEventListener('keydown', trapTabFocusWrapper);

        //after all of the animation and setup is complete, re-enable the hamburger button
        hamburger.removeAttribute('disabled');
    }}).to(navOverlay, {opacity: 1, duration: 0.3, ease: Back.easeOut}, "-=0.3");
}

//call the setup funciton
setUpHamburger();

document.addEventListener("DOMContentLoaded", function() {
    //Initialize overlay scrollbars on DOM load
	OverlayScrollbars(document.querySelectorAll("main"), { className: "os-theme-light", scrollbars: { autoHide: "scroll", autoHideDelay: 250} });
})