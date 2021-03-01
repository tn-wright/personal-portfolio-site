import Highway from '@dogstudio/highway';
import Transitioner from './transitioner';
import ContactRenderer from './contact-renderer';
import { TimelineLite, Back } from 'gsap';

const highwayCore = new Highway.Core({
    transitions: {
        default: Transitioner
    },
    renderers: {
        contact: ContactRenderer
    }
});

function setUpHamburger() {
    const hamburger = document.getElementById("hamburger-button");

    hamburger.onclick = function() {
        hamburger.setAttribute('disabled', true);
        const hamburgerContent = document.getElementById("hamburger-content");
        const opacity = hamburgerContent.style.opacity;
        const navOverlay = document.getElementById("nav-overlay");
        console.log(opacity);

        if(opacity === '1') {
            fadeOutHamburgerContent(hamburger, hamburgerContent, navOverlay);
        } else {
            fadeInHamburgerContent(hamburger, hamburgerContent, navOverlay);
        }
    };
}

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

function trapTabFocusWrapper(event) {
    console.log("In trapTabFocusWrapper");
    const hamburger = document.getElementById("hamburger-button");
    const hamburgerContent = document.getElementById("hamburger-content");
    trapTabFocus(event, hamburger, hamburgerContent);
}

function trapTabFocus(e, hamburger, hamburgerContent) {

    console.log("In trapTabFocus");

    let isTabPressed = e.key === 'Tab';

    if(!isTabPressed) {
        return;
    }

    const tabbableElements = hamburgerContent.querySelectorAll(".hamburger-link");
    const lastFocusableElement = tabbableElements[tabbableElements.length - 1];

    if(e.shiftKey) {
        if(document.activeElement === hamburger) {
            lastFocusableElement.focus()
            e.preventDefault();
        }
    } else {
        if(document.activeElement === lastFocusableElement) {
            hamburger.focus();
            e.preventDefault();
        }
    }
}

function fadeOutHamburgerContent(hamburger, hamburgerContent, navOverlay) {
    let timeline = new TimelineLite();
    timeline.to(hamburgerContent, {opacity: 0, duration: 0.3, ease: Back.easeOut, onComplete: () => {
        hamburger.removeAttribute('disabled');
        hamburgerContent.style.pointerEvents = 'none';
        navOverlay.style.pointerEvents = 'none';

        hamburgerContent.querySelectorAll(".hamburger-link").forEach(element => {
            element.setAttribute('tabindex', '-1');
        });

        document.removeEventListener('keydown', trapTabFocusWrapper)
    }}).to(navOverlay, {opacity: 0, duration: 0.3, ease: Back.easeOut}, "-=0.3");
}

function fadeInHamburgerContent(hamburger, hamburgerContent, navOverlay) {
    let timeline = new TimelineLite();
    timeline.to(hamburgerContent, {opacity: 1, duration: 0.3, ease: Back.easeOut, onComplete: () => {
        hamburgerContent.style.pointerEvents = 'auto';
        navOverlay.style.pointerEvents = 'auto';

        hamburgerContent.querySelectorAll(".hamburger-link").forEach(element => {
            element.setAttribute('tabindex', '0');
        });

        document.addEventListener('keydown', trapTabFocusWrapper);
        hamburger.removeAttribute('disabled');
    }}).to(navOverlay, {opacity: 1, duration: 0.3, ease: Back.easeOut}, "-=0.3");
}

setUpHamburger();

document.addEventListener("DOMContentLoaded", function() {
    //The first argument are the elements to which the plugin shall be initialized
	//The second argument has to be at least a empty object or a object with your desired options
	OverlayScrollbars(document.querySelectorAll("main"), { className: "os-theme-light", scrollbars: { autoHide: "scroll", autoHideDelay: 250} });
})