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
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className='send-message-form'>
                <input
                    // get from the props if there is room id it will return false if not return true
                    disabled={this.props.disabled}
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