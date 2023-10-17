import { useContext, createContext, useState, ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";

interface Props {
  children: ReactNode;
  id: string;
}

export interface Conversation {
  recipients: string[];
  messages: {
    id: string;
    message: string;
  }[];
}

export interface Recipient {
  id: string;
  name: string;
}

export interface Messages {
  id: string;
  message: string;
}

export interface FormattedMessages {
  id: string;
  message: string;
  senderName: string,
  fromMe: boolean
}

export interface FormattedConversation {
  recipients: Recipient[];
  messages: FormattedMessages[];
  selected: boolean;
}

export interface ConversationContext {
  conversations: FormattedConversation[];
  selectConversationIndex: (index: number) => void;
  selectedConversation: FormattedConversation;
  createConversations: (recipient: string[]) => void;
  sendMessage: (recipients: string[], text: string) => void
}

const ConversationsContext = createContext<ConversationContext>({});

export function useConversations() {
  return useContext(ConversationsContext);
}

export const ConversationsProvider = ({ id, children }: Props) => {
  const [conversations, setConversations] = useLocalStorage<Conversation[]>(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();

  const createConversations = (recipients: string[]) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  const addMessageToConversation = ({
    recipients,
    text,
    sender,
  }: {
    recipients: string[];
    text: string;
    sender: string;
  }) => {
    setConversations((prevConversations) => {
      let madeChange = false;
      const newMessage = { id: sender, message: text };
      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        return conversation;
      });

      if (madeChange) {
        return newConversations;
      } else {
        return [...prevConversations, { recipients, messages: [newMessage] }];
      }
    });
  };

  const sendMessage = (recipients: string[], text: string) => {
    addMessageToConversation({ recipients, text, sender: id });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });
    const messages = conversation.messages.map(message => {
      const contact = contacts.find((contact) => {
        return contact.id === message.id;
      });
      const name = (contact && contact.name) || message.id;
      
      const fromMe = id === message.id;
      return {
        ...message,
        senderName: name,
        fromMe
      }
    } )

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    sendMessage,
    createConversations,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

const arrayEquality = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
};

export default ConversationsProvider;
