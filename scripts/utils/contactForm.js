/* eslint no-unused-vars:"off" */
// Focus sur l'image de fermeture
const closeButton = document.querySelector('.modal img');
console.log(closeButton);

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  // Mettre le focus sur l'élément image après la fermeture de la modale
  // closeButton.focus();
}

function displayModal(event) {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'flex';
  const photographerName = document.querySelector('.photograph-name');
  const photographerContact = document.querySelector('.modal p');
  photographerContact.innerText = `${photographerName.innerText}`;
  closeButton.focus();
  // // Mettre le focus sur le premier champ du formulaire dans la modale
  // const firstInput = document.getElementById('prenom');
  // if (firstInput) {
  //   firstInput.focus();
  // }
}

// closeButton.focus();
// Ajouter un gestionnaire d'événements pour capturer la touche Tab
// closeButton.addEventListener('keydown', function (e) {
//   if (e.key === 'Tab') {
//     // Empêcher le comportement par défaut (changement de focus)
//     e.preventDefault();
//     // Mettre le focus sur l'élément image
//     closeButton.focus();
//   } else if (e.key === 'Enter') {
//     e.preventDefault();
//     closeModal();
//   }
// });




const focusableElements = 'img, input, textarea, button, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector('#contact_modal'); // select the modal by it's id

const firstFocusableElement = modal.querySelector('.modal-form-img');
console.log(firstFocusableElement);
const focusableContent = modal.querySelectorAll(focusableElements);

const lastFocusableElement = focusableContent[focusableContent.length - 1];
// get last element to be focused inside modal
document.addEventListener('keydown', function(e) {
  let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) { // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
  } else { // if tab key is pressed
    if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element
      e.preventDefault();
    }
  }
});

firstFocusableElement.focus();

// Adjouter un event listener pour "keydown" image
firstFocusableElement.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    closeModal();
  }
});


// const form = document.querySelector('form');
// function displayErrors(errors) {
//   const errorMessagesContainer = document.getElementById('error-messages');
//   errorMessagesContainer.innerHTML = ''; // Clear previous error messages

//   // Display each error message in the appropriate element
//   Object.keys(errors).forEach((field) => {
//     const errorMessage = errors[field];
//     const errorElement = document.createElement('p');
//     errorElement.textContent = errorMessage;
//     errorMessagesContainer.appendChild(errorElement);
//   });
// }

// function validateForm() {
//   const errors = {};

//   // Validate each form field
//   const fieldsToValidate = ['prenom', 'nom', 'email', 'message'];

//   fieldsToValidate.forEach((field) => {
//     const fieldValue = document.getElementById(field).value;
//     // Add your validation logic here
//     // Example: Check if the field is empty
//     if (fieldValue.trim() === '') {
//       errors[field] = 'Ce champ est obligatoire.';
//     }
//     // Add more validation checks as needed
//   });

//   return errors;
// }

// function resetForm() {
//   // Clear the form fields
//   document.getElementById('prenom').value = '';
//   document.getElementById('nom').value = '';
//   document.getElementById('email').value = '';
//   document.getElementById('message').value = '';

//   // Clear error messages
//   const errorMessagesContainer = document.getElementById('error-messages');
//   errorMessagesContainer.innerHTML = '';
// }

// function sendForm(event) {
//   // Empêche la soumission du formulaire
//   event.preventDefault();

//   // Vérifier les erreurs de validation
//   const errors = validateForm();

//   // Récupérer les valeurs des champs
//   if (Object.keys(errors).length === 0) {
//     // Aucune erreur, continuer le traitement du formulaire
//     const formData = {
//       prenom: document.getElementById('prenom').value,
//       nom: document.getElementById('nom').value,
//       email: document.getElementById('email').value,
//       message: document.getElementById('message').value,
//     };
//     // Afficher les valeurs dans la console
//     console.log('Form Data:', formData);

//     closeModal();
//     resetForm();
//   } else {
//     // Il y a des erreurs, afficher les messages d'erreur
//     displayErrors(errors);
//   }
// }

// // Add event listener to the form
// form.addEventListener('submit', sendForm);
