import ButtonComponent from './button';

export default ButtonComponent.extend({
  type: 'reset',

  click(e, ...args) {
    e.preventDefault();
    if (this.get('reset') !== undefined) {
      this.get('reset')(...args);
    }
  }
});
