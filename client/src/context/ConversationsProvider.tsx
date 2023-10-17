import {useContext, createContext, useState, ReactNode} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts} from './ContactsProvider';

interface Props {
  children: ReactNode,
  id: string
}

export interface Conversation {
  recipients: string[],
  messages: {
    id: string,
    message: string
  }[]
}

export interface Recipient {
  id: string,
  name: string
}

export interface Messages {
  id: string,
  message: string
}

export interface FormattedConversation {
  recipients: Recipient[]
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

export const ConversationsProvider = ({id, children}: Props) => {
  const [conversations, setConversations] = useLocalStorage<Conversation[]>('conversations', []) 
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const {contacts} = useContacts();

  const createConversations = (recipients: string[]) => {
    setConversations((prevConversations) => {
      return [...prevConversations, {recipients, messages: []}]
    })
  }

  const addMessageToConversation = ({recipients, text, sender}: {recipients: Recipient[], text:string, sender: string}) => {
    setConversations((prevConversations) => {

    })
  } 

  const sendMessage = (recipients: Recipient[], text: string) => {
    addMessageToConversation({recipients, text, sender: id})
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient=> {
        const contact = contacts.find((contact) => {
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