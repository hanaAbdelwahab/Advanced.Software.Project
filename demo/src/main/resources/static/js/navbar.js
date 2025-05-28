    document.addEventListener("DOMContentLoaded", () => {

    
        // Enhanced Toast Notification System
        function showToast(title, message, type = "info") {
        const toastContainer = document.getElementById("toastContainer")
    
        // Create toast element
        const toast = document.createElement("div")
        toast.className = `toast ${type}`
    
        // Set icon based on type
        let iconClass = "fa-info-circle"
        if (type === "success") iconClass = "fa-check-circle"
        if (type === "warning") iconClass = "fa-exclamation-triangle"
        if (type === "error") iconClass = "fa-times-circle"
    
        toast.innerHTML = `
                <div class="toast-icon">
                    <i class="fas ${iconClass}"></i>
                </div>
                <div class="toast-content">
                    <div class="toast-title">${title}</div>
                    <div class="toast-message">${message}</div>
                </div>
                <button class="toast-close">&times;</button>
            `
    
        // Add to container
        toastContainer.appendChild(toast)
    
        // Show with animation
        setTimeout(() => {
            toast.classList.add("show")
        }, 10)
    
        // Auto hide after 5 seconds
        const hideTimeout = setTimeout(() => {
            hideToast(toast)
        }, 5000)
    
        // Close button
        const closeBtn = toast.querySelector(".toast-close")
        closeBtn.addEventListener("click", () => {
            clearTimeout(hideTimeout)
            hideToast(toast)
        })
    
        // Return the toast element
        return toast
        }
    
        function hideToast(toast) {
        toast.classList.remove("show")
        setTimeout(() => {
            toast.remove()
        }, 300)
        }
    
        // Initialize Examples
        function initializeExample(id) {
        const resultPreview = document.getElementById("result-preview")
    
        // Clear previous content
        resultPreview.innerHTML = ""
    
        // Create appropriate example based on ID
        switch (id) {
            case "counter":
            resultPreview.innerHTML = `
                        <div class="counter-example">
                            <div class="counter-display">0</div>
                            <div class="counter-buttons">
                                <button class="counter-btn">-</button>
                                <button class="counter-btn">+</button>
                            </div>
                        </div>
                    `
            initializeCounter(resultPreview)
            break
            case "todo":
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
                    `
            initializeTodo(resultPreview)
            break
            case "gallery":
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
                    `
            initializeGallery(resultPreview)
            break
            case "color-picker":
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
                    `
            initializeColorPicker(resultPreview)
            break
            case "weather":
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
                    `
            initializeWeather(resultPreview)
            break
            case "chart":
            resultPreview.innerHTML = `
                <div class="chart-container">
                <div class="chart-bar" style="height: 0%;" data-value="60">
                    <div class="chart-tooltip">Q1: 60%</div>
                </div>
                <div class="chart-bar" style="height: 0%;" data-value="80">
                    <div class="chart-tooltip">Q2: 80%</div>
                </div>
                <div class="chart-bar" style="height: 0%;" data-value="45">
                    <div class="chart-tooltip">Q3: 45%</div>
                </div>
                <div class="chart-bar" style="height: 0%;" data-value="90">
                    <div class="chart-tooltip">Q4: 90%</div>
                </div>
                </div>
            `
            initializeChart(resultPreview)
            break
            case "form":
            resultPreview.innerHTML = `
                <div class="form-example">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Email">
                    <div class="form-error" style="display: none;">Please enter a valid email</div>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password">
                    <div class="form-error" style="display: none;">Password must be at least 8 characters</div>
                </div>
                <button class="form-submit">Submit</button>
                </div>
            `
            initializeForm(resultPreview)
            break
            case "loader":
            resultPreview.innerHTML = `
                <div class="loader-container">
                <div class="loader-item spinner"></div>
                <div class="loader-item pulse"></div>
                <div class="loader-item dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                </div>
            `
            break
        }
        }
    
        // Counter Example
        function initializeCounter(container) {
        const counterDisplay = container.querySelector(".counter-display")
        const counterButtons = container.querySelectorAll(".counter-btn")
        let count = 0
    
        function updateDisplay() {
            counterDisplay.textContent = count
            counterDisplay.animate([{ transform: "scale(1.2)" }, { transform: "scale(1)" }], {
            duration: 200,
            easing: "ease-out",
            })
        }
    
        counterButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
            if (index === 0) {
                count--
            } else {
                count++
            }
            updateDisplay()
            })
        })
        }
    
        // Todo App Example
        function initializeTodo(container) {
        const input = container.querySelector(".todo-input")
        const addBtn = container.querySelector(".todo-add-btn")
        const list = container.querySelector(".todo-list")
    
        // Add new task
        function addTask() {
            const text = input.value.trim()
            if (text) {
            const li = document.createElement("li")
            li.className = "todo-item"
            li.innerHTML = `
                        <input type="checkbox" class="todo-checkbox">
                        <span class="todo-text">${text}</span>
                        <button class="todo-delete">×</button>
                    `
            list.appendChild(li)
            input.value = ""
    
            // Add event listeners to new elements
            const checkbox = li.querySelector(".todo-checkbox")
            const deleteBtn = li.querySelector(".todo-delete")
    
            checkbox.addEventListener("change", function () {
                li.classList.toggle("todo-completed", this.checked)
            })
    
            deleteBtn.addEventListener("click", () => {
                li.remove()
            })
            }
        }
    
        // Event listeners
        addBtn.addEventListener("click", addTask)
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
            addTask()
            }
        })
    
        // Initialize existing items
        const checkboxes = container.querySelectorAll(".todo-checkbox")
        const deleteButtons = container.querySelectorAll(".todo-delete")
    
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", function () {
            this.closest(".todo-item").classList.toggle("todo-completed", this.checked)
            })
        })
    
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function () {
            this.closest(".todo-item").remove()
            })
        })
        }
    
        // Image Gallery Example
        function initializeGallery(container) {
        const slides = container.querySelectorAll(".gallery-slide")
        const dots = container.querySelectorAll(".gallery-dot")
        const prevBtn = container.querySelector(".gallery-controls button:first-child")
        const nextBtn = container.querySelector(".gallery-controls button:last-child")
    
        let currentIndex = 0
    
        function showSlide(index) {
            // Hide all slides
            slides.forEach((slide) => slide.classList.remove("active"))
            dots.forEach((dot) => dot.classList.remove("active"))
    
            // Show current slide
            slides[index].classList.add("active")
            dots[index].classList.add("active")
            currentIndex = index
        }
    
        function nextSlide() {
            let newIndex = currentIndex + 1
            if (newIndex >= slides.length) {
            newIndex = 0
            }
            showSlide(newIndex)
        }
    
        function prevSlide() {
            let newIndex = currentIndex - 1
            if (newIndex < 0) {
            newIndex = slides.length - 1
            }
            showSlide(newIndex)
        }
    
        // Event listeners
        if (prevBtn) prevBtn.addEventListener("click", prevSlide)
        if (nextBtn) nextBtn.addEventListener("click", nextSlide)
    
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => showSlide(index))
        })
    
        // Initialize first slide
        showSlide(0)
        }
    
        // Color Picker Example
        function initializeColorPicker(container) {
        const sliders = container.querySelectorAll(".color-slider")
        const display = container.querySelector(".color-display")
        const valueDisplay = container.querySelector(".color-value")
        const redValue = container.querySelector("#redValue")
        const greenValue = container.querySelector("#greenValue")
        const blueValue = container.querySelector("#blueValue")
    
        let red = 67
        let green = 97
        let blue = 238
    
        function updateColor() {
            const color = `rgb(${red}, ${green}, ${blue})`
            display.style.backgroundColor = color
    
            // Convert to hex for display
            const hexColor = rgbToHex(red, green, blue)
            valueDisplay.textContent = hexColor
    
            // Update value displays
            if (redValue) redValue.textContent = red
            if (greenValue) greenValue.textContent = green
            if (blueValue) blueValue.textContent = blue
        }
    
        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        }
    
        // Event listeners
        sliders.forEach((slider, index) => {
            slider.addEventListener("input", function () {
            if (index === 0) {
                red = this.value
            } else if (index === 1) {
                green = this.value
            } else {
                blue = this.value
            }
            updateColor()
            })
        })
    
        // Initialize
        updateColor()
        }
    
        // Weather App Example
        function initializeWeather(container) {
        const input = container.querySelector(".weather-input")
        const searchBtn = container.querySelector(".weather-btn")
        const cityElement = container.querySelector(".weather-city")
        const tempElement = container.querySelector(".weather-temp")
        const descElement = container.querySelector(".weather-desc")
        const humidityElement = container.querySelector(".weather-detail-value:first-of-type")
        const windElement = container.querySelector(".weather-detail-value:last-of-type")
    
        // Mock weather data for demo purposes
        const weatherData = {
            "new york": { temp: "72°F", desc: "Partly Cloudy", humidity: "65%", wind: "5 mph" },
            london: { temp: "62°F", desc: "Rainy", humidity: "80%", wind: "8 mph" },
            tokyo: { temp: "78°F", desc: "Sunny", humidity: "45%", wind: "3 mph" },
            paris: { temp: "68°F", desc: "Cloudy", humidity: "70%", wind: "6 mph" },
            sydney: { temp: "82°F", desc: "Clear", humidity: "50%", wind: "7 mph" },
        }
    
        function searchWeather() {
            const city = input.value.trim().toLowerCase()
    
            if (city) {
            // Check if we have mock data for this city
            if (weatherData[city]) {
                const data = weatherData[city]
                cityElement.textContent = city.charAt(0).toUpperCase() + city.slice(1)
                tempElement.textContent = data.temp
                descElement.textContent = data.desc
                humidityElement.textContent = data.humidity
                windElement.textContent = data.wind
            } else {
                // Default data for cities not in our mock database
                cityElement.textContent = city.charAt(0).toUpperCase() + city.slice(1)
                tempElement.textContent = "70°F"
                descElement.textContent = "Partly Cloudy"
                humidityElement.textContent = "60%"
                windElement.textContent = "4 mph"
            }
            }
        }
    
        // Event listeners
        searchBtn.addEventListener("click", searchWeather)
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
            searchWeather()
            }
        })
        }
    
        // Chart Example
        function initializeChart(container) {
        const chartBars = container.querySelectorAll(".chart-bar")
    
        chartBars.forEach((bar) => {
            const value = bar.getAttribute("data-value")
    
            // Animate the bars on load
            setTimeout(() => {
            bar.style.height = `${value}%`
            }, 300)
    
            // Show tooltip on hover
            bar.addEventListener("mouseenter", () => {
            const tooltip = bar.querySelector(".chart-tooltip")
            tooltip.style.opacity = "1"
            })
    
            bar.addEventListener("mouseleave", () => {
            const tooltip = bar.querySelector(".chart-tooltip")
            tooltip.style.opacity = "0"
            })
        })
        }
    
        // Form Validation Example
        function initializeForm(container) {
        const emailInput = container.querySelector(".form-control:first-child")
        const passwordInput = container.querySelector(".form-control:last-of-type")
        const submitButton = container.querySelector(".form-submit")
    
        // Email validation
        emailInput.addEventListener("input", function () {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            const isValid = emailRegex.test(this.value)
            const errorElement = this.nextElementSibling
    
            if (isValid || this.value === "") {
            errorElement.style.display = "none"
            this.style.borderColor = "rgba(255, 255, 255, 0.2)"
            } else {
            errorElement.style.display = "block"
            this.style.borderColor = "var(--danger)"
            }
        })
    
        // Password validation
        passwordInput.addEventListener("input", function () {
            const isValid = this.value.length >= 8
            const errorElement = this.nextElementSibling
    
            if (isValid || this.value === "") {
            errorElement.style.display = "none"
            this.style.borderColor = "rgba(255, 255, 255, 0.2)"
            } else {
            errorElement.style.display = "block"
            this.style.borderColor = "var(--danger)"
            }
        })
    
        // Form submission
        submitButton.addEventListener("click", (e) => {
            // e.preventDefault()
    
            const emailValue = emailInput.value
            const passwordValue = passwordInput.value
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
            if (emailRegex.test(emailValue) && passwordValue.length >= 8) {
            showToast("Success", "Form submitted successfully!", "success")
            emailInput.value = ""
            passwordInput.value = ""
            } else {
            showToast("Error", "Please fix the errors in the form.", "error")
            }
        })
        }
    
        // Like and Review Functionality
        const likeButtons = document.querySelectorAll(".like-btn")
        const commentButtons = document.querySelectorAll(".comment-btn")
        const reviewForms = document.querySelectorAll(".review-form")
    
        // Store likes and reviews in localStorage
        const likes = JSON.parse(localStorage.getItem("likes")) || {}
        const globalReviews = JSON.parse(localStorage.getItem("globalReviews")) || []
    
        // Initialize like counts
        likeButtons.forEach((button) => {
        const id = button.getAttribute("data-id")
        const likeCount = button.querySelector(".like-count") || button.nextElementSibling
    
        // Set initial count
        likeCount.textContent = likes[id] ? likes[id].count : "0"
    
        // Check if user has liked this example
        if (likes[id] && likes[id].liked) {
            button.classList.add("active")
        }
    
        // Add click event
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id")
    
            if (!likes[id]) {
            likes[id] = { count: 0, liked: false }
            }
    
            if (likes[id].liked) {
            // Unlike
            likes[id].count--
            likes[id].liked = false
            this.classList.remove("active")
            } else {
            // Like
            likes[id].count++
            likes[id].liked = true
            this.classList.add("active")
            }
    
            // Update all like counts for this ID
            document
            .querySelectorAll(`.like-btn[data-id="${id}"] .like-count, .like-btn[data-id="${id}"] + .like-count`)
            .forEach((count) => {
                count.textContent = likes[id].count
            })
    
            // Save to localStorage
            localStorage.setItem("likes", JSON.stringify(likes))
        })
        })
    
        // Initialize comment counts
        commentButtons.forEach((button) => {
        const id = button.getAttribute("data-id")
        const commentCount = button.querySelector(".comment-count")
    
        // Set initial count based on global reviews
        const count = globalReviews.length
        commentCount.textContent = count
    
        // Add click event to open modal with comments tab
        button.addEventListener("click", function (e) {
            e.stopPropagation()
            const card = this.closest(".code-card")
            const id = card.getAttribute("data-id")
            currentExampleId = id // Store the current example ID
            const title = card.querySelector(".card-title").textContent
            const description = card.querySelector(".card-description").textContent
    
            modalTitle.textContent = title
            modalSubtitle.textContent = description
    
            // Update active tab to explanation (which has the comments)
            document.querySelectorAll(".modal-tab").forEach((tab) => {
            if (tab.getAttribute("data-tab") === "explanation") {
                tab.classList.add("active")
            } else {
                tab.classList.remove("active")
            }
            })
    
            // Update active content
            document.querySelectorAll(".modal-content").forEach((content) => {
            if (content.getAttribute("data-content") === "explanation") {
                content.classList.add("active")
            } else {
                content.classList.remove("active")
            }
            })
    
            // Show modal
            modal.classList.add("active")
    
            // Initialize the example in the result tab
            initializeExample(id)
    
            // Load reviews
            loadReviews()
        })
        })
    
        // Handle review submissions
        reviewForms.forEach((form) => {
        form.addEventListener("submit", function (e) {
            e.preventDefault()
    
            const textarea = this.querySelector(".review-input")
            const reviewText = textarea.value.trim()
    
            if (reviewText) {
            // Create new review
            const review = {
                id: Date.now(),
                text: reviewText,
                author: "User",
                date: new Date().toLocaleDateString(),
            }
    
            // Add to global reviews
            globalReviews.unshift(review)
    
            // Save to localStorage
            localStorage.setItem("globalReviews", JSON.stringify(globalReviews))
    
            // Update comment counts for all examples
            document.querySelectorAll(".comment-count").forEach((count) => {
                count.textContent = globalReviews.length
            })
    
            // Clear textarea
            textarea.value = ""
    
            // Update reviews display
            loadReviews()
    
            // Show success message
            showToast("Success", "Review submitted successfully!", "success")
            }
        })
        })
    
        // Load reviews for all examples
        function loadReviews() {
        const reviewsList = document.getElementById("global-reviews-list")
        const reviewCounts = document.querySelectorAll(".review-count")
    
        // Update review counts
        reviewCounts.forEach((count) => {
            count.textContent = `${globalReviews.length} reviews`
        })
    
        // Update reviews list
        if (reviewsList) {
            reviewsList.innerHTML = ""
    
            if (globalReviews.length === 0) {
            reviewsList.innerHTML = '<p class="text-gray">No reviews yet. Be the first to review!</p>'
            } else {
            globalReviews.forEach((review) => {
                const li = document.createElement("li")
                li.className = "review-item"
                li.innerHTML = `
                            <div class="review-item-header">
                                <div class="review-author">${review.author}</div>
                                <div class="review-date">${review.date}</div>
                            </div>
                            <div class="review-content">${review.text}</div>
                        `
                reviewsList.appendChild(li)
            })
            }
        }
        }
    
        // Initialize all reviews on page load
        loadReviews()
    
        // Enhanced User Status Management
        let notifications = 0
    
        // Function to update UI based on user status
        function updateUserStatus() {
            const upgradeLink = document.getElementById("upgradeLink");
    const userStatusBadge = document.getElementById("userStatusBadge");
    const upgradeText = document.getElementById("upgradeText");
    const userPlanDisplay = document.getElementById("userPlanDisplay");
    const proBanner = document.getElementById("proBanner");
    const premiumContents = document.querySelectorAll(".premium-code");
    const notificationBadge = document.getElementById("notificationBadge");

            if (isProUser) {
                const upgradeLink = document.getElementById("upgradeLink");
                if (upgradeLink) {
                  upgradeLink.style.display = "none";
                }
              } else {
                const upgradeLink = document.getElementById("upgradeLink");
                if (upgradeLink) {
                  upgradeLink.style.display = "block";
                }
              }
            }              
          
    
        // Update code visibility based on user status
        function updateCodeVisibility() {
        const codeProOverlay = document.getElementById("codeProOverlay")
    
        if (!isProUser && codeProOverlay) {
            codeProOverlay.classList.add("active")
        } else if (codeProOverlay) {
            codeProOverlay.classList.remove("active")
        }
        }
    
        // Pro Upgrade Modal
        function showProUpgradeModal() {
        const proUpgradeModal = document.getElementById("proUpgradeModal")
        proUpgradeModal.classList.add("active")
    
        // Close button
        const closeBtn = document.getElementById("proModalClose")
        closeBtn.addEventListener("click", () => {
            proUpgradeModal.classList.remove("active")
        })
    
        // Close when clicking outside
        proUpgradeModal.addEventListener("click", (e) => {
            if (e.target === proUpgradeModal) {
            proUpgradeModal.classList.remove("active")
            }
        })
    
        // Plan buttons
        const monthlyPlanBtn = document.getElementById("monthlyPlanBtn")
        const yearlyPlanBtn = document.getElementById("yearlyPlanBtn")
    
        monthlyPlanBtn.addEventListener("click", () => {
            upgradeToPro("monthly")
            proUpgradeModal.classList.remove("active")
        })
    
        yearlyPlanBtn.addEventListener("click", () => {
            upgradeToPro("yearly")
            proUpgradeModal.classList.remove("active")
        })
        }
    
        // Upgrade to Pro function
        function upgradeToPro(plan) {
    
        updateUserStatus()
    
        // Show success message
        const planText = plan === "monthly" ? "Monthly" : "Yearly"
        showToast(
            "Upgrade Successful!",
            `You've been upgraded to the ${planText} Pro plan. Enjoy all premium features!`,
            "success",
        )
    
        // Simulate new notifications
        setTimeout(() => {
            const notificationBadge = document.getElementById("notificationBadge")
            notifications = 3
            notificationBadge.textContent = notifications
            notificationBadge.style.display = "flex"
        }, 2000)
        }
    
        // Toggle Pro/Free status (for demo purposes)
        document.getElementById("upgradeLink").addEventListener("click", (e) => {
        e.preventDefault()
    
        if (isProUser) {
            // Downgrade
        
            updateUserStatus()
    
            // Show downgrade message
            showToast(
            "Downgraded to Free",
            "Your account has been downgraded to the Free plan. Premium content is now locked.",
            "warning",
            )
        } else {
            // Show upgrade modal
            showProUpgradeModal()
        }
        })
    
        // Pro Banner Button
        document.getElementById("proBannerBtn").addEventListener("click", (e) => {
        e.preventDefault()
        showProUpgradeModal()
        })
    
        // Pro Banner Close
        document.getElementById("proBannerClose").addEventListener("click", (e) => {
        e.preventDefault()
        const proBanner = document.getElementById("proBanner")
        proBanner.classList.add("hidden")
    
        // Store in localStorage to remember user preference
        localStorage.setItem("proBannerClosed", "true")
        })
    
        // Check if banner was previously closed
        if (localStorage.getItem("proBannerClosed") === "true") {
        const proBanner = document.getElementById("proBanner")
        proBanner.classList.add("hidden")
        }
    
        // User dropdown menu toggle
        const userMenuBtn = document.getElementById("userMenuBtn")
        const userMenu = document.querySelector(".user-menu")
    
        userMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        userMenu.classList.toggle("active")
        })
    
        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
        if (!userMenu.contains(e.target)) {
            userMenu.classList.remove("active")
        }
        })
    
        // Notification bell click
        document.querySelector(".notification-bell").addEventListener("click", () => {
        if (notifications > 0) {
            showToast("Notifications", "You have new features available as a Pro user!", "info")
            notifications = 0
            document.getElementById("notificationBadge").textContent = "0"
            document.getElementById("notificationBadge").style.display = "none"
        } else {
            showToast("No Notifications", "You have no new notifications at this time.", "info")
        }
        })
    
        // Handle premium content clicks
        document.querySelectorAll(".premium-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation()
            if (!isProUser) {
            e.preventDefault()
            showProUpgradeModal()
            }
        })
        })
    
        // Code Pro Button
        document.getElementById("codeProBtn").addEventListener("click", () => {
        showProUpgradeModal()
        })
    
        // Active navigation link
        const navLinks = document.querySelectorAll(".nav-link")
    
        navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            // e.preventDefault()
            navLinks.forEach((l) => l.classList.remove("active"))
            this.classList.add("active")
    
            // Show different content based on navigation
            const linkText = this.textContent.trim().toLowerCase()
    
            if (linkText === "your code" && !isProUser) {
            showToast(
                "Pro Feature",
                'The "Your Code" section is available only for Pro users. Upgrade to access this feature!',
                "warning",
            )
            }
        })
        })
    
        // Initialize user status on page load
        updateUserStatus()
    
        // Welcome message on first load
        if (!localStorage.getItem("welcomeShown")) {
        setTimeout(() => {
            showToast(
            "Welcome to CodeShowcase!",
            "Browse our collection of code examples or upgrade to Pro to access premium content.",
            "info",
            )
            localStorage.setItem("welcomeShown", "true")
        }, 1000)
        }
        
    })
    document.addEventListener("DOMContentLoaded", () => {
        // User dropdown menu toggle
        const userMenuBtn = document.getElementById("userMenuBtn");
        const userMenu = document.querySelector(".user-menu");
    
        userMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        userMenu.classList.toggle("active");
        });
    
        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
        if (!userMenu.contains(e.target)) {
            userMenu.classList.remove("active");
        }
        });
    
        // Toggle Pro/Free status (for demo purposes)
        document.getElementById("upgradeLink").addEventListener("click", (e) => {
        e.preventDefault();
    
        if (isProUser) {
            // Downgrade
           
            updateUserStatus();
            showToast("Downgraded to Free", "Your account has been downgraded to the Free plan. Premium content is now locked.", "warning");
        } else {
            showProUpgradeModal();
        }
        });
    
        // Pro Banner Button
        document.getElementById("proBannerBtn").addEventListener("click", (e) => {
        e.preventDefault();
        showProUpgradeModal();
        });
    
        // Pro Banner Close
        document.getElementById("proBannerClose").addEventListener("click", (e) => {
        e.preventDefault();
        const proBanner = document.getElementById("proBanner");
        proBanner.classList.add("hidden");
        localStorage.setItem("proBannerClosed", "true");
        });
    
        // Check if banner was previously closed
        if (localStorage.getItem("proBannerClosed") === "true") {
        document.getElementById("proBanner").classList.add("hidden");
        }
    
        // Notification bell click
        document.querySelector(".notification-bell").addEventListener("click", () => {
        if (notifications > 0) {
            showToast("Notifications", "You have new features available as a Pro user!", "info");
            notifications = 0;
            document.getElementById("notificationBadge").textContent = "0";
            document.getElementById("notificationBadge").style.display = "none";
        } else {
            showToast("No Notifications", "You have no new notifications at this time.", "info");
        }
        });
    
        // Navigation link activation
        const navLinks = document.querySelectorAll(".nav-link");
    
        navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            // e.preventDefault();
            navLinks.forEach((l) => l.classList.remove("active"));
            this.classList.add("active");
    
            // Show warning if accessing Pro-only section
            const linkText = this.textContent.trim().toLowerCase();
            if (linkText === "your code" && !isProUser) {
            showToast("Pro Feature", 'The "Your Code" section is available only for Pro users. Upgrade to access this feature!', "warning");
            }
        });
        });
    
        // Initialize user status on page load
        updateUserStatus();
    
        // Show welcome message only once
        if (!localStorage.getItem("welcomeShown")) {
        setTimeout(() => {
            showToast("Welcome to CodeShowcase!", "Browse our collection of code examples or upgrade to Pro to access premium content.", "info");
            localStorage.setItem("welcomeShown", "true");
        }, 1000);
        }
    });
    
    // User role and UI updates
 
    let notifications = 0;
    
    function updateUserStatus() {
        const upgradeLink = document.getElementById("upgradeLink");
        const userStatusBadge = document.getElementById("userStatusBadge");
        const upgradeText = document.getElementById("upgradeText");
        const userPlanDisplay = document.getElementById("userPlanDisplay");
        const proBanner = document.getElementById("proBanner");
        const premiumContents = document.querySelectorAll(".premium-code");
        const notificationBadge = document.getElementById("notificationBadge");
    
        if (isProUser) {
            // Hide "Upgrade to Pro" link
            if (upgradeLink) {
                upgradeLink.style.display = "none";
            }
    
            userStatusBadge.textContent = "Pro";
            userStatusBadge.classList.add("pro");
            userStatusBadge.classList.remove("free");
    
            upgradeText.textContent = "Manage Subscription";
            userPlanDisplay.textContent = "Pro Plan";
            userPlanDisplay.style.backgroundColor = "rgba(114, 9, 183, 0.1)";
            userPlanDisplay.style.color = "#7209b7";
    
            proBanner.classList.add("hidden");
    
            // Show premium content
            premiumContents.forEach((content) => {
                const preview = content.querySelector(".card-preview");
                if (preview) preview.style.filter = "none";
    
                const viewBtn = content.querySelector(".view-btn");
                if (viewBtn) {
                    viewBtn.innerHTML = "View Code";
                    viewBtn.classList.remove("premium-btn");
                }
            });
    
            // Notification logic
            if (notifications === 0) {
                notifications = 3;
                notificationBadge.textContent = notifications;
                notificationBadge.style.display = "flex";
                showToast("Welcome to Pro!", "You now have access to all premium content and features.", "success");
            }
    
        } else {
            // Show "Upgrade to Pro" link
            if (upgradeLink) {
                upgradeLink.style.display = "block";
            }
    
            userStatusBadge.textContent = "Free";
            userStatusBadge.classList.add("free");
            userStatusBadge.classList.remove("pro");
    
            userPlanDisplay.textContent = "Free Plan";
            userPlanDisplay.style.backgroundColor = "rgba(108, 117, 125, 0.1)";
            userPlanDisplay.style.color = "#6c757d";
    
            proBanner.classList.remove("hidden");
    
            premiumContents.forEach((content) => {
                const viewBtn = content.querySelector(".view-btn");
                if (viewBtn && !viewBtn.classList.contains("premium-btn")) {
                    viewBtn.innerHTML = '<i class="fas fa-lock"></i> Unlock';
                    viewBtn.classList.add("premium-btn");
                }
            });
    
            notifications = 0;
            notificationBadge.textContent = "0";
            notificationBadge.style.display = "none";
        }
    
        updateCodeVisibility();
    }
    
    
    // Dummy function for showing toasts
    function showToast(title, message, type = "info") {
        console.log(`[${type.toUpperCase()}] ${title}: ${message}`);
    }
    const userMenu = document.querySelector(".user-menu")
    
        userMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        userMenu.classList.toggle("active")
        })
    
        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
        if (!userMenu.contains(e.target)) {
            userMenu.classList.remove("active")
        }
        })
    
        // Notification bell click
        document.querySelector(".notification-bell").addEventListener("click", () => {
        if (notifications > 0) {
            showToast("Notifications", "You have new features available as a Pro user!", "info")
            notifications = 0
            document.getElementById("notificationBadge").textContent = "0"
            document.getElementById("notificationBadge").style.display = "none"
        } else {
            showToast("No Notifications", "You have no new notifications at this time.", "info")
        }
        })
    
        // Handle premium content clicks
        document.querySelectorAll(".premium-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation()
            if (!isProUser) {
            // e.preventDefault()
            showProUpgradeModal()
            }
        })
        })
    
        // Code Pro Button
        document.getElementById("codeProBtn").addEventListener("click", () => {
        showProUpgradeModal()
        })
        function initializeNavbar() {
            // All DOMContentLoaded logic moved here
            const userMenuBtn = document.getElementById("userMenuBtn")
            const userMenu = document.querySelector(".user-menu")
            const upgradeLink = document.getElementById("upgradeLink")
            const proBannerBtn = document.getElementById("proBannerBtn")
            const proBannerClose = document.getElementById("proBannerClose")
            const proBanner = document.getElementById("proBanner")
            const notificationBell = document.querySelector(".notification-bell")
            const notificationBadge = document.getElementById("notificationBadge")
            const navLinks = document.querySelectorAll(".nav-link")
            const codeProBtn = document.getElementById("codeProBtn")
        
          
            let notifications = 0
        
            function updateUserStatus() {
            const userStatusBadge = document.getElementById("userStatusBadge")
            const upgradeText = document.getElementById("upgradeText")
            const userPlanDisplay = document.getElementById("userPlanDisplay")
        
            if (isProUser) {
                userStatusBadge.textContent = "Pro"
                userStatusBadge.classList.replace("free", "pro")
        
                upgradeText.textContent = "Manage Subscription"
                userPlanDisplay.textContent = "Pro Plan"
                userPlanDisplay.style.backgroundColor = "rgba(114, 9, 183, 0.1)"
                userPlanDisplay.style.color = "#7209b7"
        
                proBanner.classList.add("hidden")
        
                if (notifications === 0) {
                notifications = 3
                notificationBadge.textContent = notifications
                notificationBadge.style.display = "flex"
                showToast("Welcome to Pro!", "You now have access to all premium content and features.", "success")
                }
            } else {
                

        
                proBanner.classList.remove("hidden")
                notifications = 0
                notificationBadge.textContent = "0"
                notificationBadge.style.display = "none"
            }
            }
        
            function showToast(title, message, type = "info") {
            console.log(`[${type.toUpperCase()}] ${title}: ${message}`)
            }
        
            // Event Listeners
            if (userMenuBtn && userMenu) {
            userMenuBtn.addEventListener("click", (e) => {
                e.stopPropagation()
                userMenu.classList.toggle("active")
            })
        
            document.addEventListener("click", (e) => {
                if (!userMenu.contains(e.target)) {
                userMenu.classList.remove("active")
                }
            })
            }
        
            if (upgradeLink) {
            upgradeLink.addEventListener("click", (e) => {
                e.preventDefault()
                if (isProUser) {
                updateUserStatus()
                showToast("Downgraded to Free", "Your account has been downgraded to the Free plan. Premium content is now locked.", "warning")
                } else {
                showToast("Upgrade", "Show upgrade modal here", "info")
                }
            })
            }
        
            if (proBannerBtn) {
            proBannerBtn.addEventListener("click", (e) => {
                e.preventDefault()
                showToast("Upgrade", "Show upgrade modal here", "info")
            })
            }
        
            if (proBannerClose) {
            proBannerClose.addEventListener("click", (e) => {
                e.preventDefault()
                proBanner.classList.add("hidden")
                localStorage.setItem("proBannerClosed", "true")
            })
            }
        
            if (localStorage.getItem("proBannerClosed") === "true") {
            proBanner.classList.add("hidden")
            }
        
            if (notificationBell) {
            notificationBell.addEventListener("click", () => {
                if (notifications > 0) {
                showToast("Notifications", "You have new features available as a Pro user!", "info")
                notifications = 0
                notificationBadge.textContent = "0"
                notificationBadge.style.display = "none"
                } else {
                showToast("No Notifications", "You have no new notifications at this time.", "info")
                }
            })
            }
        
            navLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                // e.preventDefault()
                navLinks.forEach((l) => l.classList.remove("active"))
                this.classList.add("active")
        
                const linkText = this.textContent.trim().toLowerCase()
                if (linkText === "your code" && !isProUser) {
                showToast("Pro Feature", 'The "Your Code" section is available only for Pro users. Upgrade to access this feature!', "warning")
                }
            })
            })
        
            if (codeProBtn) {
            codeProBtn.addEventListener("click", () => {
                showToast("Upgrade", "Show upgrade modal here", "info")
            })
            }
        
            // Init
            updateUserStatus()
        
            if (!localStorage.getItem("welcomeShown")) {
            setTimeout(() => {
                showToast("Welcome to CodeShowcase!", "Browse our collection of code examples or upgrade to Pro to access premium content.", "info")
                localStorage.setItem("welcomeShown", "true")
            }, 1000)
            }
        
            function showProUpgradeModal() {
                const modal = document.getElementById("proUpgradeModal");
                if (modal) modal.classList.add("active");
            }
            window.showProUpgradeModal = showProUpgradeModal;
            }
        
        // Optional: Auto-init if needed (like in navbar.html)
        if (document.getElementById("userMenuBtn")) {
            initializeNavbar()
        } // only runs if the navbar exists at load time
        