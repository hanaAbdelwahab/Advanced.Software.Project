
// DOM Elements
const appContainer = document.getElementById('app-container');
const sidebarToggle = document.getElementById('sidebar-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const overlay = document.getElementById('overlay');
const userProfile = document.getElementById('user-profile');
const userDropdown = document.getElementById('user-dropdown');

// Sidebar Toggle
sidebarToggle.addEventListener('click', () => {
    appContainer.classList.toggle('expanded');
});

// Mobile Menu Button
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        appContainer.classList.add('expanded');
        overlay.classList.add('active');
    });
}

// Close sidebar on overlay click
overlay.addEventListener('click', () => {
    if (window.innerWidth < 992) {
        appContainer.classList.remove('expanded');
    }
    overlay.classList.remove('active');
    document.getElementById('comment-modal').classList.remove('active');
    document.getElementById('create-pr-modal').classList.remove('active');
    userDropdown.classList.remove('active');
});

// User Profile Dropdown
userProfile.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('active');
    userDropdown.style.position = 'absolute';
    userDropdown.style.top = (userProfile.offsetTop + userProfile.offsetHeight + 5) + 'px';
    userDropdown.style.left = (userProfile.offsetLeft + userProfile.offsetWidth - userDropdown.offsetWidth) + 'px';
});

// User Dropdown Items
const userDropdownItems = userDropdown.querySelectorAll('.dropdown-item');

userDropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        const action = item.querySelector('span').textContent;
        showToast('info', 'User Action', `${action} selected`);
        userDropdown.classList.remove('active');
    });
});

// Navigation Links
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all items
        navItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Update page title
        const pageName = item.getAttribute('data-page');
        document.querySelector('.page-title').textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        
        // On mobile, close the sidebar after navigation
        if (window.innerWidth < 992) {
            appContainer.classList.remove('expanded');
            overlay.classList.remove('active');
        }
        
        // Show toast notification
        showToast('info', 'Page Changed', `Navigated to ${pageName}`);
    });
});

// Filter Dropdown
const filterBtn = document.getElementById('filter-btn');
const filterMenu = document.getElementById('filter-menu');
const filterItems = filterMenu.querySelectorAll('.dropdown-item');

filterBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    filterMenu.classList.toggle('active');
    document.getElementById('sort-menu').classList.remove('active');
});

filterItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        filterItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Get filter value
        const filter = item.getAttribute('data-filter');
        
        // Filter PR items
        const prItems = document.querySelectorAll('.pr-item');
        
        prItems.forEach(pr => {
            if (filter === 'all') {
                pr.style.display = 'flex';
            } else {
                const status = pr.getAttribute('data-status');
                pr.style.display = status === filter ? 'flex' : 'none';
            }
        });
        
        // Close menu
        filterMenu.classList.remove('active');
        
        // Show toast notification
        showToast('info', 'Filter Applied', `Showing ${filter === 'all' ? 'all' : filter} pull requests`);
    });
});

// Sort Dropdown
const sortBtn = document.getElementById('sort-btn');
const sortMenu = document.getElementById('sort-menu');
const sortItems = sortMenu.querySelectorAll('.dropdown-item');

sortBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sortMenu.classList.toggle('active');
    filterMenu.classList.remove('active');
});

sortItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        sortItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Get sort value
        const sort = item.getAttribute('data-sort');
        
        // Sort PR items (just a visual effect for demo)
        const prList = document.querySelector('.pr-list');
        const prItems = Array.from(prList.querySelectorAll('.pr-item'));
        
        prItems.sort((a, b) => {
            if (sort === 'newest') {
                return parseInt(b.getAttribute('data-pr-id')) - parseInt(a.getAttribute('data-pr-id'));
            } else if (sort === 'oldest') {
                return parseInt(a.getAttribute('data-pr-id')) - parseInt(b.getAttribute('data-pr-id'));
            } else if (sort === 'priority') {
                const statusA = a.getAttribute('data-status');
                const statusB = b.getAttribute('data-status');
                
                const priority = {
                    'needs-review': 1,
                    'changes': 2,
                    'approved': 3
                };
                
                return priority[statusA] - priority[statusB];
            }
        });
        
        // Re-append sorted items
        prItems.forEach(item => {
            prList.appendChild(item);
        });
        
        // Close menu
        sortMenu.classList.remove('active');
        
        // Show toast notification
        showToast('info', 'Sort Applied', `Sorted by ${sort}`);
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    filterMenu.classList.remove('active');
    sortMenu.classList.remove('active');
    userDropdown.classList.remove('active');
});

// Mark all notifications as read
const markAllReadBtn = document.getElementById('mark-all-read');

markAllReadBtn.addEventListener('click', () => {
    // Update notification badge
    const notificationBadge = document.querySelector('.notification-badge');
    notificationBadge.textContent = '0';
    
    // Add visual effect to notification items
    const notificationItems = document.querySelectorAll('.activity-item');
    notificationItems.forEach(item => {
        item.style.opacity = '0.6';
    });
    
    // Show toast notification
    showToast('success', 'Notifications Cleared', 'All notifications marked as read');
});

