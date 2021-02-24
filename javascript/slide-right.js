import { TimelineLite, Back } from "gsap";
import Highway from '@dogstudio/highway';

class SlideRight extends Highway.Transition {
    in({from, to, done}) {
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.4, left: '100%', ease: Back.easeOut.config(0.8)})
          .fromTo(to, {left: '-100%'}, {duration: 0.4, left: '0%', ease: Back.easeOut.config(0.8), onComplete: () => {
            from.remove();
            done();
        }}, -= 0.3);
    }
    out({from, done}) {
        done();
    }
}

export default SlideRight;
