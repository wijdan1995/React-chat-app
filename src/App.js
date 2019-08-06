import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
// import RoomList from './components/RoomList'
// import NewRoomForm from './components/NewRoomForm'
import { tokenUrl, instanceLocator } from './config'
class App extends Component {
  state = {
    messages: []
  }
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'wijdan',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })

    })

    chatManager.connect()
      .then(currentUser => {
        currentUser.subscribeToRoom({
          roomId: '65efb23b-89c9-4cd7-9837-ccb758f89a0a',
          hooks: {
            onMessage: message => {
              console.log('Received message: ', message.text);
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        })
      })
      .catch(error => {
        console.error("error:", error);
      })

  }
  render() {
    // console.log('this.state.messages:', this.state.messages);
    return (
      <div className='app'>
        {/* <RoomList /> */}
        <MessageList messages={this.state.messages} />
        <SendMessageForm />
        {/* <NewRoomForm /> */}
      </div>
    );
  }
}

export default App;

