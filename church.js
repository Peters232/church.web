// Smooth scroll to contact or any section when clicking service buttons

document.querySelectorAll('.btn-secondary').forEach(button => {

    button.addEventListener('click', function (event) {

        event.preventDefault();

        const targetSection = document.querySelector(this.getAttribute('href'));

        targetSection.scrollIntoView({

            behavior: 'smooth',

            block: 'start'

        });

    });

});

// Animation when services come into view (scroll animation)

const serviceItems = document.querySelectorAll('.service-item');

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('animate-service');

        } else {

            entry.target.classList.remove('animate-service');

        }

    });

}, {

    threshold: 0.3

});

serviceItems.forEach(item => {

    observer.observe(item);

});

// Function to initialize countdown for events

function initializeCountdown(eventDate, countdownElement) {

    const targetDate = new Date(eventDate).getTime();

    // Update the countdown every 1 second

    const countdownInterval = setInterval(function () {

        const now = new Date().getTime();

        const timeLeft = targetDate - now;

        // Time calculations for days, hours, minutes, and seconds

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Display the result in the countdown element

        countdownElement.innerHTML = `In ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;

        // If the countdown is over, display "Event has started!"

        if (timeLeft < 0) {

            clearInterval(countdownInterval);

            countdownElement.innerHTML = "Event has started!";

        }

    }, 1000);

}

// Function to set up countdown for all events

function setupEventCountdowns() {

    const events = document.querySelectorAll('.event-item');

    

    events.forEach(event => {

        const eventDate = event.getAttribute('data-event-date'); // The date of the event (e.g., "2024-10-01")

        const countdownElement = event.querySelector('.event-countdown'); // The countdown element in the event card

        // Initialize countdown if event date is provided

        if (eventDate && countdownElement) {

            initializeCountdown(eventDate, countdownElement);

        }

    });

}

// Run the function on page load

document.addEventListener('DOMContentLoaded', setupEventCountdowns);

// Optional: You can add dynamic content based on the time of day for the user

const timeBasedMessage = () => {

    const hours = new Date().getHours();

    let greetingMessage;

    if (hours < 12) {

        greetingMessage = "Good morning! Start your day with Sunday Worship.";

    } else if (hours < 18) {

        greetingMessage = "Good afternoon! Join us for Midweek Bible Study.";

    } else {

        greetingMessage = "Good evening! Explore our community outreach opportunities.";

    }

    document.querySelector('.services-section .section-description').textContent = greetingMessage;

};

const testimonials = document.querySelectorAll('.testimonial-item');

let currentIndex = 0;

// Show the first testimonial

testimonials[currentIndex].classList.add('active');

document.querySelector('.next-btn').addEventListener('click', () => {

    testimonials[currentIndex].classList.remove('active');

    currentIndex = (currentIndex + 1) % testimonials.length;

    testimonials[currentIndex].classList.add('active');

});

document.querySelector('.prev-btn').addEventListener('click', () => {

    testimonials[currentIndex].classList.remove('active');

    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;

    testimonials[currentIndex].classList.add('active');

});

// JavaScript for Contact Form Validation and AJAX Submission

document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('form');

    const nameInput = document.getElementById('name');

    const emailInput = document.getElementById('email');

    const subjectInput = document.getElementById('subject');

    const messageInput = document.getElementById('message');

    

    form.addEventListener('submit', function (e) {

        e.preventDefault();

        // Clear any previous errors

        clearErrors();

        // Validate form inputs

        if (validateForm()) {

            // If form is valid, send data using AJAX

            sendFormData();

        }

    });

    function validateForm() {

        let isValid = true;

        

        // Name validation

        if (nameInput.value.trim() === '') {

            showError(nameInput, 'Name is required');

            isValid = false;

        }

        // Email validation

        if (emailInput.value.trim() === '') {

            showError(emailInput, 'Email is required');

            isValid = false;

        } else if (!isValidEmail(emailInput.value.trim())) {

            showError(emailInput, 'Please enter a valid email');

            isValid = false;

        }

        // Subject validation

        if (subjectInput.value.trim() === '') {

            showError(subjectInput, 'Subject is required');

            isValid = false;

        }

        // Message validation

        if (messageInput.value.trim() === '') {

            showError(messageInput, 'Message is required');

            isValid = false;

        }

        return isValid;

    }

    function showError(input, message) {

        const errorDiv = document.createElement('div');

        errorDiv.className = 'error-message';

        errorDiv.textContent = message;

        input.parentElement.appendChild(errorDiv);

        input.classList.add('error');

    }

    function clearErrors() {

        document.querySelectorAll('.error-message').forEach(error => error.remove());

        document.querySelectorAll('.error').forEach(input => input.classList.remove('error'));

    }

    function isValidEmail(email) {

        // Basic email pattern validation

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }

    function sendFormData() {

        const formData = new FormData(form);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'your-server-endpoint', true); // Update 'your-server-endpoint' with the actual URL

        

        xhr.onload = function () {

            if (xhr.status === 200) {

                // Success message after form submission

                showSuccess('Thank you for contacting us! We will get back to you soon.');

                form.reset(); // Reset form after successful submission

            } else {

                // Error message on failure

                showErrorForm('Oops! Something went wrong. Please try again.');

            }

        };

        xhr.send(formData);

    }

    function showSuccess(message) {

        const successDiv = document.createElement('div');

        successDiv.className = 'success-message';

        successDiv.textContent = message;

        form.appendChild(successDiv);

    }

    function showErrorForm(message) {

        const errorDiv = document.createElement('div');

        errorDiv.className = 'error-message';

        errorDiv.textContent = message;

        form.appendChild(errorDiv);

    }

});

document.addEventListener('DOMContentLoaded', function() {

    const newsletterForm = document.querySelector('.newsletter-form');

    const emailInput = newsletterForm.querySelector('input');

    newsletterForm.addEventListener('submit', function(e) {

        e.preventDefault();

        

        if (validateEmail(emailInput.value.trim())) {

            alert('Thank you for subscribing!');

            newsletterForm.reset(); // Clear the input after successful subscription

        } else {

            alert('Please enter a valid email address.');

        }

    });

    function validateEmail(email) {

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }

});

// Call the function when the page loads

window.addEventListener('load', timeBasedMessage);