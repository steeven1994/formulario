document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const nombreError = document.getElementById('nombreError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    function showError(element, message) {
        element.textContent = message;
        element.classList.add('show');
    }

    function hideError(element) {
        element.textContent = '';
        element.classList.remove('show');
    }

    function validateField(inputElement, errorElement, errorMessage) {
        if (inputElement.value.trim() === '') {
            showError(errorElement, errorMessage);
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        let isValid = true; 

        if (!validateField(nombreInput, nombreError, 'El nombre es obligatorio.')) {
            isValid = false;
        }

        if (!validateField(emailInput, emailError, 'El correo electrónico es obligatorio.')) {
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailError, 'Por favor, ingrese un correo electrónico válido.');
            isValid = false;
        }

        if (!validateField(passwordInput, passwordError, 'La contraseña es obligatoria.')) {
            isValid = false;
        } else if (passwordInput.value.trim().length < 6) {
            showError(passwordError, 'La contraseña debe tener al menos 6 caracteres.');
            isValid = false;
        }

       
        if (isValid) {
            alert('¡Formulario enviado correctamente!');
            form.reset(); 
        }
    });

    
    nombreInput.addEventListener('input', () => validateField(nombreInput, nombreError, 'El nombre es obligatorio.'));
    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() === '') {
            hideError(emailError);
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailError, 'Por favor, ingrese un correo electrónico válido.');
        } else {
            hideError(emailError);
        }
    });
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.trim() === '') {
            hideError(passwordError); 
        } else if (passwordInput.value.trim().length < 6) {
            showError(passwordError, 'La contraseña debe tener al menos 6 caracteres.');
        } else {
            hideError(passwordError);
        }
    });
});