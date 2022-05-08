import { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Notification } from './Notification';
import { Filter } from './Filter';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890', 8);

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleFormSubmit = ({ name, number }) => {
    const data = {
      id: nanoid(),
      name,
      number,
    };

    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(data.name + ' is already in contacts.');
    } else {
      this.setState(prevState => ({ contacts: [...prevState.contacts, data] }));
    }
  };

  handleFilterInputChange = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div>
        <h1>📒 Phonebook</h1>
        <ContactForm onSubmit={this.handleFormSubmit} />

        <h2>👥 Contacts</h2>
        <Filter
          onFilterInputChange={this.handleFilterInputChange}
          value={filter}
        />
        {contacts.length === 0 ? (
          <Notification message={'*No contacts added*'} />
        ) : (
          <ContactList
            contactsList={this.filterContacts()}
            onDeleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}
