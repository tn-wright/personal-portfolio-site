import { TimelineLite, Back } from "gsap";
import Highway from '@dogstudio/highway';

class Transitioner extends Highway.Transition {

    _slideUp(from, to, done) {
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.4, top: '-100%', ease: Back.easeOut.config(0.8)})
          .fromTo(to, {top: '100%'}, {duration: 0.4, top: '0%', ease: Back.easeOut.config(0.8), onComplete: () => {
            from.remove();
            done();
        }}, "-=0.3");
    }

    _slideDown(from, to, done) {
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.4, top: '100%', ease: Back.easeOut.config(0.8)})
          .fromTo(to, {top: '-100%'}, {duration: 0.4, top: '0%', ease: Back.easeOut.config(0.8), onComplete: () => {
            from.remove();
            done();
        }}, "-=0.3");
    }

    _slideLeft(from, to, done) {
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.4, left: '-100%', ease: Back.easeOut.config(0.8)})
          .fromTo(to, {left: '100%'}, {duration: 0.4, left: '0%', ease: Back.easeOut.config(0.8), onComplete: () => {
            from.remove();
            done();
        }}, "-=0.3");
    }

    _slideRight(from, to, done) {
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.4, left: '100%', ease: Back.easeOut.config(0.8)})
          .fromTo(to, {left: '-100%'}, {duration: 0.4, left: '0%', ease: Back.easeOut.config(0.8), onComplete: () => {
            from.remove();
            done();
        }}, "-=0.3");
    }
    
    _fade(from, to, done) {
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.1, opacity: '0'})
            .fromTo(to, {opacity: '0'}, {duration: 0.1, opacity: '1', onComplete: () => {
            from.remove();
            done();
        }});
    }

    in({from, to, done, trigger}) {

        if(trigger === 'popstate' || (!trigger.classList.contains("hamburger-link") && !trigger.classList.contains("logo-link"))) {
            const toName = to.getAttribute("data-router-view");
            const fromName = from.getAttribute("data-router-view");
            
            const isToHome = toName === "home";
            const isToAbout = toName === "about";
            const isToProjects = toName === "projects";
            const isToContact = toName === "contact";
            
            const isFromHome = fromName === "home";
            const isFromAbout = fromName === "about";
            const isFromProjects = fromName === "projects";
            const isFromContact = fromName === "contact";
            
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
            this._fade(from, to, done)
        }

        
    }
    out({from, done}) {
        done();
    }
}

export default Transitioner;
