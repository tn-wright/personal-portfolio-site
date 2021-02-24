import { TimelineLite, Back } from "gsap";
import Highway from '@dogstudio/highway';
import SlideUp from './slide-up';
import SlideDown from './slide-down';
import SlideLeft from './slide-left';
import SlideRight from './slide-right';

class Default extends Highway.Transition {
    in({from, to, done, trigger}) {
        
        var t1 = new TimelineLite();
        t1.fromTo(to, {opacity: '0'}, {duration: 0.1, opacity: '1', onComplete: () => {
            from.remove();
            done();
        }});
        
        // if(trigger === 'popstate') {
        //     var toName = to.getAttribute("data-router-view");

        //     if(toName === 'home') {

        //     } else if(toName === 'about') {

        //     } else if(toName === 'projects') {

        //     } else if(toName === 'contact') {

        //     }
        // } else {
            
        
        // }
    }
    out({from, done}) {
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.1, opacity: '0', onComplete: () => {
            done();
        }});
    }
}

export default Default;