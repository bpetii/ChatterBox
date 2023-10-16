import React from 'react'
import Siderbar from './Siderbar'
import OpenConversation from './OpenConversation'
import { useConversations } from '../context/ConversationsProvider'

interface Props {
    id: string
}

const Dashboard = ({id}: Props) => {
  const {selectedConversation} = useConversations();
  return (
    <div className='d-flex' style={{height: '100vh'}}>
        <Siderbar id={id}/>
        {selectedConversation && <OpenConversation />}
    </div>
  )
}

export default Dashboard