/* eslint no-unused-vars:"off" */
function displayModal(event) {
  const modal = document.getElementById('contact_modal');
  // Vérifie si la touche appuyée est la touche Entrée
  // if (event.key === 'Enter') {
  //   event.preventDefault();
  //   return;
  // }
  modal.style.display = 'flex';
  const photographerName = document.querySelector('.photograph-name');
  const photographerContact = document.querySelector('.modal p');
  photographerContact.innerText = `${photographerName.innerText}`;
  // Focus sur l'image de fermeture
  const closeButton = document.querySelector('.modal img');
  console.log(closeButton);

  closeButton.focus();

  //Le focus devrait être positionné sur le premier champ de saisie lorsque la modale est affichée.
  // document.getElementById('prenom').focus();
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}
const form = document.querySelector('form');
function displayErrors(errors) {
  const errorMessagesContainer = document.getElementById('error-messages');
  errorMessagesContainer.innerHTML = ''; // Clear previous error messages

  // Display each error message in the appropriate element
  Object.keys(errors).forEach((field) => {
    const errorMessage = errors[field];
    const errorElement = document.createElement('p');
    errorElement.textContent = errorMessage;
    errorMessagesContainer.appendChild(errorElement);
  });
}

function validateForm() {
  const errors = {};

  // Validate each form field
  const fieldsToValidate = ['prenom', 'nom', 'email', 'message'];

  fieldsToValidate.forEach((field) => {
    const fieldValue = document.getElementById(field).value;
    // Add your validation logic here
    // Example: Check if the field is empty
    if (fieldValue.trim() === '') {
      errors[field] = 'Ce champ est obligatoire.';
    }
    // Add more validation checks as needed
  });

  return errors;
}

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
    displayErrors(errors);
  }
}

// Add event listener to the form
form.addEventListener('submit', sendForm);

// Ajoutez un gestionnaire d'événements clavier pour le formulaire
document.getElementById('contact_form').addEventListener('keydown', function handleFormKeyEvents(event) {
  // Gérer les touches Enter pour soumettre le formulaire
  if (event.key === 'Enter' && document.activeElement.tagName === 'INPUT') {
    document.activeElement.click();
  }
});




