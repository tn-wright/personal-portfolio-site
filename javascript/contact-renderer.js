import Highway from '@dogstudio/highway';
import { TimelineLite, Back } from 'gsap';

/**
 * A custom render for the contact page which sets up various functions to handle the contact form
 */
class ContactRenderer extends Highway.Renderer {
    /**
     * After the new page has been loaded, this is called
     */
    onEnterCompleted() {
        //Add the form submit listener
        const form = document.getElementById("contact-form");
        form.addEventListener('submit', event => {
            event.preventDefault();
            this.submitContactForm();
        });

        //add the modal button click listener
        const modalButton = document.getElementById("modal-button");
        modalButton.addEventListener('click', () => {
            this.closeContactModal();
        });
    }

    /**
     * Handler for the form submission
     */
    submitContactForm() {
        //Get element references
        const modal = document.getElementById("contact-success-modal");
        const modalOverlay = document.getElementById("contact-modal-overlay");
    
        //process the form
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subj = document.getElementById("subject").value;
        const msg = document.getElementById("message").value;

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://174.138.50.52:46537", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            name: name,
            email: email,
            subject: subj,
            message: msg
        }));

        const onSuccess = function onSuccessfulSend() {
            if(xhr.status === 200) {
                //fade in the success modal
                this.fadeInModal(modal, modalOverlay);
            } else {
                //TODO: actual error handling
            }
        }

        xhr.onload = onSuccess.bind(this);
    }
    
    /**
     * Close the form success modal
     */
    closeContactModal() {
        //get element references
        const modal = document.getElementById("contact-success-modal");
        const modalOverlay = document.getElementById("contact-modal-overlay");
    
        //Fade out the modal
        this.fadeOutModal(modal, modalOverlay);
    }
    
    /**
     * Fade out the success modal and the overlay
     * 
     * @param {*} modal - the modal div
     * @param {*} modalOverlay - the overlay div
     */
    fadeOutModal(modal, modalOverlay) {
        //animate the fade out
        let timeline = new TimelineLite();
        timeline.to(modal, {opacity: 0, duration: 0.3, ease: Back.easeOut, onComplete: () => {
            //Once the fade is complete, disable pointer events for the now hidden overlay and modal
            modal.style.pointerEvents = 'none';
            modalOverlay.style.pointerEvents = 'none';
        }}).to(modalOverlay, {opacity: 0, duration: 0.3, ease: Back.easeOut}, "-=0.3");
    }
    
    /**
     * Fade in the success modal and the overlay
     * 
     * @param {*} modal - the modal div
     * @param {*} modalOverlay - the overlay div
     */
    fadeInModal(modal, modalOverlay) {
        //Animate the fade in
        let timeline = new TimelineLite();
        timeline.to(modal, {opacity: 1, duration: 0.3, ease: Back.easeOut, onComplete: () => {
            //Whent the fade is complete, enable pointer events for the now visible overlay and modal
            modal.style.pointerEvents = 'auto';
            modalOverlay.style.pointerEvents = 'auto';
        }}).to(modalOverlay, {opacity: 1, duration: 0.3, ease: Back.easeOut}, "-=0.3");
    }
}

export default ContactRenderer