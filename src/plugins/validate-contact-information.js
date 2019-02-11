import Plugin from '../common/plugin';

Plugin.register(
  'validate-contact-information',
  (
    options = [
      {
        selector: '#checkout_shipping_address_address1',
        pattern: /.*[a-z]+.*[0-9]+.*/i,
        errorMessage: 'Please enter streetname AND number'
      }
    ]
  ) => {
    process.env.NODE_ENV === 'development' &&
      console.log('PLUGIN: I am the validate-contact-information plugin with options', options);

    var getPlugin = function(validation) {
      var node = document.createElement('div');
      node.className = validation.id;
      node.innerHTML =
        '<div class="section__content">' +
        '  <p class="field__message">' +
        validation.errorMessage +
        '</p>' +
        '</div>' +
        '<style>' +
        `${validation.selector}.plugin-validate-contact-information--error {` +
        '  border: solid 2px #ff6d6d;' +
        '}' +
        `.${validation.id} {` +
        '  display: none;' +
        '}' +
        `.plugin-validate-contact-information--error + .${validation.id} {` +
        '  display: block;' +
        '  color: #ff6d6d;' +
        '}' +
        '</style>';
      return node;
    };

    options.forEach(validation => {
      const field = document.querySelector(validation.selector);
      if (field) {
        const submitButton = document.querySelector('button[type=submit].step__footer__continue-btn');
        const id = '_' + btoa(validation.selector).replace(/[^a-zA-Z0-9]/gi, 'X');
        field.parentNode.appendChild(getPlugin({ id, ...validation }));

        if (submitButton) {
          submitButton.addEventListener('click', function(e) {
            if (!field.value.match(validation.pattern)) {
              field.classList.add('plugin-validate-contact-information--error');
              window.scrollTo(0, field.offsetTop);
              e.stopPropagation();
              e.preventDefault();
            } else {
              field.classList.remove('plugin-validate-contact-information--error');
            }
          });
        }
      }
    });
  }
);
