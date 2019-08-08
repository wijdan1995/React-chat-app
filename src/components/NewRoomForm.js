import React, { Component } from 'react';

class NewRoomForm extends Component {
    state = {
        roomName: ''
    }
    handleChange = event => {
        this.setState({
            roomName: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.createRoom(this.state.roomName)
        this.setState({
            roomName: ''
        })
    }
    render() {
        return (
            <div className='new-room-form'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.roomName}
                        onChange={this.handleChange}
                        type='text'
                        placeholder='Create a Room'
                        required />
                    <button id='create-room-btn'
                        type='submit'>+</button>
                </form>
            </div>
        );
    }
}

export default NewRoomForm;
