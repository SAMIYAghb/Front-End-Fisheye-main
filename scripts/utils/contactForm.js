/* eslint no-unused-vars:"off" */
function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'flex';
  const photographerName = document.querySelector('.photograph-name');
  const photographerContact = document.querySelector('.modal p');
  photographerContact.innerText = `${photographerName.innerText}`;
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}
const form = document.querySelector('form');
function sendForm(e) {
  // Empêche la soumission du formulaire
  e.preventDefault();
  // Récupérer les valeurs des champs
  const prenom = document.getElementById('prenom').value;
  const nom = document.getElementById('nom').value;
  const email = document.getElementById('email').value;

  // Afficher les valeurs dans la console
  // console.log('Prénom:', prenom);
  // console.log('Nom:', nom);
  // console.log('Email:', email);
}
