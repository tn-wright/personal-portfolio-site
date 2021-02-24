import { TimelineLite, Back } from "gsap";
import Highway from '@dogstudio/highway';
import SlideUp from './slide-up';
import SlideDown from './slide-down';
import SlideLeft from './slide-left';
import SlideRight from './slide-right';

class Default extends Highway.Transition {
    in({from, to, done, trigger}) {
        if(trigger === 'popstate') {
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
                //up
                SlideUp.in({from, to, done, trigger});
            } else if((isFromHome && isToAbout) || (isFromContact && isToHome)) {
                //right
                SlideRight.in({from, to, done, trigger});
            } else if(isFromProjects && isToHome) {
                //down
                SlideDown.in({from, to, done, trigger});
            } else if((isFromAbout && isToHome) || (isFromHome && isToContact)) {
                //left
                SlideLeft.in({from, to, done, trigger});
            } else {
                //default to fade
                _fade(from, to, done)
            }
        } else {
            _fade(from, to, done)
        }
    }
    out({from, done}) {
        done();
    }
    
    _fade(from, to, done) {
        var t1 = new TimelineLite();
            t1.to(from, {duration: 0.1, opacity: '0'})
              .fromTo(to, {opacity: '0'}, {duration: 0.1, opacity: '1', onComplete: () => {
                from.remove();
                done();
            }});
    }
}

export default Default;
