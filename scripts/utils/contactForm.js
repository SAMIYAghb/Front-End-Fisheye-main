/* eslint no-unused-vars:"off" */
// Focus sur l'image de fermeture
const closeButton = document.querySelector('.modal img');
// console.log(closeButton);
function resetForm() {
  // Clear the form fields
  document.getElementById('prenom').value = '';
  document.getElementById('nom').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';

  // Clear error messages
  const errorMessagesContainer = document.getElementById('error-messages');
  errorMessagesContainer.innerHTML = '';
}
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
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
  const photographerName = document.querySelector('.photograph-name');
  const photographerContact = document.querySelector('.modal p');
  photographerContact.innerText = `${photographerName.innerText}`;
  document.getElementById('prenom').focus();
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

function displayErrors(errors) {
  // Clear previous error messages
  const errorMessagesContainer = document.getElementById('error-messages');
  errorMessagesContainer.innerHTML = '';

  // Display each error message under the corresponding input field
  Object.keys(errors).forEach((field) => {
    const errorMessage = errors[field];
    const errorElement = document.createElement('p');
    errorElement.textContent = errorMessage;
    errorElement.className = 'error-message'; // Ajout d'une classe pour le style (facultatif)

    // Ajout de l'erreur dans le div dédié au champ d'entrée correspondant
    const errorContainer = document.getElementById(`error-messages-${field}`);
    if (errorContainer) {
      errorContainer.innerHTML = ''; // Nettoie les messages d'erreur précédents
      errorContainer.appendChild(errorElement);
    }
  });
}
// Fonction utilitaire pour valider l'adresse email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function validateForm() {
  const errors = {};

  // Valider chaque form field
  const fieldsToValidate = ['prenom', 'nom', 'email', 'message'];

  fieldsToValidate.forEach((field) => {
    const fieldValue = document.getElementById(field).value;
    // Vérifier si le champ est vide
    if (fieldValue.trim() === '') {
      errors[field] = 'Ce champ est obligatoire.';
    } else {
      // Valider la longueur pour le nom et le prénom
      if ((field === 'prenom' || field === 'nom') && fieldValue.trim().length < 2) {
        errors[field] = 'Ce champ doit contenir au moins 2 caractères.';
      }

      // Valider l'adresse email
      if (field === 'email' && !isValidEmail(fieldValue)) {
        errors[field] = 'Veuillez saisir une adresse email valide.';
      }

      // Valider la longueur du message
      if (field === 'message' && fieldValue.trim().length < 10) {
        errors[field] = 'Le message doit contenir au moins 10 caractères.';
      }
    }
  });

  return errors;
}

function sendForm(event) {
  // Empêche la soumission du formulaire
  event.preventDefault();

  // Vérifier les erreurs de validation
  const errors = validateForm();

  // Récupérer les valeurs des champs
  if (Object.keys(errors).length === 0) {
    // Aucune erreur, continuer le traitement du formulaire
    const formData = {
      prenom: document.getElementById('prenom').value,
      nom: document.getElementById('nom').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
    };
    // Afficher les valeurs dans la console
    console.log('Form Data:', formData);

    closeModal();
    resetForm();
  } else {
    // Il y a des erreurs, afficher les messages d'erreur
    // console.log('Errors:', errors);
    displayErrors(errors);
  }
}

// Add event listener to the form
form.addEventListener('submit', sendForm);
