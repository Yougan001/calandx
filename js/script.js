document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat-num');
    const speed = 200;
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
    
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.animationPlayState = 'paused';
        sectionObserver.observe(section);
    });
    
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            const subject = document.getElementById('subject').value;
            const company = document.getElementById('company').value;
            const phone = document.getElementById('phone').value;
            
            const subjectLabels = {
                'product': 'Product Inquiry',
                'custom': 'Custom Solution',
                'partnership': 'Partnership',
                'support': 'Technical Support',
                'other': 'Other'
            };
            
            const subjectText = subject ? subjectLabels[subject] : 'General Inquiry';
            
            const mailtoLink = `mailto:bin.hou@calandx.com?subject=${encodeURIComponent('Website Inquiry: ' + subjectText)}&body=${encodeURIComponent(
                `Name: ${name}\n` +
                `Company: ${company || 'N/A'}\n` +
                `Email: ${email}\n` +
                `Phone: ${phone || 'N/A'}\n` +
                `Subject: ${subjectText}\n\n` +
                `Message:\n${message}`
            )}`;
            
            window.location.href = mailtoLink;
            
            alert('Thank you for your inquiry! Your email client will open to send the message.');
            form.reset();
        });
    }
    
    const navContact = document.querySelector('.nav-contact');
    if (navContact) {
        navContact.addEventListener('click', function() {
            window.location.href = 'contact.html';
        });
        navContact.style.cursor = 'pointer';
    }
});
