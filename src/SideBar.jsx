import React from 'react'
import './SideBar.scss'
import {List, ListItem, ListItemAvatar, Avatar  } from '@material-ui/core';

function SideBar() {
    return (
        <div className="chat-bar">
            <List>
                <ListItem className="list-item">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    </ListItemAvatar>
                    Remy Sharp
                </ListItem>
                <ListItem className="list-item">
                    <ListItemAvatar>
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
                    </ListItemAvatar>
                    Remy Sharp
                </ListItem>
                <ListItem className="list-item">
                    <ListItemAvatar>
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"/>
                    </ListItemAvatar>
                    Remy Sharp
                </ListItem>
            </List>
        </div>
    )
}

export default SideBar
