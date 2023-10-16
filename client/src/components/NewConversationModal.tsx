import { Modal, Form, Button } from "react-bootstrap"
import { Contact, useContacts } from "../context/ContactsProvider"
import { useState } from "react"
import { useConversations } from "../context/ConversationsProvider"

interface Props {
    closeModal: () => void
}

const NewConversationModal = ({closeModal}: Props) => {
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const {createConversations} = useConversations();
  const {contacts} = useContacts()

  const handleCheckboxChange = (id: string) => {
    setSelectedContactIds(prevSelectedContactIds => {
      if(prevSelectedContactIds.includes(id)){
        return prevSelectedContactIds.filter(prevId => {
          return id !== prevId
        })
      } else {
        return [...prevSelectedContactIds, id]
      }
    })
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createConversations(selectedContactIds)
    closeModal();
  }
  return (
		<>
			<Modal.Header closeButton>Create Conversation</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					{contacts.map((contact: Contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                checked={selectedContactIds.includes(contact.id)}
                value={contact.id}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              >

              </Form.Check>
            </Form.Group>
          ))}
					<Button className='mt-3' type='submit'>Create</Button>
				</Form>
			</Modal.Body>
		</>
  )
}

export default NewConversationModal