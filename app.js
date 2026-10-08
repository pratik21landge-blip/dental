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

  // Handle appointment form submission
  const form = document.getElementById('appointmentForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('patientName').value.trim();
      const phone = document.getElementById('patientPhone').value.trim();
      const service = document.getElementById('patientService').value;
      const date = document.getElementById('patientDate').value;
      const shift = document.getElementById('patientShift').value;
      const notes = document.getElementById('patientNotes').value.trim();

      if (!name || !phone) {
        alert('Please provide your name and phone number.');
        return;
      }

      // Format WhatsApp Message
      let text = `Hello Minakshi Dental Clinic,\n\nI would like to book a dental appointment:\n- Patient: ${name}\n- Phone: ${phone}\n- Treatment: ${service}`;
      if (date) text += `\n- Date: ${date}`;
      if (shift) text += `\n- Shift: ${shift}`;
      if (notes) text += `\n- Notes: ${notes}`;

      const whatsappUrl = `https://wa.me/919975202188?text=${encodeURIComponent(text)}`;

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
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
