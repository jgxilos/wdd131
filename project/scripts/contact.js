// Contact form functionality with localStorage
document.addEventListener('DOMContentLoaded', function() {
    loadFooterContent();
    setupContactForm();
    displayMessageStats();
});

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitButton = document.querySelector('.submit-button');
    
    // Load saved form data from localStorage
    loadFormData();
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        showLoadingState(true);
        
        // Simulate form submission delay
        setTimeout(() => {
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                experience: document.getElementById('experience').value,
                message: document.getElementById('message').value,
                newsletter: document.getElementById('newsletter').checked,
                response: document.getElementById('response').checked,
                timestamp: new Date().toISOString(),
                id: generateId()
            };
            
            // Validate form
            if (validateForm(formData)) {
                // Save to messages array in localStorage
                saveMessageToHistory(formData);
                
                // Show success message
                showMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
                
                // Clear form
                contactForm.reset();
                
                // Clear saved form data
                localStorage.removeItem('contactFormDraft');
                
                // Update stats display
                displayMessageStats();
            }
            
            // Hide loading state
            showLoadingState(false);
        }, 1500);
    });
    
    // Auto-save form data as user types
    contactForm.addEventListener('input', debounce(function() {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            experience: document.getElementById('experience').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter').checked,
            response: document.getElementById('response').checked
        };
        localStorage.setItem('contactFormDraft', JSON.stringify(formData));
    }, 1000));
}

function loadFormData() {
    const savedData = localStorage.getItem('contactFormDraft');
    if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById('name').value = formData.name || '';
        document.getElementById('email').value = formData.email || '';
        document.getElementById('subject').value = formData.subject || '';
        document.getElementById('experience').value = formData.experience || '';
        document.getElementById('message').value = formData.message || '';
        document.getElementById('newsletter').checked = formData.newsletter || false;
        document.getElementById('response').checked = formData.response !== undefined ? formData.response : true;
        
        showMessage('We restored your previously entered data.', 'info');
    }
}

function saveMessageToHistory(formData) {
    let messageHistory = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messageHistory.push(formData);
    
    // Keep only last 20 messages
    if (messageHistory.length > 20) {
        messageHistory = messageHistory.slice(-20);
    }
    
    localStorage.setItem('contactMessages', JSON.stringify(messageHistory));
}

function validateForm(formData) {
    // Basic validation
    if (!formData.name.trim()) {
        showMessage('Please enter your name.', 'error');
        return false;
    }
    
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!formData.subject) {
        showMessage('Please select a subject.', 'error');
        return false;
    }
    
    if (!formData.message.trim()) {
        showMessage('Please enter your message.', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }
}

function showLoadingState(show) {
    const submitButton = document.querySelector('.submit-button');
    const buttonText = document.querySelector('.button-text');
    const buttonLoading = document.querySelector('.button-loading');
    
    if (show) {
        submitButton.classList.add('loading');
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'inline';
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove('loading');
        buttonText.style.display = 'inline';
        buttonLoading.style.display = 'none';
        submitButton.disabled = false;
    }
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to display message statistics
function displayMessageStats() {
    const messageHistory = JSON.parse(localStorage.getItem('contactMessages')) || [];
    
    if (messageHistory.length > 0) {
        const stats = getMessageStats(messageHistory);
        const statsContainer = document.getElementById('messageStats');
        const formStats = document.querySelector('.form-stats');
        
        formStats.style.display = 'block';
        
        statsContainer.innerHTML = `
            <div class="stat-item">
                <span class="stat-value">${stats.totalMessages}</span>
                <span class="stat-label">Total Messages</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${stats.newsletterSubscribers}</span>
                <span class="stat-label">Newsletter Subs</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${stats.topSubject.count}</span>
                <span class="stat-label">${stats.topSubject.name}</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${stats.averageResponseRequests}%</span>
                <span class="stat-label">Want Response</span>
            </div>
        `;
    }
}

function getMessageStats(messageHistory) {
    // Count subjects
    const subjectCounts = messageHistory.reduce((acc, msg) => {
        acc[msg.subject] = (acc[msg.subject] || 0) + 1;
        return acc;
    }, {});
    
    // Find top subject
    const topSubject = Object.entries(subjectCounts).reduce((max, [subject, count]) => {
        return count > max.count ? { name: formatSubjectName(subject), count } : max;
    }, { name: '', count: 0 });
    
    // Calculate response request percentage
    const responseRequests = messageHistory.filter(msg => msg.response).length;
    const averageResponseRequests = Math.round((responseRequests / messageHistory.length) * 100);
    
    return {
        totalMessages: messageHistory.length,
        newsletterSubscribers: messageHistory.filter(msg => msg.newsletter).length,
        topSubject: topSubject,
        averageResponseRequests: averageResponseRequests,
        experienceLevels: messageHistory.reduce((acc, msg) => {
            const level = msg.experience || 'not-specified';
            acc[level] = (acc[level] || 0) + 1;
            return acc;
        }, {})
    };
}

function formatSubjectName(subject) {
    const subjectMap = {
        'birdwatching-tips': 'Tips',
        'location-info': 'Locations',
        'species-identification': 'Species ID',
        'guided-tours': 'Tours',
        'website-feedback': 'Feedback',
        'other': 'Other'
    };
    
    return subjectMap[subject] || subject;
}