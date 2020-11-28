
import React, { Component } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import './Chat.css';

import logo from "../../img/Logo-MataHambre.svg";

class Chat extends Component {
  componentDidMount() {
    addResponseMessage("¡Bienvenido a este increíble chat!");
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  }

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          title="Chat"
          subtitle="Matahambre Restaurante"
          fullScreenMode={false}
        />
      </div>
    );
  } 
}

export default Chat;