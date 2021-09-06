import React from 'react'
import './SideBar.scss'
import {List, ListItem, ListItemAvatar, Avatar  } from '@material-ui/core';
import useId from "react-id-generator";


function SideBar() {
    const chats = [
        {id: useId(),
         name: 'Remy Sharp'
        },
        {id: useId(),
         name: 'Travis Howard'
        },
        {id: useId(),
        name: 'Cindy Baker'
        }
    
    ]
    const chatBar = chats.map((item)=>{
        return(
            <ListItem className="list-item" key={item.id}>
                    <ListItemAvatar>
                        <Avatar alt={item.name} src="/static/images/avatar/1.jpg"/>
                    </ListItemAvatar>
                    {item.name}
                </ListItem>
        )
    })
    return (
        <div className="chat-bar">
            <List>
                {chatBar}
            </List>
        </div>
    )
    
}

export default SideBar
