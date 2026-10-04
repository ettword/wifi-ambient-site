const copy = document.querySelector('#copy');
copy.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(document.querySelector('#commands').textContent);
    status.textContent = 'Comandi copiati. Apri il tuo terminale per iniziare.';
  } catch {
    status.textContent = 'Seleziona e copia i comandi qui sopra.';
  }
});
