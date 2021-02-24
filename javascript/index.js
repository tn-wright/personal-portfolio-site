import Highway from '@dogstudio/highway';
import SlideUp from './slide-up';
import SlideDown from './slide-down';
import SlideLeft from './slide-left';
import SlideRight from './slide-right';
import Default from './default';

console.log("hello");

const highwayCore = new Highway.Core({
    transitions: {
        default: Default,
        contextual: {
            slideUp: SlideUp,
            slideLeft: SlideLeft,
            slideRight: SlideRight,
            slideDown: SlideDown
        }
    }
});