// Comment Modal
const commentModal = document.getElementById('comment-modal');
const commentBtns = document.querySelectorAll('.comment-btn');
const closeCommentModal = document.getElementById('close-comment-modal');
const cancelComment = document.getElementById('cancel-comment');
const submitComment = document.getElementById('submit-comment');
const commentText = document.getElementById('comment-text');
const commentSpinner = document.getElementById('comment-spinner');
const submitCommentText = document.getElementById('submit-comment-text');

commentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const prId = btn.getAttribute('data-pr-id');
        const prTitle = btn.closest('.pr-item').querySelector('.pr-title').textContent;
        
        // Set modal title
        document.querySelector('#comment-modal .modal-title').textContent = `Comment on "${prTitle}"`;
        
        // Store PR ID for submission
        commentModal.setAttribute('data-pr-id', prId);
        
        // Show modal
        commentModal.classList.add('active');
        overlay.classList.add('active');
        
        // Focus on textarea
        commentText.focus();
    });
});

closeCommentModal.addEventListener('click', () => {
    commentModal.classList.remove('active');
    overlay.classList.remove('active');
    commentText.value = '';
});

cancelComment.addEventListener('click', () => {
    commentModal.classList.remove('active');
    overlay.classList.remove('active');
    commentText.value = '';
});

submitComment.addEventListener('click', () => {
    if (commentText.value.trim() === '') {
        showToast('error', 'Error', 'Please enter a comment');
        return;
    }
    
    // Show loading spinner
    commentSpinner.style.display = 'block';
    submitCommentText.style.display = 'none';
    submitComment.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Hide loading spinner
        commentSpinner.style.display = 'none';
        submitCommentText.style.display = 'block';
        submitComment.disabled = false;
        
        // Close modal
        commentModal.classList.remove('active');
        overlay.classList.remove('active');
        
        // Show toast notification
        const prId = commentModal.getAttribute('data-pr-id');
        const prTitle = document.querySelector(`.pr-item[data-pr-id="${prId}"] .pr-title`).textContent;
        
        showToast('success', 'Comment Added', `Your comment on "${prTitle}" has been added`);
        
        // Clear comment text
        commentText.value = '';
    }, 1000);
});

// Create PR Modal
const createPrModal = document.getElementById('create-pr-modal');
const createPrBtn = document.getElementById('create-pr-btn');
const closeCreatePrModal = document.getElementById('close-create-pr-modal');
const cancelCreatePr = document.getElementById('cancel-create-pr');
const submitCreatePr = document.getElementById('submit-create-pr');
const prTitle = document.getElementById('pr-title');
const prRepo = document.getElementById('pr-repo');
const prDescription = document.getElementById('pr-description');
const prSpinner = document.getElementById('pr-spinner');
const submitPrText = document.getElementById('submit-pr-text');

createPrBtn.addEventListener('click', () => {
    // Show modal
    createPrModal.classList.add('active');
    overlay.classList.add('active');
    
    // Focus on title input
    prTitle.focus();
});

closeCreatePrModal.addEventListener('click', () => {
    createPrModal.classList.remove('active');
    overlay.classList.remove('active');
    prTitle.value = '';
    prRepo.value = '';
    prDescription.value = '';
});

cancelCreatePr.addEventListener('click', () => {
    createPrModal.classList.remove('active');
    overlay.classList.remove('active');
    prTitle.value = '';
    prRepo.value = '';
    prDescription.value = '';
});

submitCreatePr.addEventListener('click', () => {
    if (prTitle.value.trim() === '' || prRepo.value.trim() === '') {
        showToast('error', 'Error', 'Please fill in all required fields');
        return;
    }
    
    // Show loading spinner
    prSpinner.style.display = 'block';
    submitPrText.style.display = 'none';
    submitCreatePr.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Hide loading spinner
        prSpinner.style.display = 'none';
        submitPrText.style.display = 'block';
        submitCreatePr.disabled = false;
        
        // Close modal
        createPrModal.classList.remove('active');
        overlay.classList.remove('active');
        
        // Show toast notification
        showToast('success', 'Pull Request Created', `Your PR "${prTitle.value}" has been created`);
        
        // Clear form
        prTitle.value = '';
        prRepo.value = '';
        prDescription.value = '';
    }, 1000);
});

// Review Buttons
const reviewBtns = document.querySelectorAll('.review-btn');

reviewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const prId = btn.getAttribute('data-pr-id');
        const prTitle = btn.closest('.pr-item').querySelector('.pr-title').textContent;
        
        // Add pulse animation
        btn.classList.add('pulse');
        
        // Show toast notification
        showToast('info', 'Opening Review', `Opening review for "${prTitle}"`);
        
        // Remove pulse animation after 2 seconds
        setTimeout(() => {
            btn.classList.remove('pulse');
        }, 2000);
    });
});

