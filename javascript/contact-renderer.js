import Highway from '@dogstudio/highway';
import { TimelineLite, Back } from 'gsap';

class ContactRenderer extends Highway.Renderer {
    onEnterCompleted() {
        console.log("On Enter Complete Renderer");
        const form = document.getElementById("contact-form");
        form.addEventListener('submit', event => {
            event.preventDefault();
            this.submitContactForm();
        });

        const modalButton = document.getElementById("modal-button");
        modalButton.addEventListener('click', () => {
            this.closeContactModal();
        });
    }

    submitContactForm() {
        console.log("In submit function");
        const modal = document.getElementById("contact-success-modal");
        const modalOverlay = document.getElementById("contact-modal-overlay");
    
        //TODO: do the form work here
    
        this.fadeInModal(modal, modalOverlay);
    }
    
    closeContactModal() {
        console.log("In close function");
        const modal = document.getElementById("contact-success-modal");
        const modalOverlay = document.getElementById("contact-modal-overlay");
    
        this.fadeOutModal(modal, modalOverlay);
    }
    
    fadeOutModal(modal, modalOverlay) {
        let timeline = new TimelineLite();
        timeline.to(modal, {opacity: 0, duration: 0.3, ease: Back.easeOut, onComplete: () => {
            modal.style.pointerEvents = 'none';
            modalOverlay.style.pointerEvents = 'none';
        }}).to(modalOverlay, {opacity: 0, duration: 0.3, ease: Back.easeOut}, "-=0.3");
    }
    
    fadeInModal(modal, modalOverlay) {
        let timeline = new TimelineLite();
        timeline.to(modal, {opacity: 1, duration: 0.3, ease: Back.easeOut, onComplete: () => {
            modal.style.pointerEvents = 'auto';
            modalOverlay.style.pointerEvents = 'auto';
        }}).to(modalOverlay, {opacity: 1, duration: 0.3, ease: Back.easeOut}, "-=0.3");
    }
}

export default ContactRenderer