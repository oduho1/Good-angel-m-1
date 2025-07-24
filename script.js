// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Testimonials Slider
document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonials slider if it exists
    const testimonialsSection = document.getElementById('testimonials-section');
    if (testimonialsSection) {
        const testimonials = testimonialsSection.querySelectorAll('.grid > div');
        const prevButton = testimonialsSection.querySelector('.ri-arrow-left-s-line').parentElement;
        const nextButton = testimonialsSection.querySelector('.ri-arrow-right-s-line').parentElement;
        
        let currentIndex = 0;
        
        // Function to update testimonials display
        function updateTestimonials() {
            // For mobile view, show only the current testimonial
            if (window.innerWidth < 768) {
                testimonials.forEach((testimonial, index) => {
                    if (index === currentIndex) {
                        testimonial.classList.remove('hidden');
                        testimonial.classList.add('animate-fadeIn');
                    } else {
                        testimonial.classList.add('hidden');
                        testimonial.classList.remove('animate-fadeIn');
                    }
                });
            } else {
                // For desktop view, show all testimonials
                testimonials.forEach(testimonial => {
                    testimonial.classList.remove('hidden');
                });
            }
        }
        
        // Initialize display
        updateTestimonials();
        
        // Add event listeners for navigation
        prevButton.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
                updateTestimonials();
            }
        });
        
        nextButton.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                currentIndex = (currentIndex + 1) % testimonials.length;
                updateTestimonials();
            }
        });
        
        // Update on window resize
        window.addEventListener('resize', updateTestimonials);
    }
});

// Donation Amount Selection
function selectDonationAmount(amount, buttonElement) {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.donation-amount-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    
    // Add active class to selected button
    buttonElement.classList.remove('bg-gray-100', 'text-gray-700');
    buttonElement.classList.add('bg-primary', 'text-white');
    
    // Update hidden input with selected amount
    const amountInput = document.getElementById('donation-amount');
    if (amountInput) {
        amountInput.value = amount;
    }
    
    // If custom amount, focus on the input
    if (amount === 'custom') {
        const customInput = document.getElementById('custom-amount');
        if (customInput) {
            customInput.focus();
        }
    }
}

// Custom Radio Button Styling
function selectRadioOption(inputElement) {
    const container = inputElement.closest('.radio-group');
    if (container) {
        const options = container.querySelectorAll('.radio-option');
        options.forEach(option => {
            option.classList.remove('border-primary');
            option.classList.add('border-gray-200');
        });
        
        const selectedOption = inputElement.closest('.radio-option');
        if (selectedOption) {
            selectedOption.classList.remove('border-gray-200');
            selectedOption.classList.add('border-primary');
        }
    }
}

// Animate Stats on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statNumbers = statsSection.querySelectorAll('.stat-number');
        
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Function to animate counting
        function animateCount(element, target) {
            let current = 0;
            const duration = 2000; // 2 seconds
            const step = Math.ceil(target / (duration / 16)); // 60fps
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = current;
                }
            }, 16);
        }
        
        // Check if stats are in viewport and animate
        function checkStats() {
            if (isInViewport(statsSection)) {
                statNumbers.forEach(stat => {
                    if (!stat.classList.contains('animated')) {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateCount(stat, target);
                        stat.classList.add('animated');
                    }
                });
                // Remove scroll listener once animated
                window.removeEventListener('scroll', checkStats);
            }
        }
        
        // Add scroll listener
        window.addEventListener('scroll', checkStats);
        // Check on load as well
        checkStats();
    }
});

// Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const phrases = JSON.parse(typewriterElement.getAttribute('data-phrases') || '[]');
        if (phrases.length > 0) {
            let currentPhraseIndex = 0;
            let currentCharIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;
            
            function typeWriter() {
                const currentPhrase = phrases[currentPhraseIndex];
                
                if (isDeleting) {
                    // Deleting text
                    typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    typingSpeed = 50; // Faster when deleting
                } else {
                    // Typing text
                    typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                    typingSpeed = 100; // Normal speed when typing
                }
                
                // If completed typing the phrase
                if (!isDeleting && currentCharIndex === currentPhrase.length) {
                    isDeleting = true;
                    typingSpeed = 1000; // Pause at the end
                }
                
                // If completed deleting the phrase
                if (isDeleting && currentCharIndex === 0) {
                    isDeleting = false;
                    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                    typingSpeed = 500; // Pause before typing next phrase
                }
                
                setTimeout(typeWriter, typingSpeed);
            }
            
            // Start the typewriter effect
            typeWriter();
        }
    }
});

// Gallery Filter
function filterGallery(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('bg-primary', 'text-white');
            btn.classList.remove('bg-gray-100', 'text-gray-700');
        } else {
            btn.classList.remove('bg-primary', 'text-white');
            btn.classList.add('bg-gray-100', 'text-gray-700');
        }
    });
    
    // Filter gallery items
    galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
            setTimeout(() => {
                item.classList.remove('opacity-0');
                item.classList.add('opacity-100');
            }, 50);
        } else {
            item.classList.add('opacity-0');
            setTimeout(() => {
                item.classList.add('hidden');
            }, 300);
        }
    });
}

// Newsletter Subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('newsletter-success');
    
    if (emailInput && emailInput.value) {
        // Disable form elements during submission
        emailInput.disabled = true;
        submitButton.disabled = true;
        
        // Simulate API call (in a real app, this would be an actual API call)
        setTimeout(() => {
            // Show success message
            if (successMessage) {
                successMessage.classList.remove('hidden');
            }
            
            // Reset form
            emailInput.value = '';
            emailInput.disabled = false;
            submitButton.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.classList.add('hidden');
                }
            }, 5000);
        }, 1000);
    }
}