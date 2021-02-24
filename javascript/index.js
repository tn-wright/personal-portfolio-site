import Highway from '@dogstudio/highway';
import Transitioner from './transitioner';

console.log("hello");

const highwayCore = new Highway.Core({
    transitions: {
        default: Transitioner
    }
});