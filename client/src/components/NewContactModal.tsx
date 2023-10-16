import { useRef } from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import { useContacts } from '../context/ContactsProvider';

interface Props {
    closeModal: () => void
}

const NewContactModal = ({closeModal}: Props) => {
	const idRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const {createContact} = useContacts();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createContact(idRef.current?.value, nameRef.current?.value)
		closeModal()
	}
  return (
		<>
			<Modal.Header closeButton>Create Contact</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Id</Form.Label>
						<Form.Control type='text' ref={idRef}></Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control type='text' ref={nameRef}></Form.Control>
					</Form.Group>

					<Button className='mt-3' type='submit'>Create</Button>
				</Form>
			</Modal.Body>
		</>
  )
}

export default NewContactModal