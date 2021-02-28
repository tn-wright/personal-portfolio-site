import Highway from '@dogstudio/highway';
import Transitioner from './transitioner';
import { TimelineLite, Back } from 'gsap';

const highwayCore = new Highway.Core({
    transitions: {
        default: Transitioner
    }
});

function setUpHamburger() {
    const hamburger = document.getElementById("hamburger-button");

    hamburger.onclick = function() {
        hamburger.setAttribute('disabled', true);
        const hamburgerContent = document.getElementById("hamburger-content");
        const opacity = hamburgerContent.style.opacity;
        const dimmingOverlay = document.getElementById("dim-overlay");
        console.log(opacity);

        if(opacity === '1') {
            fadeOutHamburgerContent(hamburger, hamburgerContent, dimmingOverlay);
        } else {
            fadeInHamburgerContent(hamburger, hamburgerContent, dimmingOverlay);
        }
    };
}

document.onclick = function(event) {
    const hamburger = document.getElementById("hamburger-button");
    const hamburgerContent = document.getElementById("hamburger-content");
    const opacity = hamburgerContent.style.opacity;
    const dimmingOverlay = document.getElementById("dim-overlay");

    if(opacity === '1') {
        event.preventDefault();
        fadeOutHamburgerContent(hamburger, hamburgerContent, dimmingOverlay);
        return;
    }
}

function fadeOutHamburgerContent(hamburger, hamburgerContent, dimmingOverlay) {
    let timeline = new TimelineLite();
    timeline.to(hamburgerContent, {opacity: 0, duration: 0.3, ease: Back.easeOut, onComplete: () => {
        hamburger.removeAttribute('disabled');
        hamburgerContent.style.pointerEvents = 'none';
        dimmingOverlay.style.pointerEvents = 'none';
    }}).to(dimmingOverlay, {opacity: 0, duration: 0.3, ease: Back.easeOut}, "-=0.3");
}

function fadeInHamburgerContent(hamburger, hamburgerContent, dimmingOverlay) {
    let timeline = new TimelineLite();
    timeline.to(hamburgerContent, {opacity: 1, duration: 0.3, ease: Back.easeOut, onComplete: () => {
        hamburger.removeAttribute('disabled');
        hamburgerContent.style.pointerEvents = 'auto';
        dimmingOverlay.style.pointerEvents = 'auto';
    }}).to(dimmingOverlay, {opacity: 1, duration: 0.3, ease: Back.easeOut}, "-=0.3");
}

setUpHamburger();

document.addEventListener("DOMContentLoaded", function() {
    //The first argument are the elements to which the plugin shall be initialized
	//The second argument has to be at least a empty object or a object with your desired options
	OverlayScrollbars(document.querySelectorAll("body"), { className: "os-theme-light", scrollbars: { autoHide: "scroll", autoHideDelay: 250} });
})