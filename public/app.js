document.addEventListener('DOMContentLoaded', () => {
  const footerText = document.querySelector('footer p');
  if (!footerText) return;

    const year = new Date().getFullYear();
    footerText.textContent += `${year}`;
});
