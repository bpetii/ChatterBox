import { Dispatch, SetStateAction, useRef } from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import {v4 as uuidV4} from 'uuid';

interface Props {
	onIdSubmit: Dispatch<SetStateAction<string>>
}

const Login = ({onIdSubmit}: Props) => {
	const idRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
		e.preventDefault();

		if (!idRef.current?.value) return;

		onIdSubmit(idRef.current?.value)
	};

	const createNewId = () => {
		onIdSubmit(uuidV4())
	}

  return (
    <Container className='align-items-center d-flex' style={{height:'100vh'}}>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='w-100'>
					<Form.Label>Enter your id</Form.Label>
					<Form.Control type='text' ref={idRef} required />
				</Form.Group>
				<Button type='submit' className='mr-2'>Login</Button>
				<Button variant='secondary' onClick={createNewId}>Create a new id</Button>
			</Form>
		</Container>
  )
}

export default Login