// Merge Buttons
const mergeBtns = document.querySelectorAll('.merge-btn');

mergeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const prId = btn.getAttribute('data-pr-id');
        const prTitle = btn.closest('.pr-item').querySelector('.pr-title').textContent;
        
        // Change button text and disable
        const originalText = btn.innerHTML;
        btn.innerHTML = '<div class="spinner"></div>';
        btn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Remove PR item
            const prItem = btn.closest('.pr-item');
            prItem.style.opacity = '0';
            prItem.style.height = '0';
            prItem.style.overflow = 'hidden';
            prItem.style.padding = '0';
            prItem.style.margin = '0';
            prItem.style.border = 'none';
            
            setTimeout(() => {
                prItem.remove();
            }, 300);
            
            // Show toast notification
            showToast('success', 'PR Merged', `"${prTitle}" has been successfully merged`);
        }, 1500);
    });
});

// Search Functionality
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            return;
        }
        
        // Show toast notification
        showToast('info', 'Search Results', `Searching for "${searchTerm}"`);
        
        // Clear search input
        searchInput.value = '';
        searchInput.blur();
    }
});

// Notification Button
const notificationsBtn = document.getElementById('notifications-btn');

notificationsBtn.addEventListener('click', () => {
    // Show toast notification
    showToast('info', 'Notifications', 'Viewing all notifications');
});

// Activity Items Click
const activityItems = document.querySelectorAll('.activity-item');

activityItems.forEach(item => {
    item.addEventListener('click', () => {
        const notificationId = item.getAttribute('data-notification-id');
        
        // Add a visual effect to show it's been clicked
        item.style.opacity = '0.7';
        
        // Show toast notification
        showToast('info', 'Notification Opened', 'Opening related content');
    });
});

// Readiness Items Click
const readinessItems = document.querySelectorAll('.readiness-item');

readinessItems.forEach(item => {
    item.addEventListener('click', () => {
        const prId = item.getAttribute('data-pr-id');
        const title = item.querySelector('.readiness-title').textContent;
        
        // Show toast notification
        showToast('info', 'PR Details', `Opening details for "${title}"`);
    });
});

// Team Performance Metrics
const refreshMetricsBtn = document.getElementById('refresh-metrics');

refreshMetricsBtn.addEventListener('click', () => {
    // Add spinning animation to the refresh button
    refreshMetricsBtn.querySelector('i').classList.add('fa-spin');
    
    // Simulate API call to refresh metrics
    setTimeout(() => {
        // Update metrics with random values
        const velocityChange = Math.floor(Math.random() * 15) + 1;
        const velocityDirection = Math.random() > 0.3 ? '+' : '-';
        const velocityValue = document.querySelector('.metric-item:nth-child(1) .metric-value');
        velocityValue.textContent = `${velocityDirection}${velocityChange}%`;
        velocityValue.className = 'metric-value ' + (velocityDirection === '+' ? 'positive' : 'negative');
        
        // Update progress bars with random values
        const progressBars = document.querySelectorAll('.metric-progress-bar');
        progressBars.forEach(bar => {
            const newWidth = Math.floor(Math.random() * 30) + 65; // Between 65% and 95%
            bar.style.width = `${newWidth}%`;
        });
        
        // Update some metric details
        const reviewTime = (Math.random() * 5 + 2).toFixed(1);
        document.querySelector('.metric-item:nth-child(1) .metric-detail:nth-child(1) .metric-detail-value').textContent = `${reviewTime} hours`;
        
        const reviewsCompleted = Math.floor(Math.random() * 10) + 25;
        document.querySelector('.metric-item:nth-child(1) .metric-detail:nth-child(2) .metric-detail-value').textContent = `${reviewsCompleted} this week`;
        
        // Stop spinning animation
        refreshMetricsBtn.querySelector('i').classList.remove('fa-spin');
        
        // Show toast notification
        showToast('success', 'Metrics Updated', 'Team performance metrics have been refreshed');
    }, 1500);
});

// Toast Notification Function
function showToast(type, title, message) {
    const toastContainer = document.getElementById('toast-container');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Set icon based on type
    let iconClass = '';
    if (type === 'success') {
        iconClass = 'fa-check-circle';
    } else if (type === 'error') {
        iconClass = 'fa-exclamation-circle';
    } else if (type === 'warning') {
        iconClass = 'fa-exclamation-triangle';
    } else if (type === 'info') {
        iconClass = 'fa-info-circle';
    }
    
    // Set toast content
    toast.innerHTML = `
        <div class="toast-icon ${type}">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('active');
    }, 10);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('active');
        
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Responsive Sidebar
function checkWindowSize() {
    if (window.innerWidth < 992) {
        appContainer.classList.remove('expanded');
    } else {
        appContainer.classList.add('expanded');
    }
}

// Check on load
checkWindowSize();

// Check on resize
window.addEventListener('resize', checkWindowSize);

// Initialize - Show welcome toast
setTimeout(() => {
    showToast('success', 'Welcome', 'Dashboard loaded successfully');
}, 500);
