import styles from './ContactForm.module.css';
import { Component } from 'react';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  resetState = () => {
    this.setState({ name: '', number: '' });
  };

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.resetState();
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.formLabel}>
          Name
          <input
            className={styles.formInput}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleInputChange}
          />
        </label>

        <label className={styles.formLabel}>
          Number
          <input
            className={styles.formInput}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleInputChange}
          />
        </label>
        <button type="submit" className={styles.formBtn}>
          Add contact
        </button>
      </form>
    );
  }
}
