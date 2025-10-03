// Contact Form Handler using EmailJS
(function() {
    // EmailJS configuration
    const EMAILJS_SERVICE_ID = 'service_skillmindlab';
    const EMAILJS_TEMPLATE_ID = 'template_contact';
    const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // Replace with actual key

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // Contact form submission function
    function submitForm() {
        const form = document.getElementById('contactForm');
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate required fields
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return false;
        }
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitButton.disabled = true;
        
        // Prepare email data
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'hello@skillmindlab.com,anacstjardim@gmail.com'
        };
        
        // Send email using EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function(response) {
                    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
                    form.reset();
                }, function(error) {
                    console.error('EmailJS Error:', error);
                    alert('Sorry, there was an error sending your message. Please email us directly at hello@skillmindlab.com');
                })
                .finally(function() {
                    // Reset button state
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                });
        } else {
            // Fallback to manual email instructions
            const emailBody = `New contact form submission from SkillBootcamps website:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the SkillBootcamps contact form.
Timestamp: ${new Date().toLocaleString()}`;

            alert(`Thank you for your message! Please email us at hello@skillmindlab.com and anacstjardim@gmail.com with the following information:

Subject: New Contact Form Submission - ${subject}

Message:
${emailBody}

We will respond within 24 hours.`);

            form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
        
        return false; // Prevent default form submission
    }
    
    // Make submitForm globally available
    window.submitForm = submitForm;
})();
