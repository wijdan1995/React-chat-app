import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import { tokenUrl, instanceLocator } from './config'
import './App.css'
class App extends Component {
  state = {
    roomId: null,
    messages: [],
    joinableRooms: [],
    joinedRooms: []
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
        // to use it outside this function
        this.currentUser = currentUser
        this.getRooms()

      })
      .catch(error => {
        console.error("error: on connecting", error);
      })
  }

  getRooms = () => {
    // to get the rooms
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(error => {
        console.error("error: on joinableRooms", error);
      })

  }

  subscribeToRoom = (roomId) => {
    // console.log('RoomId from room list' + roomId)
    //to clean the state
    this.setState({
      messages: [],
      roomId: roomId
    })
    this.currentUser.subscribeToRoom({
      // roomId: roomId,
      roomId,

      hooks: {
        onMessage: message => {
          // console.log('Received message: ', message.text);
          // error on this setState(...) of undefined
          this.setState({
            messages: [...this.state.messages, message]
          })
            .then(() => {
              // this.setState({
              //   roomId: roomId
              // })
              this.getRooms()

            })
          console.log(`Room Id : ${this.state.roomId}`)
            .catch(error => {
              console.error("error:on subscribing to room: ", error);
            })
        }
      }
    })

  }

  sendMessage = (text) => {

    this.currentUser.sendMessage({
      // text: text is es6 text, only
      text,
      roomId: this.state.roomId
    })

  }

  createRoom = (roomName) => {
    // console.log(`Room name: ${roomName}`)
    this.currentUser.createRoom({
      name: roomName
    })
      .then(room => this.subscribeToRoom(room.id))
      .catch(error => {
        console.error("Error with create room: ", error);
      })
  }
  render() {
    // console.log('this.state.messages:', this.state.messages);
    return (
      <div className='app'>
        <RoomList roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages} />
        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;

