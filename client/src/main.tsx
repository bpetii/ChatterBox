import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactsProvider from './context/ContactsProvider.tsx';
import ConversationsProvider from './context/ConversationsProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContactsProvider>
      <ConversationsProvider>
        <App />
      </ConversationsProvider>
    </ContactsProvider>
  </React.StrictMode>,
)
