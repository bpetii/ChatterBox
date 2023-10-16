import React from 'react'
import { useContacts, Contact } from '../context/ContactsProvider'
import { ListGroup } from 'react-bootstrap';

const Contacts = () => {
  const {contacts} = useContacts();
  return (
    <ListGroup variant='flush'>
      {contacts.map((contact: Contact)=> (
          <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Contacts