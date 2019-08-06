import React, { Component } from 'react';

class SendMessageForm extends Component {
    state = {
        message: ''
    }

    handleChange = event => {
        // console.log(event.target.value)
        this.setState({
            message: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        // console.log(this.state.message)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className='send-message-form'>
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder='Type your message and Press ENTER'
                    type='text'
                />
            </form>
        );
    }
}

export default SendMessageForm;