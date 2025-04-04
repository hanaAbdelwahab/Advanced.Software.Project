    document.addEventListener('DOMContentLoaded', function() {
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIconLight = document.querySelector('.theme-icon-light');
        const themeIconDark = document.querySelector('.theme-icon-dark');
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                themeIconLight.style.display = 'none';
                themeIconDark.style.display = 'block';
            } else {
                themeIconLight.style.display = 'block';
                themeIconDark.style.display = 'none';
            }
        });
        
        // Filter Buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        const codeCards = document.querySelectorAll('.code-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter cards
                codeCards.forEach(card => {
                    const categories = card.getAttribute('data-categories').split(',');
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Modal Functionality
        const modal = document.querySelector('.modal-overlay');
        const modalClose = document.querySelector('.modal-close');
        const viewButtons = document.querySelectorAll('.view-btn');
        const modalTitle = document.querySelector('.modal-title');
        const modalSubtitle = document.querySelector('.modal-subtitle');
        let currentExampleId = '';
        
        viewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.code-card');
                const id = card.getAttribute('data-id');
                currentExampleId = id; // Store the current example ID
                const title = card.querySelector('.card-title').textContent;
                const description = card.querySelector('.card-description').textContent;
                
                modalTitle.textContent = title;
                modalSubtitle.textContent = description;
                
                // Update active tab
                document.querySelectorAll('.modal-tab').forEach(tab => {
                    if (tab.getAttribute('data-tab') === 'code') {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                    }
                });
                
                // Update active content
                document.querySelectorAll('.modal-content').forEach(content => {
                    if (content.getAttribute('data-content') === 'code') {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
                
                // Show modal
                modal.classList.add('active');
                
                // Load reviews for this example
                loadReviews();
            });
        });
        
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Tab Switching
        const modalTabs = document.querySelectorAll('.modal-tab');
        
        modalTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Update active tab
                modalTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update active content
                const modalContents = document.querySelectorAll('.modal-content');
                modalContents.forEach(content => {
                    if (content.getAttribute('data-content') === tabName) {
                        content.classList.add('active');
                        
                        // If switching to result tab, initialize the appropriate example
                        if (tabName === 'result' && currentExampleId) {
                            initializeExample(currentExampleId);
                        }
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
        
        // Copy Code Functionality
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const codeType = this.getAttribute('data-code-type');
                const codeBlock = this.closest('.code-block');
                const codeContent = codeBlock.querySelector('code').textContent;
                
                navigator.clipboard.writeText(codeContent).then(() => {
                    showToast('Code copied to clipboard!');
                    
                    // Visual feedback
                    const originalText = this.querySelector('span').textContent;
                    this.querySelector('span').textContent = 'Copied!';
                    setTimeout(() => {
                        this.querySelector('span').textContent = originalText;
                    }, 2000);
                });
            });
        });
        
        // Toast Notification
        function showToast(message) {
            const toastContainer = document.querySelector('.toast-container');
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `
                <div class="toast-icon">✓</div>
                <div class="toast-content">${message}</div>
                <button class="toast-close">&times;</button>
            `;
            
            toastContainer.appendChild(toast);
            
            // Show toast with animation
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            // Auto hide after 3 seconds
            setTimeout(() => {
                hideToast(toast);
            }, 3000);
            
            // Close button
            toast.querySelector('.toast-close').addEventListener('click', function() {
                hideToast(toast);
            });
        }
        
        function hideToast(toast) {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
        
        // Initialize Examples
        function initializeExample(id) {
            const resultPreview = document.getElementById('result-preview');
            
            // Clear previous content
            resultPreview.innerHTML = '';
            
            // Create appropriate example based on ID
            switch(id) {
                case 'counter':
                    resultPreview.innerHTML = `
                        <div class="counter-example">
                            <div class="counter-display">0</div>
                            <div class="counter-buttons">
                                <button class="counter-btn">-</button>
                                <button class="counter-btn">+</button>
                            </div>
                        </div>
                    `;
                    initializeCounter(resultPreview);
                    break;
                case 'todo':
                    resultPreview.innerHTML = `
                        <div class="todo-app">
                            <div class="todo-header">
                                <input type="text" class="todo-input" placeholder="Add a new task...">
                                <button class="todo-add-btn">Add</button>
                            </div>
                            <ul class="todo-list">
                                <li class="todo-item">
                                    <input type="checkbox" class="todo-checkbox">
                                    <span class="todo-text">Complete the project</span>
                                    <button class="todo-delete">×</button>
                                </li>
                                <li class="todo-item todo-completed">
                                    <input type="checkbox" class="todo-checkbox" checked>
                                    <span class="todo-text">Design the UI</span>
                                    <button class="todo-delete">×</button>
                                </li>
                            </ul>
                        </div>
                    `;
                    initializeTodo(resultPreview);
                    break;
                case 'gallery':
                    resultPreview.innerHTML = `
                        <div class="image-gallery">
                            <div class="gallery-container">
                                <div class="gallery-slide active">Slide 1</div>
                                <div class="gallery-slide">Slide 2</div>
                                <div class="gallery-slide">Slide 3</div>
                            </div>
                            <div class="gallery-controls">
                                <button class="btn btn-outline">Previous</button>
                                <button class="btn btn-outline">Next</button>
                            </div>
                            <div class="gallery-dots">
                                <span class="gallery-dot active"></span>
                                <span class="gallery-dot"></span>
                                <span class="gallery-dot"></span>
                            </div>
                        </div>
                    `;
                    initializeGallery(resultPreview);
                    break;
                case 'color-picker':
                    resultPreview.innerHTML = `
                        <div class="color-picker">
                            <div class="color-display" style="background-color: rgb(67, 97, 238);"></div>
                            <div class="color-controls">
                                <span>R</span>
                                <input type="range" min="0" max="255" value="67" class="color-slider">
                                <span id="redValue">67</span>
                            </div>
                            <div class="color-controls">
                                <span>G</span>
                                <input type="range" min="0" max="255" value="97" class="color-slider">
                                <span id="greenValue">97</span>
                            </div>
                            <div class="color-controls">
                                <span>B</span>
                                <input type="range" min="0" max="255" value="238" class="color-slider">
                                <span id="blueValue">238</span>
                            </div>
                            <div class="color-value">#4361ee</div>
                        </div>
                    `;
                    initializeColorPicker(resultPreview);
                    break;
                case 'weather':
                    resultPreview.innerHTML = `
                        <div class="weather-app">
                            <div class="weather-search">
                                <input type="text" class="weather-input" placeholder="Enter city name...">
                                <button class="weather-btn">Search</button>
                            </div>
                            <div class="weather-result">
                                <div class="weather-city">New York</div>
                                <div class="weather-temp">72°F</div>
                                <div class="weather-desc">Partly Cloudy</div>
                                <div class="weather-details">
                                    <div class="weather-detail">
                                        <div class="weather-detail-label">Humidity</div>
                                        <div class="weather-detail-value">65%</div>
                                    </div>
                                    <div class="weather-detail">
                                        <div class="weather-detail-label">Wind</div>
                                        <div class="weather-detail-value">5 mph</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    initializeWeather(resultPreview);
                    break;
            }
        }
        
        // Counter Example
        function initializeCounter(container) {
            const counterDisplay = container.querySelector('.counter-display');
            const counterButtons = container.querySelectorAll('.counter-btn');
            let count = 0;
            
            function updateDisplay() {
                counterDisplay.textContent = count;
                counterDisplay.animate([
                    { transform: 'scale(1.2)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 200,
                    easing: 'ease-out'
                });
            }
            
            counterButtons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    if (index === 0) {
                        count--;
                    } else {
                        count++;
                    }
                    updateDisplay();
                });
            });
        }
        
        // Todo App Example
        function initializeTodo(container) {
            const input = container.querySelector('.todo-input');
            const addBtn = container.querySelector('.todo-add-btn');
            const list = container.querySelector('.todo-list');
            
            // Add new task
            function addTask() {
                const text = input.value.trim();
                if (text) {
                    const li = document.createElement('li');
                    li.className = 'todo-item';
                    li.innerHTML = `
                        <input type="checkbox" class="todo-checkbox">
                        <span class="todo-text">${text}</span>
                        <button class="todo-delete">×</button>
                    `;
                    list.appendChild(li);
                    input.value = '';
                    
                    // Add event listeners to new elements
                    const checkbox = li.querySelector('.todo-checkbox');
                    const deleteBtn = li.querySelector('.todo-delete');
                    
                    checkbox.addEventListener('change', function() {
                        li.classList.toggle('todo-completed', this.checked);
                    });
                    
                    deleteBtn.addEventListener('click', function() {
                        li.remove();
                    });
                }
            }
            
            // Event listeners
            addBtn.addEventListener('click', addTask);
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTask();
                }
            });
            
            // Initialize existing items
            const checkboxes = container.querySelectorAll('.todo-checkbox');
            const deleteButtons = container.querySelectorAll('.todo-delete');
            
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    this.closest('.todo-item').classList.toggle('todo-completed', this.checked);
                });
            });
            
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    this.closest('.todo-item').remove();
                });
            });
        }
        
        // Image Gallery Example
        function initializeGallery(container) {
            const slides = container.querySelectorAll('.gallery-slide');
            const dots = container.querySelectorAll('.gallery-dot');
            const prevBtn = container.querySelector('.gallery-controls button:first-child');
            const nextBtn = container.querySelector('.gallery-controls button:last-child');
            
            let currentIndex = 0;
            
            function showSlide(index) {
                // Hide all slides
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                // Show current slide
                slides[index].classList.add('active');
                dots[index].classList.add('active');
                currentIndex = index;
            }
            
            function nextSlide() {
                let newIndex = currentIndex + 1;
                if (newIndex >= slides.length) {
                    newIndex = 0;
                }
                showSlide(newIndex);
            }
            
            function prevSlide() {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) {
                    newIndex = slides.length - 1;
                }
                showSlide(newIndex);
            }
            
            // Event listeners
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => showSlide(index));
            });
            
            // Initialize first slide
            showSlide(0);
        }
        
        // Color Picker Example
        function initializeColorPicker(container) {
            const sliders = container.querySelectorAll('.color-slider');
            const display = container.querySelector('.color-display');
            const valueDisplay = container.querySelector('.color-value');
            const redValue = container.querySelector('#redValue');
            const greenValue = container.querySelector('#greenValue');
            const blueValue = container.querySelector('#blueValue');
            
            let red = 67;
            let green = 97;
            let blue = 238;
            
            function updateColor() {
                const color = `rgb(${red}, ${green}, ${blue})`;
                display.style.backgroundColor = color;
                
                // Convert to hex for display
                const hexColor = rgbToHex(red, green, blue);
                valueDisplay.textContent = hexColor;
                
                // Update value displays
                if (redValue) redValue.textContent = red;
                if (greenValue) greenValue.textContent = green;
                if (blueValue) blueValue.textContent = blue;
            }
            
            function rgbToHex(r, g, b) {
                return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }
            
            // Event listeners
            sliders.forEach((slider, index) => {
                slider.addEventListener('input', function() {
                    if (index === 0) {
                        red = this.value;
                    } else if (index === 1) {
                        green = this.value;
                    } else {
                        blue = this.value;
                    }
                    updateColor();
                });
            });
            
            // Initialize
            updateColor();
        }
        
        // Weather App Example
        function initializeWeather(container) {
            const input = container.querySelector('.weather-input');
            const searchBtn = container.querySelector('.weather-btn');
            const cityElement = container.querySelector('.weather-city');
            const tempElement = container.querySelector('.weather-temp');
            const descElement = container.querySelector('.weather-desc');
            const humidityElement = container.querySelector('.weather-detail-value:first-of-type');
            const windElement = container.querySelector('.weather-detail-value:last-of-type');
            
            // Mock weather data for demo purposes
            const weatherData = {
                'new york': { temp: '72°F', desc: 'Partly Cloudy', humidity: '65%', wind: '5 mph' },
                'london': { temp: '62°F', desc: 'Rainy', humidity: '80%', wind: '8 mph' },
                'tokyo': { temp: '78°F', desc: 'Sunny', humidity: '45%', wind: '3 mph' },
                'paris': { temp: '68°F', desc: 'Cloudy', humidity: '70%', wind: '6 mph' },
                'sydney': { temp: '82°F', desc: 'Clear', humidity: '50%', wind: '7 mph' }
            };
            
            function searchWeather() {
                const city = input.value.trim().toLowerCase();
                
                if (city) {
                    // Check if we have mock data for this city
                    if (weatherData[city]) {
                        const data = weatherData[city];
                        cityElement.textContent = city.charAt(0).toUpperCase() + city.slice(1);
                        tempElement.textContent = data.temp;
                        descElement.textContent = data.desc;
                        humidityElement.textContent = data.humidity;
                        windElement.textContent = data.wind;
                    } else {
                        // Default data for cities not in our mock database
                        cityElement.textContent = city.charAt(0).toUpperCase() + city.slice(1);
                        tempElement.textContent = '70°F';
                        descElement.textContent = 'Partly Cloudy';
                        humidityElement.textContent = '60%';
                        windElement.textContent = '4 mph';
                    }
                }
            }
            
            // Event listeners
            searchBtn.addEventListener('click', searchWeather);
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchWeather();
                }
            });
        }
        
        // Initialize all examples on page load
        initializeCounter(document);
        initializeTodo(document);
        initializeGallery(document);
        initializeColorPicker(document);
        initializeWeather(document);
        
        // Like and Review Functionality
        const likeButtons = document.querySelectorAll('.like-btn');
        const commentButtons = document.querySelectorAll('.comment-btn');
        const reviewForms = document.querySelectorAll('.review-form');
        
        // Store likes and reviews in localStorage
        const likes = JSON.parse(localStorage.getItem('likes')) || {};
        const globalReviews = JSON.parse(localStorage.getItem('globalReviews')) || [];
        
        // Initialize like counts
        likeButtons.forEach(button => {
            const id = button.getAttribute('data-id');
            const likeCount = button.querySelector('.like-count') || button.nextElementSibling;
            
            // Set initial count
            likeCount.textContent = likes[id] ? likes[id].count : '0';
            
            // Check if user has liked this example
            if (likes[id] && likes[id].liked) {
                button.classList.add('active');
            }
            
            // Add click event
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                
                if (!likes[id]) {
                    likes[id] = { count: 0, liked: false };
                }
                
                if (likes[id].liked) {
                    // Unlike
                    likes[id].count--;
                    likes[id].liked = false;
                    this.classList.remove('active');
                } else {
                    // Like
                    likes[id].count++;
                    likes[id].liked = true;
                    this.classList.add('active');
                }
                
                // Update all like counts for this ID
                document.querySelectorAll(`.like-btn[data-id="${id}"] .like-count, .like-btn[data-id="${id}"] + .like-count`).forEach(count => {
                    count.textContent = likes[id].count;
                });
                
                // Save to localStorage
                localStorage.setItem('likes', JSON.stringify(likes));
            });
        });
        
        // Initialize comment counts
        commentButtons.forEach(button => {
            const id = button.getAttribute('data-id');
            const commentCount = button.querySelector('.comment-count');
            
            // Set initial count based on global reviews
            const count = globalReviews.length;
            commentCount.textContent = count;
            
            // Add click event to open modal with comments tab
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.code-card');
                const id = card.getAttribute('data-id');
                currentExampleId = id; // Store the current example ID
                const title = card.querySelector('.card-title').textContent;
                const description = card.querySelector('.card-description').textContent;
                
                modalTitle.textContent = title;
                modalSubtitle.textContent = description;
                
                // Update active tab to explanation (which has the comments)
                document.querySelectorAll('.modal-tab').forEach(tab => {
                    if (tab.getAttribute('data-tab') === 'explanation') {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                    }
                });
                
                // Update active content
                document.querySelectorAll('.modal-content').forEach(content => {
                    if (content.getAttribute('data-content') === 'explanation') {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
                
                // Show modal
                modal.classList.add('active');
                
                // Initialize the example in the result tab
                initializeExample(id);
                
                // Load reviews
                loadReviews();
            });
        });
        
        // Handle review submissions
        reviewForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const textarea = this.querySelector('.review-input');
                const reviewText = textarea.value.trim();
                
                if (reviewText) {
                    // Create new review
                    const review = {
                        id: Date.now(),
                        text: reviewText,
                        author: 'User',
                        date: new Date().toLocaleDateString()
                    };
                    
                    // Add to global reviews
                    globalReviews.unshift(review);
                    
                    // Save to localStorage
                    localStorage.setItem('globalReviews', JSON.stringify(globalReviews));
                    
                    // Update comment counts for all examples
                    document.querySelectorAll('.comment-count').forEach(count => {
                        count.textContent = globalReviews.length;
                    });
                    
                    // Clear textarea
                    textarea.value = '';
                    
                    // Update reviews display
                    loadReviews();
                    
                    // Show success message
                    showToast('Review submitted successfully!');
                }
            });
        });
        
        // Load reviews for all examples
        function loadReviews() {
            const reviewsList = document.getElementById('global-reviews-list');
            const reviewCounts = document.querySelectorAll('.review-count');
            
            // Update review counts
            reviewCounts.forEach(count => {
                count.textContent = `${globalReviews.length} reviews`;
            });
            
            // Update reviews list
            if (reviewsList) {
                reviewsList.innerHTML = '';
                
                if (globalReviews.length === 0) {
                    reviewsList.innerHTML = '<p class="text-gray">No reviews yet. Be the first to review!</p>';
                } else {
                    globalReviews.forEach(review => {
                        const li = document.createElement('li');
                        li.className = 'review-item';
                        li.innerHTML = `
                            <div class="review-item-header">
                                <div class="review-author">${review.author}</div>
                                <div class="review-date">${review.date}</div>
                            </div>
                            <div class="review-content">${review.text}</div>
                        `;
                        reviewsList.appendChild(li);
                    });
                }
            }
        }
        
        // Initialize all reviews on page load
        loadReviews();
        
        // Initialize view counts (mock data)
        const viewCounts = {
            'counter': 15,
            'todo': 23,
            'gallery': 18,
            'color-picker': 27,
            'weather': 12
        };
    });
