// Automatic Slideshow - change image every 4 seconds
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 4000);    
}

// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Language switching functionality
var currentLanguage = 'eng'; // Default language

function setLanguage(lang) {
  currentLanguage = lang;
  
  // Get all language elements
  var engElements = document.querySelectorAll('.lang-eng');
  var frElements = document.querySelectorAll('.lang-fr');
  
  if (lang === 'lang-eng') {
    // Show English, hide French
    engElements.forEach(function(el) {
      el.style.removeProperty('display');
    });
    frElements.forEach(function(el) {
      el.style.setProperty('display', 'none', 'important');
    });
    // Update button styles
    var btnEng = document.getElementById('lang-btn-eng');
    var btnFr = document.getElementById('lang-btn-fr');
    if (btnEng && btnFr) {
      btnEng.classList.add('w3-white');
      btnEng.classList.remove('w3-hover-red');
      btnFr.classList.remove('w3-white');
      btnFr.classList.add('w3-hover-red');
    }
  } else if (lang === 'lang-fr') {
    // Show French, hide English
    engElements.forEach(function(el) {
      el.style.setProperty('display', 'none', 'important');
    });
    frElements.forEach(function(el) {
      el.style.removeProperty('display');
    });
    // Update button styles
    var btnEng = document.getElementById('lang-btn-eng');
    var btnFr = document.getElementById('lang-btn-fr');
    if (btnEng && btnFr) {
      btnFr.classList.add('w3-white');
      btnFr.classList.remove('w3-hover-red');
      btnEng.classList.remove('w3-white');
      btnEng.classList.add('w3-hover-red');
    }
  }
  
  // Save language preference to localStorage
  localStorage.setItem('language', lang);
}

// Initialize language on page load
function initLanguage() {
  // Hide all French elements initially
  var frElements = document.querySelectorAll('.lang-fr');
  frElements.forEach(function(el) {
    el.style.display = 'none';
  });
  
  // Get saved language or default to English
  var savedLanguage = localStorage.getItem('language') || 'eng';
  setLanguage(savedLanguage);
}

// Initialize language when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguage);
} else {
  // DOM already loaded
  initLanguage();
}