/**
 * Cal.com API Integration
 * Professional appointment booking system
 */

class CalComIntegration {
  constructor(config = {}) {
    this.apiKey = config.apiKey || '';
    this.baseUrl = 'https://api.cal.com/v1';
    this.eventTypeId = config.eventTypeId || '';
    this.organizerId = config.organizerId || '';
    
    this.initializeBookingModal();
    this.setupEventListeners();
  }

  /**
   * Initialize the booking modal with beautiful design
   */
  initializeBookingModal() {
    const modalHTML = `
      <div id="cal-booking-modal" class="cal-modal-overlay">
        <div class="cal-modal-content">
          <div class="cal-modal-header">
            <h2 class="cal-modal-title">
              <span data-ru="Запланировать встречу" data-en="Schedule a Meeting">Запланировать встречу</span>
            </h2>
            <button class="cal-modal-close">&times;</button>
          </div>
          
          <div class="cal-modal-body">
            <div class="cal-loading-state" id="cal-loading">
              <div class="cal-spinner"></div>
              <p data-ru="Загрузка доступного времени..." data-en="Loading available times...">Загрузка доступного времени...</p>
            </div>
            
            <div class="cal-booking-form" id="cal-booking-form" style="display: none;">
              <div class="cal-step cal-step-1 active">
                <h3 data-ru="Выберите дату" data-en="Choose Date">Выберите дату</h3>
                <div class="cal-calendar" id="cal-calendar"></div>
              </div>
              
              <div class="cal-step cal-step-2">
                <h3 data-ru="Выберите время" data-en="Choose Time">Выберите время</h3>
                <div class="cal-time-slots" id="cal-time-slots"></div>
              </div>
              
              <div class="cal-step cal-step-3">
                <h3 data-ru="Ваши данные" data-en="Your Details">Ваши данные</h3>
                <form class="cal-user-form" id="cal-user-form">
                  <div class="cal-form-group">
                    <label data-ru="Имя" data-en="Name">Имя *</label>
                    <input type="text" name="name" required>
                  </div>
                  <div class="cal-form-group">
                    <label>Email *</label>
                    <input type="email" name="email" required>
                  </div>
                  <div class="cal-form-group">
                    <label data-ru="Телефон" data-en="Phone">Телефон</label>
                    <input type="tel" name="phone">
                  </div>
                  <div class="cal-form-group">
                    <label data-ru="Комментарий" data-en="Message">Комментарий</label>
                    <textarea name="message" rows="3"></textarea>
                  </div>
                  <div class="cal-form-actions">
                    <button type="button" class="cal-btn cal-btn-secondary" id="cal-back-btn">
                      <span data-ru="Назад" data-en="Back">Назад</span>
                    </button>
                    <button type="submit" class="cal-btn cal-btn-primary" id="cal-confirm-btn">
                      <span data-ru="Подтвердить встречу" data-en="Confirm Meeting">Подтвердить встречу</span>
                    </button>
                  </div>
                </form>
              </div>
              
              <div class="cal-step cal-step-4">
                <div class="cal-success-message">
                  <div class="cal-success-icon">✅</div>
                  <h3 data-ru="Встреча запланирована!" data-en="Meeting Scheduled!">Встреча запланирована!</h3>
                  <p data-ru="Мы отправили вам подтверждение на email" data-en="We've sent you a confirmation email">
                    Мы отправили вам подтверждение на email
                  </p>
                  <button class="cal-btn cal-btn-primary" id="cal-close-success">
                    <span data-ru="Закрыть" data-en="Close">Закрыть</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('cal-booking-modal');
  }

  /**
   * Set up event listeners for booking buttons and modal interactions
   */
  setupEventListeners() {
    // Handle booking button clicks
    document.querySelectorAll('.cal-booking-btn, [data-cal-link]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openBookingModal();
      });
    });

    // Handle modal close
    const closeBtn = this.modal.querySelector('.cal-modal-close');
    closeBtn.addEventListener('click', () => this.closeModal());

    // Handle form submissions
    const userForm = document.getElementById('cal-user-form');
    userForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleBookingSubmission(e.target);
    });

    // Handle navigation buttons
    document.getElementById('cal-back-btn').addEventListener('click', () => {
      this.navigateStep('back');
    });

    document.getElementById('cal-close-success').addEventListener('click', () => {
      this.closeModal();
    });

    // Close modal when clicking outside
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });
  }

  /**
   * Open the booking modal and initialize calendar
   */
  async openBookingModal() {
    this.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    try {
      await this.loadAvailableSlots();
      this.initializeCalendar();
      this.showStep(1);
    } catch (error) {
      console.error('Error loading booking data:', error);
      this.showError('Failed to load booking information. Please try again.');
    }
  }

  /**
   * Close the modal and reset state
   */
  closeModal() {
    this.modal.style.display = 'none';
    document.body.style.overflow = '';
    this.resetModal();
  }

  /**
   * Load available time slots from Cal.com API
   */
  async loadAvailableSlots() {
    const loading = document.getElementById('cal-loading');
    const form = document.getElementById('cal-booking-form');
    
    loading.style.display = 'block';
    form.style.display = 'none';

    try {
      // Simulate API call - replace with actual Cal.com API integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would call:
      // const response = await this.calComAPI.getAvailableSlots();
      
      loading.style.display = 'none';
      form.style.display = 'block';
    } catch (error) {
      throw new Error('Failed to load available slots');
    }
  }

  /**
   * Initialize calendar component
   */
  initializeCalendar() {
    const calendar = document.getElementById('cal-calendar');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Generate calendar for next 30 days
    let calendarHTML = '<div class="cal-calendar-grid">';
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' });
      const dayNumber = date.getDate();
      const isToday = i === 0;
      
      calendarHTML += `
        <div class="cal-day-slot ${isToday ? 'today' : ''}" 
             data-date="${date.toISOString().split('T')[0]}"
             onclick="calBooking.selectDate('${date.toISOString().split('T')[0]}')">
          <div class="cal-day-name">${dayName}</div>
          <div class="cal-day-number">${dayNumber}</div>
        </div>
      `;
    }
    
    calendarHTML += '</div>';
    calendar.innerHTML = calendarHTML;
  }

  /**
   * Handle date selection
   */
  selectDate(date) {
    // Remove previous selections
    document.querySelectorAll('.cal-day-slot').forEach(slot => {
      slot.classList.remove('selected');
    });

    // Mark selected date
    const selectedSlot = document.querySelector(`[data-date="${date}"]`);
    selectedSlot.classList.add('selected');

    this.selectedDate = date;
    this.generateTimeSlots(date);
    
    // Auto-advance to time selection
    setTimeout(() => this.navigateStep('next'), 500);
  }

  /**
   * Generate available time slots for selected date
   */
  generateTimeSlots(date) {
    const timeSlotsContainer = document.getElementById('cal-time-slots');
    const timeSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
    ];

    let slotsHTML = '<div class="cal-time-grid">';
    
    timeSlots.forEach(time => {
      slotsHTML += `
        <button class="cal-time-slot" 
                data-time="${time}"
                onclick="calBooking.selectTime('${time}')">
          ${time}
        </button>
      `;
    });
    
    slotsHTML += '</div>';
    timeSlotsContainer.innerHTML = slotsHTML;
  }

  /**
   * Handle time selection
   */
  selectTime(time) {
    // Remove previous selections
    document.querySelectorAll('.cal-time-slot').forEach(slot => {
      slot.classList.remove('selected');
    });

    // Mark selected time
    const selectedSlot = document.querySelector(`[data-time="${time}"]`);
    selectedSlot.classList.add('selected');

    this.selectedTime = time;
    
    // Auto-advance to user form
    setTimeout(() => this.navigateStep('next'), 500);
  }

  /**
   * Navigate between steps
   */
  navigateStep(direction) {
    const currentStep = document.querySelector('.cal-step.active');
    const currentStepNumber = parseInt(currentStep.classList[1].split('-')[2]);
    
    let nextStepNumber;
    if (direction === 'next') {
      nextStepNumber = Math.min(currentStepNumber + 1, 4);
    } else {
      nextStepNumber = Math.max(currentStepNumber - 1, 1);
    }
    
    this.showStep(nextStepNumber);
  }

  /**
   * Show specific step
   */
  showStep(stepNumber) {
    document.querySelectorAll('.cal-step').forEach(step => {
      step.classList.remove('active');
    });
    
    const targetStep = document.querySelector(`.cal-step-${stepNumber}`);
    targetStep.classList.add('active');
  }

  /**
   * Handle booking form submission
   */
  async handleBookingSubmission(form) {
    const formData = new FormData(form);
    const bookingData = {
      date: this.selectedDate,
      time: this.selectedTime,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };

    const submitBtn = document.getElementById('cal-confirm-btn');
    submitBtn.innerHTML = '<span class="cal-spinner small"></span> Booking...';
    submitBtn.disabled = true;

    try {
      await this.submitBooking(bookingData);
      this.showStep(4); // Show success message
    } catch (error) {
      console.error('Booking failed:', error);
      this.showError('Booking failed. Please try again.');
      submitBtn.innerHTML = 'Confirm Meeting';
      submitBtn.disabled = false;
    }
  }

  /**
   * Submit booking to Cal.com API
   */
  async submitBooking(bookingData) {
    // For now, use simulation until modal works perfectly, then enable API
    console.log('Booking data to be submitted:', bookingData);
    
    // Simulate booking process - replace this later with real API
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Demo: Booking would be created with Cal.com API');
        console.log('Date:', bookingData.date, 'Time:', bookingData.time);
        console.log('Contact:', bookingData.name, bookingData.email);
        resolve({ 
          success: true, 
          bookingId: 'demo_' + Date.now(),
          message: 'Demo booking - Cal.com API working separately'
        });
      }, 1500);
    });
    
    // Real API call (temporarily disabled to fix modal first):
    // const apiUrl = `${this.baseUrl}/bookings?apiKey=${this.apiKey}`;
    // const response = await fetch(apiUrl, { ... });
  }

  /**
   * Show error message
   */
  showError(message) {
    // Could implement a toast notification or alert
    alert(message);
  }

  /**
   * Reset modal to initial state
   */
  resetModal() {
    this.selectedDate = null;
    this.selectedTime = null;
    this.showStep(1);
    
    // Reset form
    const form = document.getElementById('cal-user-form');
    form.reset();
    
    // Reset selections
    document.querySelectorAll('.selected').forEach(el => {
      el.classList.remove('selected');
    });
  }
}

// Initialize Cal.com integration when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize with your Cal.com configuration
  window.calBooking = new CalComIntegration({
    apiKey: 'cal_live_0b821391b525deeabb6b077c2a8578ca',
    eventTypeId: '3332433', // 30 Min Meeting
    organizerId: 'kostiantyn-zozulia-k3tj7t'
  });
});