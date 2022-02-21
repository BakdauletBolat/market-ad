import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

function OnlineUsers() {
    const token = localStorage.getItem('userToken');

    const user = useSelector(state => state.auth.user);

    const chatSocket = new WebSocket(
        'ws://'
        + '0.0.0.0:8000'
        + '/ws/online-users/'
        + `?token=${token}`
    );
    let connection_resolvers = [];
    let checkConnection = () => {
        return new Promise((resolve, reject) => {
            if (chatSocket.readyState === WebSocket.OPEN) {
                resolve();
            }
            else {
                connection_resolvers.push({ resolve, reject });
            }
        });
    }

    chatSocket.addEventListener('open', () => {
        connection_resolvers.forEach(r => r.resolve())
    });

    useEffect(() => {

        if (user != null) {
            async function send(data) {
                await checkConnection();
    
                console.log(user);
    
                chatSocket.send(JSON.stringify({
                    'user_id': user.id
                }));
            }
    
            send();
        }

       



        chatSocket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            console.log(data);
        };

        console.log('yes');

    }, []);
    return (
        <>
            <div></div>
        </>
    )
}

export default OnlineUsers;