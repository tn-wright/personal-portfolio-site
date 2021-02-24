import { TimelineLite, Back } from "gsap";
import Highway from '@dogstudio/highway';

class SlideLeft extends Highway.Transition {
    in({from, to, done}) {
        var t1 = new TimelineLite();
        t1.fromTo(to, {left: '100%'}, {duration: 0.4, left: '0%', ease: Back.easeOut.config(0.8), onComplete: () => {
            from.remove();
            done();
        }});
    }
    out({from, done}) {
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.4, left: '-100%', ease: Back.easeOut.config(0.8), onComplete: () => {
            done();
        }});
    }
}

export default SlideLeft;