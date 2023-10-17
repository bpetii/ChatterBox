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
        <div>

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
