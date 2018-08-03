import Plugin from '../common/plugin';

Plugin.register(
  'accept-terms',
  (
    options = {
      label: 'I have read and I agree to the',
      termsName: 'terms',
      termsURL: '/pages/terms',
      errorMessage: 'Please agree to our terms before your purchase'
    }
  ) => {
    process.env.NODE_ENV === 'development' && console.log('PLUGIN: I am the accept-terms plugin with options', options);

    var getPlugin = function() {
      var node = document.createElement('div');
      node.className = 'fieldset-description plugin-accept-terms';
      node.innerHTML =
        '<div class="section__content">' +
        '  <div class="checkbox-wrapper">' +
        '    <div class="checkbox__input">' +
        '      <input class="input-checkbox" type="checkbox" value="1" id="checkout_buyer_accepts_terms" />' +
        '    </div>' +
        '    <label class="checkbox__label" for="checkout_buyer_accepts_terms">' +
        '      ' +
        options.label +
        ' <a href="' +
        options.termsURL +
        '" target="terms">' +
        options.termsName +
        '</a>' +
        '    </label>' +
        '  </div>' +
        '  <p class="field__message">' +
        options.errorMessage +
        '</p>' +
        '</div>' +
        '<style>' +
        '.plugin-accept-terms .field__message {' +
        '  display: none;' +
        '}' +
        '.plugin-accept-terms--error .field__message {' +
        '  display: block;' +
        '  color: #e32c2b;' +
        '}' +
        '.plugin-accept-terms--error .checkbox-wrapper {' +
        '  padding: 1em;' +
        '  font-weight: bold;' +
        '  border-color: #e32c2b;' +
        '  box-shadow: 0 0 0 1px #e32c2b;' +
        '  border-radius: 4px;' +
        '}' +
        '</style>';

      return node;
    };

    var acceptMarketingSection = document.querySelector('[data-buyer-accepts-marketing]');

    // ---------------------------------------------------------------------------
    if (acceptMarketingSection) {
      var submitButton = document.querySelector('button[type=submit]');
      if (submitButton) {
        acceptMarketingSection.appendChild(getPlugin());

        var acceptTermsPreset = window.sessionStorage.getItem('accept-terms');
        var acceptTermsCheckbox = document.querySelector('#checkout_buyer_accepts_terms');

        if (acceptTermsPreset && acceptTermsPreset === '1') {
          acceptTermsCheckbox.checked = true;
          acceptTermsCheckbox.disabled = true;
        }

        acceptTermsCheckbox.addEventListener('click', function(e) {
          if (e.target.checked) {
            window.sessionStorage.setItem('accept-terms', 1);
          } else {
            window.sessionStorage.setItem('accept-terms', 0);
          }
        });

        submitButton.addEventListener('click', function(e) {
          var acceptTermsSection = document.querySelector('.plugin-accept-terms');
          if (!acceptTermsCheckbox.checked) {
            acceptTermsSection.classList.add('plugin-accept-terms--error');
            window.scrollTo(0, acceptTermsSection.offsetTop);
            e.stopPropagation();
            e.preventDefault();
          }
        });
      }
    }
  }
);
