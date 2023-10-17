import { useConversations } from '../context/ConversationsProvider'
import { ListGroup } from 'react-bootstrap';

const Conversations = () => {
  const {conversations, selectConversationIndex} = useConversations();
  return (
    <ListGroup variant='flush'>
      {conversations.map((conversation, index)=> (
        <ListGroup.Item
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
          key={index}>{conversation.recipients.map((r) => r.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default Conversations