import React, { Component } from 'react';
import Message from './Message'
import ReactDOM from 'react-dom'

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

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }

    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight
        }
    }

    render() {
        if (!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }
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
