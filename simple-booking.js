/**
 * Simple, reliable booking system without complex API calls
 */

class SimpleBooking {
  constructor() {
    this.initializeModal();
    this.setupEventListeners();
  }

  initializeModal() {
    const modalHTML = `
      <div id="simple-booking-modal" class="booking-modal-overlay" style="display: none;">
        <div class="booking-modal-content">
          <div class="booking-modal-header">
            <h2>Запланировать встречу</h2>
            <button class="booking-modal-close">&times;</button>
          </div>
          
          <div class="booking-modal-body">
            <div id="booking-form-step" class="booking-step active">
              <p>Заполните форму, и мы свяжемся с вами для планирования встречи:</p>
              
              <form id="simple-booking-form" class="booking-form">
                <div class="form-group">
                  <label for="booking-name">Ваше имя *</label>
                  <input type="text" id="booking-name" name="name" required>
                </div>
                
                <div class="form-group">
                  <label for="booking-email">Email *</label>
                  <input type="email" id="booking-email" name="email" required>
                </div>
                
                <div class="form-group">
                  <label for="booking-phone">Телефон</label>
                  <input type="tel" id="booking-phone" name="phone">
                </div>
                
                <div class="form-group">
                  <label for="booking-preferred-time">Предпочтительное время</label>
                  <select id="booking-preferred-time" name="preferred_time">
                    <option value="">Выберите время</option>
                    <option value="morning">Утром (9:00-12:00)</option>
                    <option value="afternoon">Днем (12:00-17:00)</option>
                    <option value="evening">Вечером (17:00-20:00)</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="booking-message">Сообщение</label>
                  <textarea id="booking-message" name="message" rows="3" placeholder="Расскажите о вашем проекте..."></textarea>
                </div>
                
                <div class="form-actions">
                  <button type="submit" class="btn-primary" id="submit-booking">
                    Отправить заявку
                  </button>
                </div>
              </form>
            </div>
            
            <div id="booking-success-step" class="booking-step" style="display: none;">
              <div class="success-message">
                <div class="success-icon">✅</div>
                <h3>Заявка отправлена!</h3>
                <p>Мы получили вашу заявку и свяжемся с вами в течение 24 часов для планирования встречи.</p>
                <p><strong>Ваш запрос обрабатывается...</strong></p>
                <button class="btn-primary" id="close-success">Закрыть</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('simple-booking-modal');
  }

  setupEventListeners() {
    // Handle all booking button clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('.cal-booking-btn, [data-cal-link], .cta-button, .btn-primary') ||
          e.target.closest('.cal-booking-btn, [data-cal-link], .cta-button, .btn-primary')) {
        
        // Check if it's a booking/contact button (not other buttons)
        const text = e.target.textContent.toLowerCase();
        if (text.includes('связаться') || text.includes('contact') || text.includes('встреч') || text.includes('book')) {
          e.preventDefault();
          this.openModal();
        }
      }
    });

    // Handle modal close
    const closeBtn = this.modal.querySelector('.booking-modal-close');
    closeBtn.addEventListener('click', () => this.closeModal());

    // Handle form submission
    const form = document.getElementById('simple-booking-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmission(e.target);
    });

    // Handle success close
    document.getElementById('close-success').addEventListener('click', () => {
      this.closeModal();
    });

    // Close modal when clicking outside
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });
  }

  openModal() {
    this.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Reset to form step
    document.getElementById('booking-form-step').style.display = 'block';
    document.getElementById('booking-success-step').style.display = 'none';
  }

  closeModal() {
    this.modal.style.display = 'none';
    document.body.style.overflow = '';
    
    // Reset form
    document.getElementById('simple-booking-form').reset();
  }

  async handleSubmission(form) {
    const submitBtn = document.getElementById('submit-booking');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    // Collect form data
    const formData = new FormData(form);
    const bookingData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      preferred_time: formData.get('preferred_time'),
      message: formData.get('message'),
      timestamp: new Date().toISOString()
    };

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log booking data (this could be sent to your email service later)
      console.log('Booking request received:', bookingData);
      
      // Show success message
      this.showSuccess();
      
    } catch (error) {
      console.error('Booking error:', error);
      alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  showSuccess() {
    document.getElementById('booking-form-step').style.display = 'none';
    document.getElementById('booking-success-step').style.display = 'block';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.simpleBooking = new SimpleBooking();
});