// Minakshi Multispeciality Dental Clinic - Basic Static Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Mobile menu toggle
  const toggleBtn = document.getElementById('mobileNavToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Set min date for appointment picker to today
  const dateInput = document.getElementById('patientDate');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // Handle appointment form submission with security checks & rate limiting
  const form = document.getElementById('appointmentForm');
  let lastSubmitTime = 0;

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // 1. Anti-Spam Honeypot verification (bots will fill this hidden input)
      const honeypot = document.getElementById('clinic_hp_field');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Bot submission blocked.');
        return;
      }

      // 2. Client-side Rate Limiting (prevent rapid spam clicking)
      const now = Date.now();
      if (now - lastSubmitTime < 5000) {
        alert('Please wait a few seconds before submitting again.');
        return;
      }

      // 3. Input Sanitization (strip potentially dangerous control & HTML characters)
      const sanitizeInput = (val) => {
        if (!val) return '';
        return val.replace(/[<>'"&;`]/g, '').trim();
      };

      const name = sanitizeInput(document.getElementById('patientName').value);
      const phone = sanitizeInput(document.getElementById('patientPhone').value);
      const service = sanitizeInput(document.getElementById('patientService').value);
      const date = sanitizeInput(document.getElementById('patientDate').value);
      const shift = sanitizeInput(document.getElementById('patientShift').value);
      const notes = sanitizeInput(document.getElementById('patientNotes').value);

      if (!name || name.length < 2) {
        alert('Please enter a valid patient name.');
        return;
      }

      // Phone number digits validation
      const digitsOnly = phone.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        alert('Please provide a valid 10-digit mobile number.');
        return;
      }

      lastSubmitTime = now;

      // 4. Format WhatsApp Message securely
      let text = `Hello Minakshi Dental Clinic,\n\nI would like to book a dental appointment:\n- Patient: ${name}\n- Phone: ${phone}\n- Treatment: ${service}`;
      if (date) text += `\n- Date: ${date}`;
      if (shift) text += `\n- Shift: ${shift}`;
      if (notes) text += `\n- Notes: ${notes}`;

      const whatsappUrl = `https://wa.me/919975202188?text=${encodeURIComponent(text)}`;

      // Safe window redirection
      const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (win) {
        win.opener = null;
      }
      alert(`Thank you ${name}! Opening WhatsApp to connect directly with Minakshi Dental Clinic (+91 99752 02188).`);
    });
  }
});

// Function to pre-select treatment from service cards
function prefillService(serviceName) {
  const select = document.getElementById('patientService');
  if (select) {
    select.value = serviceName;
  }
}
window.prefillService = prefillService;
