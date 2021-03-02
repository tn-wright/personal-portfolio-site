import { TimelineLite, Back } from "gsap";
import Highway from '@dogstudio/highway';

/**
 * The transitioner for the website that determines which animations to use based on the pages
 * involved in the transition.
 */
class Transitioner extends Highway.Transition {

    /**
     * Slide the page elements up, transition from "from" to "to", calling done when finished
     * 
     * @param {*} from - the section we are navigation from
     * @param {*} to - the section we are navigating to
     * @param {*} done - the done callback
     */
    _slideUp(from, to, done) {
        this._scrollToTop();
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.4, top: '-100%', ease: Back.easeOut.config(0.8)})
          .fromTo(to, {top: '100%'}, {duration: 0.4, top: '0%', ease: Back.easeOut.config(0.8), onComplete: () => {
            from.remove();
            done();
        }}, "-=0.3");
    }

    /**
     * Slide the page elements down, transition from "from" to "to", calling done when finished
     * 
     * @param {*} from - the section we are navigation from
     * @param {*} to - the section we are navigating to
     * @param {*} done - the done callback
     */
    _slideDown(from, to, done) {
        this._scrollToTop();
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.4, top: '100%', ease: Back.easeOut.config(0.8)})
          .fromTo(to, {top: '-100%'}, {duration: 0.4, top: '0%', ease: Back.easeOut.config(0.8), onComplete: () => {
            from.remove();
            done();
        }}, "-=0.3");
    }

    /**
     * Slide the page elements left, transition from "from" to "to", calling done when finished
     * 
     * @param {*} from - the section we are navigation from
     * @param {*} to - the section we are navigating to
     * @param {*} done - the done callback
     */
    _slideLeft(from, to, done) {
        this._scrollToTop();
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.4, left: '-100%', ease: Back.easeOut.config(0.8)})
          .fromTo(to, {left: '100%'}, {duration: 0.4, left: '0%', ease: Back.easeOut.config(0.8), onComplete: () => {
            from.remove();
            done();
        }}, "-=0.3");
    }

    /**
     * Slide the page elements right, transition from "from" to "to", calling done when finished
     * 
     * @param {*} from - the section we are navigation from
     * @param {*} to - the section we are navigating to
     * @param {*} done - the done callback
     */
    _slideRight(from, to, done) {
        this._scrollToTop();
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.4, left: '100%', ease: Back.easeOut.config(0.8)})
          .fromTo(to, {left: '-100%'}, {duration: 0.4, left: '0%', ease: Back.easeOut.config(0.8), onComplete: () => {
            from.remove();
            done();
        }}, "-=0.3");
    }
    
    /**
     * cross fade the page elements, transition from "from" to "to", calling done when finished
     * 
     * @param {*} from - the section we are navigation from
     * @param {*} to - the section we are navigating to
     * @param {*} done - the done callback
     */
    _fade(from, to, done) {
        this._scrollToTop();
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.1, opacity: '0'})
            .fromTo(to, {opacity: '0'}, {duration: 0.1, opacity: '1', onComplete: () => {
            from.remove();
            done();
        }});
    }

    /**
     * Reset the scroll to the top of the page
     */
    _scrollToTop() {
        if('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        window.scrollTo(0,0);
    }

    /**
     * Called when transitioning into a page
     * 
     * @param {*} from - the section being transitioned from
     * @param {*} to - the section being transitioned to
     * @param {*} done - the done callback
     * @param {*} trigger - The trigger of the transition
     */
    in({from, to, done, trigger}) {
        //If the transition was triggered by the back/forward buttons or one a link not in the nav bar
        if(trigger === 'popstate' || (!trigger.classList.contains("hamburger-link") && !trigger.classList.contains("logo-link"))) {
            //get the names of the to and from sections
            const toName = to.getAttribute("data-router-view");
            const fromName = from.getAttribute("data-router-view");
            
            //Create booleans regarding the to namme
            const isToHome = toName === "home";
            const isToAbout = toName === "about";
            const isToProjects = toName === "projects";
            const isToContact = toName === "contact";
            
            //create booleans regarding the from name
            const isFromHome = fromName === "home";
            const isFromAbout = fromName === "about";
            const isFromProjects = fromName === "projects";
            const isFromContact = fromName === "contact";
            
            //determine the animation based on the to and from pages
            if(isFromHome && isToProjects) {
                this._slideUp(from, to, done);
            } else if((isFromHome && isToAbout) || (isFromContact && isToHome)) {
                //right
                this._slideRight(from, to, done);
            } else if(isFromProjects && isToHome) {
                //down
                this._slideDown(from, to, done);
            } else if((isFromAbout && isToHome) || (isFromHome && isToContact)) {
                //left
                this._slideLeft(from, to, done);
            } else {
                //default to fade
                this._fade(from, to, done)
            }
        } else {
            //If the transition was trigger by anything in the nav bar or an unknown source, default to the crossfade
            this._fade(from, to, done)
        }

        
    }

    /**
     * Called when the page is being left
     * @param {*} from - the section being left
     * @param {*} done - the done callback 
     */
    out({from, done}) {
        //All animations are done in the "in" method, so just call the done callback and return
        done();
    }
}

export default Transitioner;
