/**
 * Express Builders Ltd. — Main JavaScript
 * Handles: Header/Footer injection, Mobile Menu, Form Validation, Animations
 */

document.addEventListener('DOMContentLoaded', function() {

    // =============================================
    // 1. INJECT HEADER & FOOTER
    // =============================================

    const headerHTML = `
        <div class="container">
            <div class="logo">
                <h1>Express <span>Builders</span> Ltd.</h1>
                <p>Real Estate &amp; Infrastructure Development</p>
            </div>
            <button class="menu-toggle" id="menuToggle" aria-label="Toggle Menu">
                <i class="fas fa-bars"></i>
            </button>
            <nav id="mainNav">
                <ul>
                    <li><a href="index.html" class="${window.location.pathname.includes('index') || window.location.pathname === '/' ? 'active' : ''}">Home</a></li>
                    <li><a href="about.html" class="${window.location.pathname.includes('about') ? 'active' : ''}">About</a></li>
                    <li><a href="projects.html" class="${window.location.pathname.includes('projects') ? 'active' : ''}">Projects</a></li>
                    <li><a href="contact.html" class="${window.location.pathname.includes('contact') ? 'active' : ''}">Contact</a></li>
                </ul>
            </nav>
            <div class="header-contact" id="headerContact">
                <a href="https://wa.me/919572265634" target="_blank" class="whatsapp-link">
                    <i class="fab fa-whatsapp"></i> +91 9572665634
                </a>
                <span style="opacity:0.6; font-size:13px;">|</span>
                <span style="font-size:13px; opacity:0.8;">info@expressbuilderltd.com</span>
            </div>
        </div>
    `;

    const footerHTML = `
        <div class="container">
            <p>&copy; 2026 <strong>Express Builders Ltd.</strong> — All rights reserved.</p>
            <div class="footer-links">
                <a href="index.html">Home</a>
                <a href="about.html">About</a>
                <a href="projects.html">Projects</a>
                <a href="contact.html">Contact</a>
            </div>
            <p>
                📍 Wardha, Maharashtra &nbsp;|&nbsp;
                📧 <a href="mailto:info@expressbuilderltd.com">info@expressbuilderltd.com</a> &nbsp;|&nbsp;
                📱 <a href="https://wa.me/919572265634" target="_blank">WhatsApp</a>
            </p>
        </div>
    `;

    // Inject header and footer
    const headerEl = document.getElementById('header');
    const footerEl = document.getElementById('footer');
    if (headerEl) headerEl.innerHTML = headerHTML;
    if (footerEl) footerEl.innerHTML = footerHTML;


    // =============================================
    // 2. MOBILE MENU TOGGLE
    // =============================================

    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    const headerContact = document.getElementById('headerContact');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            if (headerContact) headerContact.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }


    // =============================================
    // 3. STAT COUNTER ANIMATION (Home Page)
    // =============================================

    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const animateStats = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                if (isNaN(target)) return;
                let current = 0;
                const increment = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = current + (target === 100 ? '%' : '+');
                }, 30);
            });
        };

        // Trigger when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const statsSection = document.querySelector('.stats');
        if (statsSection) observer.observe(statsSection);
    }


    // =============================================
    // 4. PROJECT FILTER (Projects Page)
    // =============================================

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.4s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }


    // =============================================
    // 5. CONTACT FORM VALIDATION (Contact Page)
    // =============================================

    const form = document.getElementById('contactForm');
    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');
        const charCounter = document.getElementById('charCounter');
        const submitBtn = document.getElementById('submitBtn');
        const successOverlay = document.getElementById('successOverlay');
        const closeSuccess = document.getElementById('closeSuccess');

        // --- Validation Functions ---
        const validateName = () => {
            const val = nameInput.value.trim();
            if (val.length < 2) {
                nameError.textContent = 'Name must be at least 2 characters.';
                nameInput.parentElement.classList.add('error');
                return false;
            }
            nameError.textContent = '';
            nameInput.parentElement.classList.remove('error');
            return true;
        };

        const validateEmail = () => {
            const val = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(val)) {
                emailError.textContent = 'Please enter a valid email address.';
                emailInput.parentElement.classList.add('error');
                return false;
            }
            emailError.textContent = '';
            emailInput.parentElement.classList.remove('error');
            return true;
        };

        const validatePhone = () => {
            const val = phoneInput.value.trim();
            if (val === '') {
                phoneError.textContent = '';
                phoneInput.parentElement.classList.remove('error');
                return true; // Optional field
            }
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(val)) {
                phoneError.textContent = 'Phone must be exactly 10 digits.';
                phoneInput.parentElement.classList.add('error');
                return false;
            }
            phoneError.textContent = '';
            phoneInput.parentElement.classList.remove('error');
            return true;
        };

        const validateSubject = () => {
            const val = subjectInput.value;
            if (val === '') {
                subjectError.textContent = 'Please select a subject.';
                subjectInput.parentElement.classList.add('error');
                return false;
            }
            subjectError.textContent = '';
            subjectInput.parentElement.classList.remove('error');
            return true;
        };

        const validateMessage = () => {
            const val = messageInput.value.trim();
            if (val.length < 20) {
                messageError.textContent = 'Message must be at least 20 characters.';
                messageInput.parentElement.classList.add('error');
                return false;
            }
            messageError.textContent = '';
            messageInput.parentElement.classList.remove('error');
            return true;
        };

        // --- Real-time Validation (on blur) ---
        if (nameInput) nameInput.addEventListener('blur', validateName);
        if (emailInput) emailInput.addEventListener('blur', validateEmail);
        if (phoneInput) phoneInput.addEventListener('blur', validatePhone);
        if (subjectInput) subjectInput.addEventListener('blur', validateSubject);
        if (messageInput) messageInput.addEventListener('blur', validateMessage);

        // --- Character Counter ---
        if (messageInput && charCounter) {
            messageInput.addEventListener('input', function() {
                const len = this.value.length;
                charCounter.textContent = len + ' / 20 min';
                if (len >= 20) {
                    charCounter.classList.add('valid');
                } else {
                    charCounter.classList.remove('valid');
                }
            });
        }

        // --- Form Submit ---
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone();
            const isSubjectValid = validateSubject();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
                // Show success overlay
                if (successOverlay) {
                    successOverlay.classList.add('active');
                    form.reset();
                    // Clear error states
                    document.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));
                    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
                    if (charCounter) charCounter.textContent = '0 / 20 min';
                }
            } else {
                // Focus first invalid field
                const firstError = document.querySelector('.form-group.error input, .form-group.error select, .form-group.error textarea');
                if (firstError) firstError.focus();
            }
        });

        // --- Close Success Overlay ---
        if (closeSuccess) {
            closeSuccess.addEventListener('click', function() {
                successOverlay.classList.remove('active');
            });
        }

        // Close overlay on outside click
        if (successOverlay) {
            successOverlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                }
            });
        }
    }

}); // End DOMContentLoaded
