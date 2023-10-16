import {PropsWithChildren, useContext, createContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export interface Contact {
  id: string,
  name: string
}

export interface ContactsContext {
  contacts: Contact[],
  createContact: (id: string, name: string) => void
}

const ContactsContext = createContext<ContactsContext>({});

export function useContacts() {
  return useContext(ContactsContext);
}

export const ContactsProvider = ({children}: PropsWithChildren) => {
  const [contacts, setContacts] = useLocalStorage('contacts', []) 

  const createContact = (id: string, name: string) => {
    setContacts((prevContacts: Contact[]) => {
      return [...prevContacts, {id, name}]
    })
  }
  return (
    <ContactsContext.Provider value={{contacts, createContact}}>
      {children}
    </ContactsContext.Provider>
  )
}

export default ContactsProvider