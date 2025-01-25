$(document).ready(function () {
    const validUsers = ['usuario1', 'usuario2', 'usuario3'];
    const validCode = '12345';

    $('#authSubmit').on('click', function () {
        const username = $('#username').val().trim();
        if (!username) {
            Swal.fire({ icon: 'warning', title: 'Campo Vacío', text: 'Por favor, ingrese su usuario o correo.' });
            return;
        }
        if (validUsers.includes(username)) {
            Swal.fire({ icon: 'success', title: 'Usuario Verificado', text: 'Ingrese el código de confirmación.' })
                .then(() => {
                    $('#authFormContainer').addClass('hidden');
                    $('#codeFormContainer').removeClass('hidden');
                });
        } else {
            Swal.fire({ icon: 'error', title: 'Usuario no encontrado', text: 'El usuario ingresado no es válido.' });
        }
    });

    $('#codeSubmit').on('click', function () {
        const code = $('#confirmationCode').val().trim();
        if (!code) {
            Swal.fire({ icon: 'warning', title: 'Campo Vacío', text: 'Por favor, ingrese el código de confirmación.' });
            return;
        }
        if (code === validCode) {
            Swal.fire({ icon: 'success', title: 'Código Correcto', text: 'Puede continuar con el restablecimiento de la contraseña.' })
                .then(() => {
                    $('#codeFormContainer').addClass('hidden');
                    $('#resetPasswordFormContainer').removeClass('hidden');
                });
        } else {
            Swal.fire({ icon: 'error', title: 'Código Incorrecto', text: 'El código ingresado no es válido.' });
        }
    });

    const policies = {
        length: password => password.length >= 8,
        uppercase: password => /[A-Z]/.test(password),
        number: password => /[0-9]/.test(password),
        symbol: password => /[+\-@*]/.test(password),
    };

    $('#password').on('input', function () {
        const password = $(this).val();
        Object.keys(policies).forEach(key => {
            const isValid = policies[key](password);
            $(`#policy-${key}`).toggleClass('valid', isValid).toggleClass('invalid', !isValid);
        });
    });

    $('#resetSubmit').on('click', function () {
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const allValid = Object.keys(policies).every(key => policies[key](password));

        if (!password || !confirmPassword) {
            Swal.fire({ icon: 'warning', title: 'Campos Vacíos', text: 'Por favor, complete todos los campos.' });
            return;
        }
        if (!allValid) {
            Swal.fire({ icon: 'error', title: 'Contraseña Inválida', text: 'Asegúrese de cumplir con todas las políticas de contraseña.' });
            return;
        }
        if (password !== confirmPassword) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Las contraseñas no coinciden.' });
        } else {
            Swal.fire({ icon: 'success', title: 'Éxito', text: 'La contraseña se ha restablecido correctamente.' });
        }
    });

    $('.toggle-password').on('click', function () {
        const target = $(this).data('target');
        const input = $(target);
        const type = input.attr('type') === 'password' ? 'text' : 'password';
        input.attr('type', type);
        $(this).find('i').toggleClass('fa-eye fa-eye-slash');
    });
});