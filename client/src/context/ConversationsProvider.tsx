import {PropsWithChildren, useContext, createContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {Contact, useContacts} from './ContactsProvider';

export interface Conversation {
  recipients: string[],
  messages: {
    id: string,
    message: string
  }[]
}

export interface Recipients {
  id: string,
  name: string
}

export interface Messages {
  id: string,
  message: string
}

export interface FormattedConversation {
  recipients: Recipients[]
  messages: Messages[],
  selected: boolean
}

export interface ConversationContext {
  conversations: FormattedConversation[],
  selectConversationIndex: (index: number) => void,
  selectedConversation: FormattedConversation,
  createConversations: (recipient: string[]) => void
}

const ConversationsContext = createContext<ConversationContext>({});

export function useConversations() {
  return useContext(ConversationsContext);
}

export const ConversationsProvider = ({children}: PropsWithChildren) => {
  const [conversations, setConversations] = useLocalStorage('conversations', []) 
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const {contacts} = useContacts();

  const createConversations = (recipients: string[]) => {
    setConversations((prevConversations: Conversation[]) => {
      return [...prevConversations, {recipients, messages: []}]
    })
  }

  const formattedConversations = conversations.map((conversation: Conversation, index: number) => {
    const recipients = conversation.recipients.map(recipient=> {
        const contact: (Contact| undefined) = contacts.find((contact: Contact) => {
            return contact.id === recipient
        })
        const name = (contact && contact.name) || recipient;
        return {id: recipient, name}
    })
    const selected = index === selectedConversationIndex;
    return {...conversation, recipients, selected}
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    createConversations
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}



export default ConversationsProvider