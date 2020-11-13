import React, { Component } from 'react';
import "./ChatGroup.css";
import Chat from "./Chat.js";
import RestaurantMenu from "./RestaurantMenu.js";

class ChatGroup extends Component {

    render() {
        return (
            <div className="chatContainer"> 
                <div className="chatContainerHijo">
                    <RestaurantMenu/>
                </div>
                <Chat/>
            </div>
        );
    }
}
export default ChatGroup;