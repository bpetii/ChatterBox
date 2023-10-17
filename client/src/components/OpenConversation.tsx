import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";

const OpenConversation = () => {
  const [text, setText] = useState("");
  const {sendMessage, selectedConversation } = useConversations();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendMessage(selectedConversation.recipients.map(recipient => recipient.id), text)

    setText('')
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column alig-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            return (
              <div
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end': '' }`}  
              >
                <p className={`rounded px-2 py-1 ${message.fromMe? 'bg-primary text-white' : 'border'} `}>{message.message}</p>
                <div className={`text-muted small ${message.fromMe? 'text-right': ''}`}>{message.fromMe? 'You' : message.senderName}</div>

              </div>
            ) 
          })}
        </div>
      </div>
      <Form className="m-2" onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup>
            <InputGroup>
              <Form.Control
                as="textarea"
                required
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setText(e.target.value)
                }
                style={{ height: "75px", resize: "none" }}
              />

              <Button type="submit">Send</Button>
            </InputGroup>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default OpenConversation;
