(function () {
  // Accept familiar Russian formats; other country codes must be explicit.
  // This checks structure only, not whether a subscriber can receive a call.
  function normalizePhone(value) {
    const raw = String(value || "").trim();
    if (!/^(?:\+)?[0-9\s().-]+$/.test(raw)) return "";
    let digits = raw.replace(/\D/g, "");
    const international = raw.startsWith("+") || digits.startsWith("00");
    if (digits.startsWith("00")) digits = digits.slice(2);
    if (!international) {
      if (digits.length === 10) digits = "7" + digits;
      else if (digits.length === 11 && digits.startsWith("8")) digits = "7" + digits.slice(1);
      else if (!(digits.length === 11 && digits.startsWith("7"))) return "";
    }
    if (!/^[1-9]\d{7,14}$/.test(digits)) return "";
    if (digits.startsWith("7") && digits.length !== 11) return "";
    return digits;
  }

  function formatPhone(value) {
    const digits = normalizePhone(value);
    if (!digits) return String(value || "").trim();
    if (digits.startsWith("7") && digits.length === 11) {
      return "+7 (" + digits.slice(1, 4) + ") " + digits.slice(4, 7) + "-" + digits.slice(7, 9) + "-" + digits.slice(9);
    }
    return "+" + digits;
  }

  function wirePhone(input) {
    if (!input) return;
    input.addEventListener("blur", function () {
      if (normalizePhone(input.value)) input.value = formatPhone(input.value);
    });
  }

  function showReceipt(root, phone, email) {
    const receipt = root.querySelector(".lead-receipt");
    if (!receipt) return;
    const contact = receipt.querySelector(".lead-receipt-contact");
    if (contact) contact.textContent = "Телефон для связи: " + formatPhone(phone) + (email ? ". Email: " + email : "");
    const note = receipt.querySelector(".lead-receipt-note");
    if (note) note.textContent = "Не принимаете незнакомые звонки или заметили ошибку в номере? Напишите нам — уточним контакты и вашу задачу.";
    receipt.hidden = false;
  }

  window.d82ContactFields = Object.freeze({ normalizePhone, formatPhone, wirePhone, showReceipt });
})();
