import Ember from 'ember';

export function formForElementFind(labelText) {
  let result;

  find('label.form-field--label').each((idx, label) => {
    if (label.innerText.trim().toLowerCase() === labelText.toLowerCase()) {
      result = label.nextElementSibling;
    }
  });

  return result;
}

export default formForElementFind;
