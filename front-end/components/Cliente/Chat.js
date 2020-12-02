
import React, { Component } from 'react';
import {Widget, addResponseMessage, toggleWidget} from 'react-chat-widget';
import io from 'socket.io-client';

import 'react-chat-widget/lib/styles.css';
import './styles/Chat.css';
import logo_dark from "../../img/Logo-MataHambreDark.png";
let socket;
class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      meseroAtendiendo: true
    }
    socket = io.connect(global.chat_addr);
  }


  componentDidMount() {
    let nombreCliente = this.props.nombreCliente
    let clienteMesa = this.props.clienteMesa
    socket.emit('join', {nombreCliente, clienteMesa})
    addResponseMessage("¡Bienvenido al restaurante MataHambre!");
    addResponseMessage("En breve será atendido por uno de nuestros meseros")
    toggleWidget()
    socket.on('message', (message) => {
      addResponseMessage(message)
    })
  }

  componentDidUpdate() {

  }

  handleNewUserMessage = (newMessage) => {

    socket.emit('sendMessage', newMessage)

  }

  render() {
    return (
      <div>

        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo_dark}
          titleAvatar={logo_dark}
          title=""
          subtitle="Matahambre"
          showCloseButton={true}
          disabled={ true}
        >


        </Widget>

      </div>
    );
  } 
}

export default Chat;