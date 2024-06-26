import Highway from "@dogstudio/highway";
import Transitioner from "./transitioner";
import { gsap } from "gsap";

const websiteDomainWithScheme = process.env.WEBSITE_DOMAIN_WITH_SCHEMA;

const highwayCore = new Highway.Core({
  transitions: {
    default: Transitioner,
  },
});
/**
 * Add the on click listener to the hamburger button that determines if the submenu should be loaded or unloaded
 */
function setUpHamburger() {
  const hamburger = document.getElementById("hamburger-button");

  hamburger.onclick = function () {
    hamburger.setAttribute("disabled", true);
    const hamburgerContent = document.getElementById("hamburger-content");
    const opacity = hamburgerContent.style.opacity;
    const navOverlay = document.getElementById("nav-overlay");

    if (opacity === "1") {
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
document.onclick = function (event) {
  const hamburger = document.getElementById("hamburger-button");
  const hamburgerContent = document.getElementById("hamburger-content");
  const hamburgerOpacity = hamburgerContent.style.opacity;
  const navOverlay = document.getElementById("nav-overlay");

  //Immediately exit this function and perform a normal click if we are clicking one of the nav icons
  //  We want to preserve their functionality in all cases, even if the hamburger is open
  if (
    event.target.classList.contains("social-link") ||
    event.target.classList.contains("svg-hover") ||
    event.target.classList.contains("svg-color-hover")
  ) {
    return;
  }

  if (hamburgerOpacity === "1") {
    event.preventDefault();
    fadeOutHamburgerContent(hamburger, hamburgerContent, navOverlay);
    return;
  }
};

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
  let isTabPressed = e.key === "Tab";

  //If the key pressed was not tab, return
  if (!isTabPressed) {
    return;
  }

  //Get the elements withing the hamburger submenu and mark the last one as lastFocusableElement
  const tabbableElements = hamburgerContent.querySelectorAll(".hamburger-link");
  const lastFocusableElement = tabbableElements[tabbableElements.length - 1];

  //If shift was held, we need to move backwards
  if (e.shiftKey) {
    if (document.activeElement === hamburger) {
      //If moving backwards from the first element (the hamburger button), go to the last nav element
      lastFocusableElement.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastFocusableElement) {
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
  let timeline = new gsap.timeline();
  timeline
    .to(hamburgerContent, {
      opacity: 0,
      duration: 0.3,
      ease: "back.out()",
      onComplete: () => {
        hamburger.removeAttribute("disabled");
        hamburgerContent.style.pointerEvents = "none";
        navOverlay.style.pointerEvents = "none";

        //disable tab targetting of navigation menu items since it is gone
        hamburgerContent
          .querySelectorAll(".hamburger-link")
          .forEach((element) => {
            element.setAttribute("tabindex", "-1");
          });

        //remove the tab trapping event listener since the navigation menu is gone
        document.removeEventListener("keydown", trapTabFocusWrapper);
      },
    })
    .to(navOverlay, { opacity: 0, duration: 0.3, ease: "back.out()" }, "-=0.3");
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
  let timeline = new gsap.timeline();
  timeline
    .to(hamburgerContent, {
      opacity: 1,
      duration: 0.3,
      ease: "back.out()",
      onComplete: () => {
        //Allow pointer events now that content is visible
        hamburgerContent.style.pointerEvents = "auto";
        navOverlay.style.pointerEvents = "auto";

        //Allow the navigation items to be tab targetted
        hamburgerContent
          .querySelectorAll(".hamburger-link")
          .forEach((element) => {
            element.setAttribute("tabindex", "0");
          });

        //add the listener to trap tab in the navigation menu
        document.addEventListener("keydown", trapTabFocusWrapper);

        //after all of the animation and setup is complete, re-enable the hamburger button
        hamburger.removeAttribute("disabled");
      },
    })
    .to(navOverlay, { opacity: 1, duration: 0.3, ease: "back.out()" }, "-=0.3");
}

/**
 * Move a page to the left using Highway
 */
global.movePageLeft = function movePageLeft() {
  var linkElement;
  var locationString = window.location.href;

  console.log("Moving page left");

  if (locationString === websiteDomainWithScheme + "portfolio.html") {
    var element = document.getElementById("aboutLink");
    highwayCore.redirect(
      websiteDomainWithScheme + "about.html",
      false,
      element
    );
  } else if (locationString === websiteDomainWithScheme + "about.html") {
    var element = document.getElementById("indexLink");
    highwayCore.redirect(websiteDomainWithScheme, false, element);
  } else if (
    locationString === websiteDomainWithScheme ||
    locationString === websiteDomainWithScheme + "index.html"
  ) {
    var element = document.getElementById("portfolioLink");
    highwayCore.redirect(
      websiteDomainWithScheme + "portfolio.html",
      false,
      element
    );
  }
};

/**
 * Move a page to the right using Highway
 */
global.movePageRight = function movePageRight() {
  var linkElement;
  var locationString = window.location.href;

  console.log("Moving page right");
  console.log(locationString);
  console.log(websiteDomainWithScheme);

  if (locationString === websiteDomainWithScheme + "about.html") {
    var element = document.getElementById("portfolioLink");
    highwayCore.redirect(
      websiteDomainWithScheme + "portfolio.html",
      false,
      element
    );
  } else if (locationString === websiteDomainWithScheme + "portfolio.html") {
    var element = document.getElementById("indexLink");
    highwayCore.redirect(websiteDomainWithScheme, false, element);
  } else if (
    locationString === websiteDomainWithScheme ||
    locationString === websiteDomainWithScheme + "index.html"
  ) {
    var element = document.getElementById("aboutLink");
    highwayCore.redirect(
      websiteDomainWithScheme + "about.html",
      false,
      element
    );
  }
};

//call the setup funciton for the hamburger menu
setUpHamburger();

//Configure the OverlayScrollbars library
document.addEventListener("DOMContentLoaded", function () {
  //Initialize overlay scrollbars on DOM load
  OverlayScrollbars(document.querySelectorAll("main"), {
    className: "os-theme-light",
    scrollbars: { autoHide: "scroll", autoHideDelay: 250 },
  });
});

var keyBuffer = []; //Holds key presses for the konami code
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
  "Enter",
];
const konamiKeySet = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "a",
  "b",
  "Enter",
];

/**
 * Processs key presses to determine in the konami code has been entered
 *
 * @param {String} key - A key code for a pressed key
 */
function checkForKonamiCode(key) {
  console.log("Konami: " + key);
  //Add newest key press to the key buffer
  keyBuffer.push(key);
  if (keyBuffer.length > 11) {
    keyBuffer.shift();
  }

  //Check each key against the corresponding entry in the code
  for (let i = 0; i < konamiCode.length; i++) {
    if (keyBuffer[i] !== konamiCode[i]) {
      return;
    }
  }

  //Clear the buffer
  keyBuffer = [];

  //Animation settings
  const konamiSlide = [{ transform: "translate(0%, 250%)" }];
  const konamiTiming = { duration: 3000, iterations: 1 };

  //Animate the secret
  let konamiContainer = document.getElementById("konamiContainer");
  konamiContainer.animate(konamiSlide, konamiTiming);
}

/**
 * Change the currently loaded page, useing Highway, based on the pressed key
 *
 * @param {String} key - A key code for a pressed key
 */
function changePageFromKey(key) {
  console.log("Changing Page: " + key);
  if (key === "ArrowRight") {
    movePageRight();
  } else if (key === "ArrowLeft") {
    movePageLeft();
  }
}

//Add event listener for keydown, to handle changing pages with arrow keys
document.addEventListener("keyup", (event) => {
  let pressedKey = event.key;
  console.log(pressedKey);

  if (konamiKeySet.includes(pressedKey)) {
    checkForKonamiCode(pressedKey);
  } else {
    //If something not part of the code is pressed, reset the progress on the code
    keyBuffer = [];
  }

  //Left and right arrow keys can be used to change the page
  if (pressedKey === "ArrowRight" || pressedKey === "ArrowLeft") {
    changePageFromKey(pressedKey);
  }
});
