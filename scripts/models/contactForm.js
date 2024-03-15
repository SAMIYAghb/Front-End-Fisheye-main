/* eslint no-unused-vars:"off" */
// Focus sur l'image de fermeture
const closeButton = document.querySelector('.modal img');
function resetForm() {
  document.getElementById('prenom').value = '';
  document.getElementById('nom').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
}
function closeModal() {
  document.body.classList.remove('no-scroll'); // Supprimer la classe pour activer le défilement du corps
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  const main = document.getElementById('main');
  main.setAttribute('aria-hidden', 'false');
  // Mettre le focus sur l'élément image après la fermeture de la modale
  // closeButton.focus();
  // Nettoyer les messages d'erreur
  const errorContainers = document.querySelectorAll('[id^="error-messages-"]');
  errorContainers.forEach((container) => {
    container.innerHTML = '';
  });
  resetForm();
}

function displayModal(event) {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll'); // Ajouter une classe pour désactiver le défilement du corps
  const photographerName = document.querySelector('.photograph-name');
  const photographerContact = document.querySelector('.modal p');
  photographerContact.innerText = `${photographerName.innerText}`;
  document.getElementById('prenom').focus();
  const main = document.getElementById('main');
  main.setAttribute('aria-hidden', 'true');
}

const focusableElements = 'img, input, textarea, button, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector('#contact_modal'); // select the modal by it's id

const firstFocusableElement = modal.querySelector('.modal-form-img');
// console.log(firstFocusableElement);
const focusableContent = modal.querySelectorAll(focusableElements);

const lastFocusableElement = focusableContent[focusableContent.length - 1];
// get last element to be focused inside modal
document.addEventListener('keydown', (e) => {
  const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) {
    // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      // add focus for the last focusable element
      lastFocusableElement.focus();
      e.preventDefault();
    }
  } else {
    // if tab key is pressed
    if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      // ajouter le focus pour le first element
      e.preventDefault();
    }
  }
});

firstFocusableElement.focus();

// Adjouter un event listener pour "keydown" image
firstFocusableElement.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    closeModal();
  }
});

const form = document.querySelector('form');
function validateForm() {
  // Récupérer les valeurs des champs
  const prenom = document.getElementById('prenom').value.trim();
  const nom = document.getElementById('nom').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Réinitialiser les messages d'erreur
  document.getElementById('error-messages-prenom').innerText = '';
  document.getElementById('error-messages-nom').innerText = '';
  document.getElementById('error-messages-email').innerText = '';
  document.getElementById('error-messages-message').innerText = '';
  document.getElementById('error-messages').innerText = '';

  // Valider le prénom
  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(prenom)) {
    document.getElementById('error-messages-prenom').innerText = 'Le prénom ne peut contenir que des lettres.';
  } else if (prenom.length < 2 || prenom.length > 50) {
    document.getElementById('error-messages-prenom').innerText = 'Le prénom doit avoir entre 2 et 50 caractères.';
  }

  // Valider le nom
  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nom)) {
    document.getElementById('error-messages-nom').innerText = 'Le nom ne peut contenir que des lettres.';
  } else if (nom.length < 1 || nom.length > 50) {
    document.getElementById('error-messages-nom').innerText = 'Le nom doit avoir entre 1 et 50 caractères.';
  }

  // Valider l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('error-messages-email').innerText = 'Veuillez entrer une adresse email valide.';
  }

  // Valider le message
  if (message.length < 10) {
    document.getElementById('error-messages-message').innerText = 'Le message doit avoir au moins 10 caractères.';
  }

  // Vérifier s'il y a des erreurs
  if (document.getElementById('error-messages-prenom').innerText
  || document.getElementById('error-messages-nom').innerText
      || document.getElementById('error-messages-email').innerText
      || document.getElementById('error-messages-message').innerText) {
    return false; // Empêcher l'envoi du formulaire en cas d'erreur
  }

  // Afficher les données dans la console
  console.log('Prénom:', prenom);
  console.log('Nom:', nom);
  console.log('Email:', email);
  console.log('Message:', message);

  // Retourner true pour soumettre le formulaire
  return true;
}

function sendForm(event) {
  event.preventDefault(); // Empêcher le comportement par défaut du formulaire
  if (validateForm()) {
    console.log('Formulaire soumis avec succès!');
    // Réinitialiser les valeurs des champs
    resetForm();
    closeModal();
  }
}
