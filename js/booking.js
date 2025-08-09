// Class booking system for the fitness platform

class BookingSystem {
    constructor() {
        this.bookedClasses = [];
        this.selectedDate = new Date();
        this.selectedTime = null;
        this.init();
    }
    
    init() {
        // Load booked classes from localStorage
        const savedBookings = utils.storage.get('bookedClasses');
        if (savedBookings) {
            this.bookedClasses = savedBookings;
        }
        
        this.bindEvents();
    }
    
    bindEvents() {
        // Book class buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('book-class') || e.target.closest('.book-class')) {
                const btn = e.target.classList.contains('book-class') ? e.target : e.target.closest('.book-class');
                const classId = parseInt(btn.dataset.classId);
                this.openBookingModal(classId);
            }
        });
        
        // Cancel booking buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('cancel-booking')) {
                const bookingId = parseInt(e.target.dataset.bookingId);
                this.cancelBooking(bookingId);
            }
        });
        
        // Booking form submission
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'booking-form') {
                e.preventDefault();
                this.handleBooking(e.target);
            }
        });
        
        // Date selection
        document.addEventListener('change', (e) => {
            if (e.target.id === 'booking-date') {
                this.selectedDate = new Date(e.target.value);
                this.updateAvailableSlots();
            }
        });
        
        // Time slot selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('time-slot')) {
                document.querySelectorAll('.time-slot').forEach(slot => {
                    slot.classList.remove('selected');
                });
                e.target.classList.add('selected');
                this.selectedTime = e.target.dataset.time;
            }
        });
    }
    
    openBookingModal(classId) {
        if (!auth.isUserLoggedIn()) {
            utils.showNotification('Please log in to book classes', 'warning');
            showPage('login');
            return;
        }
        
        const classData = mockData.classes.find(c => c.id === classId);
        if (!classData) return;
        
        const modal = document.getElementById('booking-modal');
        const modalContent = document.getElementById('booking-modal-content');
        
        if (!modal || !modalContent) return;
        
        modalContent.innerHTML = this.createBookingForm(classData);
        modal.classList.add('active');
        
        // Initialize calendar
        this.initBookingCalendar(classData);
    }
    
    createBookingForm(classData) {
        return `
            <div class="booking-class-info">
                <img src="${classData.image}" alt="${classData.name}" class="booking-class-image">
                <div class="booking-class-details">
                    <h3>${classData.name}</h3>
                    <p><i class="fas fa-user"></i> ${classData.trainer}</p>
                    <p><i class="fas fa-clock"></i> ${classData.duration} minutes</p>
                    <p><i class="fas fa-dollar-sign"></i> ${utils.formatCurrency(classData.price)}</p>
                    <div class="difficulty-badge ${classData.difficulty}">
                        ${classData.difficulty.charAt(0).toUpperCase() + classData.difficulty.slice(1)}
                    </div>
                </div>
            </div>
            
            <form id="booking-form">
                <input type="hidden" name="classId" value="${classData.id}">
                
                <div class="form-group">
                    <label for="booking-date">Select Date</label>
                    <input type="date" id="booking-date" name="date" required min="${this.getTodayDate()}">
                </div>
                
                <div class="form-group">
                    <label>Available Time Slots</label>
                    <div class="time-slots" id="time-slots">
                        <!-- Populated by updateAvailableSlots -->
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="booking-notes">Special Notes (Optional)</label>
                    <textarea id="booking-notes" name="notes" placeholder="Any special requirements or notes..."></textarea>
                </div>
                
                <div class="booking-summary">
                    <div class="summary-item">
                        <span>Class:</span>
                        <span>${classData.name}</span>
                    </div>
                    <div class="summary-item">
                        <span>Trainer:</span>
                        <span>${classData.trainer}</span>
                    </div>
                    <div class="summary-item">
                        <span>Duration:</span>
                        <span>${classData.duration} minutes</span>
                    </div>
                    <div class="summary-item total">
                        <span>Total:</span>
                        <span>${utils.formatCurrency(classData.price)}</span>
                    </div>
                </div>
                
                <div class="booking-actions">
                    <button type="button" class="btn-secondary" onclick="closeModal('booking-modal')">Cancel</button>
                    <button type="submit" class="btn-primary">Book Class</button>
                </div>
            </form>
        `;
    }
    
    initBookingCalendar(classData) {
        const dateInput = document.getElementById('booking-date');
        if (dateInput) {
            // Set default date to today
            dateInput.value = this.getTodayDate();
            this.selectedDate = new Date();
            this.updateAvailableSlots(classData);
        }
    }
    
    updateAvailableSlots(classData) {
        const timeSlotsContainer = document.getElementById('time-slots');
        if (!timeSlotsContainer || !classData) return;
        
        // Get the day of the week for the selected date
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const selectedDay = dayNames[this.selectedDate.getDay()];
        
        // Find available slots for the selected day
        const availableSlots = classData.schedule.filter(slot => slot.day === selectedDay);
        
        if (availableSlots.length === 0) {
            timeSlotsContainer.innerHTML = `
                <p class="no-slots">No classes available on ${selectedDay}</p>
            `;
            return;
        }
        
        timeSlotsContainer.innerHTML = availableSlots.map(slot => {
            const isBooked = this.isSlotBooked(classData.id, this.selectedDate, slot.time);
            const spotsLeft = classData.capacity - (classData.enrolled || 0);
            
            return `
                <button type="button" class="time-slot ${isBooked ? 'booked' : ''}" 
                        data-time="${slot.time}" 
                        ${isBooked || spotsLeft <= 0 ? 'disabled' : ''}>
                    <span class="slot-time">${slot.time}</span>
                    <span class="slot-info">${spotsLeft} spots left</span>
                </button>
            `;
        }).join('');
        
        // Add styles
        this.styleTimeSlots();
    }
    
    styleTimeSlots() {
        const timeSlots = document.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            slot.style.cssText = `
                display: block;
                width: 100%;
                padding: var(--spacing-md);
                margin-bottom: var(--spacing-sm);
                border: 2px solid var(--gray-200);
                border-radius: var(--radius-lg);
                background: var(--white);
                cursor: pointer;
                transition: all var(--transition-fast);
                text-align: left;
            `;
            
            const slotTime = slot.querySelector('.slot-time');
            if (slotTime) {
                slotTime.style.cssText = `
                    display: block;
                    font-weight: 600;
                    color: var(--gray-900);
                    margin-bottom: var(--spacing-xs);
                `;
            }
            
            const slotInfo = slot.querySelector('.slot-info');
            if (slotInfo) {
                slotInfo.style.cssText = `
                    font-size: var(--font-size-sm);
                    color: var(--gray-600);
                `;
            }
            
            // Hover and selection states
            slot.addEventListener('mouseenter', () => {
                if (!slot.disabled) {
                    slot.style.borderColor = 'var(--primary)';
                    slot.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
                }
            });
            
            slot.addEventListener('mouseleave', () => {
                if (!slot.classList.contains('selected')) {
                    slot.style.borderColor = 'var(--gray-200)';
                    slot.style.backgroundColor = 'var(--white)';
                }
            });
            
            // Disabled state
            if (slot.disabled) {
                slot.style.opacity = '0.5';
                slot.style.cursor = 'not-allowed';
            }
        });
    }
    
    async handleBooking(form) {
        const formData = new FormData(form);
        const classId = parseInt(formData.get('classId'));
        const date = formData.get('date');
        const notes = formData.get('notes');
        
        if (!this.selectedTime) {
            utils.showNotification('Please select a time slot', 'error');
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        utils.showLoading(submitBtn, 'Booking...');
        
        try {
            // Simulate booking API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const classData = mockData.classes.find(c => c.id === classId);
            const booking = {
                id: Date.now(),
                classId: classId,
                className: classData.name,
                trainer: classData.trainer,
                date: date,
                time: this.selectedTime,
                notes: notes,
                status: 'confirmed',
                bookedAt: new Date().toISOString()
            };
            
            this.bookedClasses.push(booking);
            this.saveBookings();
            
            utils.showNotification('Class booked successfully!', 'success');
            closeModal('booking-modal');
            
            // Send confirmation email (simulated)
            this.sendBookingConfirmation(booking);
            
        } catch (error) {
            utils.showNotification('Booking failed. Please try again.', 'error');
        } finally {
            utils.hideLoading(submitBtn);
        }
    }
    
    cancelBooking(bookingId) {
        if (confirm('Are you sure you want to cancel this booking?')) {
            this.bookedClasses = this.bookedClasses.filter(booking => booking.id !== bookingId);
            this.saveBookings();
            utils.showNotification('Booking cancelled successfully', 'info');
            
            // Refresh the page content if we're on dashboard
            if (document.getElementById('dashboard').classList.contains('active')) {
                this.updateUpcomingClasses();
            }
        }
    }
    
    isSlotBooked(classId, date, time) {
        const dateStr = date.toISOString().split('T')[0];
        return this.bookedClasses.some(booking => 
            booking.classId === classId && 
            booking.date === dateStr && 
            booking.time === time
        );
    }
    
    getUserBookings() {
        return this.bookedClasses.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    getUpcomingBookings() {
        const today = new Date().toISOString().split('T')[0];
        return this.bookedClasses.filter(booking => booking.date >= today);
    }
    
    saveBookings() {
        utils.storage.set('bookedClasses', this.bookedClasses);
    }
    
    getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }
    
    updateUpcomingClasses() {
        const upcomingContainer = document.getElementById('upcoming-classes');
        if (!upcomingContainer) return;
        
        const upcomingBookings = this.getUpcomingBookings().slice(0, 5);
        
        if (upcomingBookings.length === 0) {
            upcomingContainer.innerHTML = `
                <p class="no-bookings">No upcoming classes</p>
            `;
            return;
        }
        
        upcomingContainer.innerHTML = upcomingBookings.map(booking => `
            <div class="upcoming-class-item">
                <div class="class-info">
                    <h4>${booking.className}</h4>
                    <p><i class="fas fa-user"></i> ${booking.trainer}</p>
                    <p><i class="fas fa-calendar"></i> ${utils.formatDate(booking.date)}</p>
                    <p><i class="fas fa-clock"></i> ${booking.time}</p>
                </div>
                <div class="class-actions">
                    <button class="btn-secondary btn-sm cancel-booking" data-booking-id="${booking.id}">
                        Cancel
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    sendBookingConfirmation(booking) {
        // Simulate sending email confirmation
        console.log('Booking confirmation sent:', booking);
        
        // In a real app, this would call an API to send an email
        setTimeout(() => {
            utils.showNotification('Confirmation email sent!', 'info');
        }, 2000);
    }
}

// Initialize booking system
const booking = new BookingSystem();

// Export booking instance
window.booking = booking;