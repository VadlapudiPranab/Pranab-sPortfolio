// Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const closeMenuBtn = document.querySelector('.close-menu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.add('active');
            closeMenuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeMenuBtn.addEventListener('click', () => {
            navLinks.classList.remove('active');
            closeMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Form submission handling with Web3Forms
        const contactForm = document.getElementById('contactForm');
        const result = document.getElementById('result');

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(contactForm);
                const object = Object.fromEntries(formData);
                const json = JSON.stringify(object);
                result.innerHTML = "Please wait...";

                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status === 200) {
                        result.innerHTML = "Message sent successfully!";
                    } else {
                        console.log(response);
                        result.innerHTML = json.message || "Failed to send message.";
                    }
                })
                .catch(error => {
                    console.log(error);
                    result.innerHTML = "Something went wrong! Please try again.";
                })
                .then(function() {
                    contactForm.reset();
                    setTimeout(() => {
                        result.style.display = "none";
                    }, 3000);
                });
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Prevent scrolling when mobile menu is open
        document.addEventListener('touchmove', function(e) {
            if (navLinks.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });

        // Theme switcher
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                body.classList.add('light-mode');
            } else {
                body.classList.remove('light-mode');
            }
        });