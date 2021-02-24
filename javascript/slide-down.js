import { TimelineLite, Back } from "gsap";
import Highway from '@dogstudio/highway';

class SlideDown extends Highway.Transition {
    in({from, to, done}) {
        var t1 = new TimelineLite();
        t1.to(from, {duration: 0.4, top: '-100%', ease: Back.easeOut.config(0.8)})
          .fromTo(to, {top: '100%'}, {duration: 0.4, top: '0%', ease: Back.easeOut.config(0.8), onComplete: () => {
            from.remove();
            done();
        }}, -=0.3);
    }
    out({from, done}) {
        done();
    }
}

export default SlideDown;
