import { useState } from "react"
import { Form, InputGroup } from "react-bootstrap"

const OpenConversation = () => {
  const [text, setText] = useState('');
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        
      </div>
      <Form className="m-2">
        <Form.Group>
          <InputGroup>
            <Form.Control 
              as='textarea' 
              required 
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
              style={{height:'75px', resize: 'none'}}
              >

            </Form.Control>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}

export default OpenConversation