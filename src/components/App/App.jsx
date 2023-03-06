import React, { Component } from 'react';
import AddContactForm from 'components/AddContactForm/AddContactForm';
import shortid from 'shortid';
import ContactsList from 'components/ContactsList/ContactsList';
import { Container, Title } from './App.styled';
import Filter from 'components/Filter/Filter';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const contactsNames = contacts.flatMap(({ name }) => name.toLowerCase());
    const normalizedName = name.toLowerCase();

    if (contactsNames.includes(normalizedName)) {
      alert(`${name} is already in contacts!`);
      return false;
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
      return true;
    }
  };

  deleteContact = delId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== delId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <Container>
        <AddContactForm onSubmit={this.addContact} />
        <Title>Contacts</Title>
        <Filter value={filter} onChange={this.handleInputChange} />
        {contacts.length === 0 ? (
          `No contacts yet`
        ) : visibleContacts.length === 0 ? (
          `No matches founded`
        ) : (
          <ContactsList
            contacts={visibleContacts}
            onDelete={this.deleteContact}
          />
        )}
      </Container>
    );
  }
}
