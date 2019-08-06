import React, { Component } from 'react';
import Message from './Message'

// const DUMMY_DATA = [
//     {
//         senderId: 'perborgen',
//         text: 'Hey, how is it going?'
//     },
//     {
//         senderId: 'janedoe',
//         text: 'Great! How about you?'
//     },
//     {
//         senderId: 'perborgen',
//         text: 'Good to hear! I am great as well'
//     }
// ]

class MessageList extends Component {
    render() {
        return (
            <div className='message-list'>
                {this.props.messages.map((message, index) => (
                    <Message key={index} username={message.senderId} text={message.text} />

                ))}
            </div>
        );
    }
}

export default MessageList;
