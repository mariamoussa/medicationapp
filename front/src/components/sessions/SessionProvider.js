import React, { useState, useEffect, useContext } from 'react';
import SessionContext from './SessionContext';
import { getCookie, removeCookie } from '../../cookie';
import API from '../../API';

export default function SessionProvider({ children }) {

    const [session, updateSession] = useState({
        user: {
            _id: getCookie('_id'),
            token: getCookie('token'),
            role_id: getCookie('role_id'),
        }
    });

    function setSession(nextState) {
        updateSession(prevState => ({
            ...prevState,
            ...nextState
        }));
    }

    async function signOut() {

        let _id = getCookie('_id');
        await API.post('signOut', { _id });

        setSession({ user: {} });
        removeCookie('_id');
        removeCookie('token');
        removeCookie('role_id');
    }

    useEffect(() => {
        async function initializeUser() {
            let _id = getCookie('_id');
            let token = getCookie('token');

            let reqBody = {
                _id: _id,
                token: token
            }

            if (token && _id) {
                await API.post(`initialiseData`, reqBody)
                    .then(res => {
                        const success = res.data.success;
                        const data = res.data.result;
                        if (success && data) {
                            updateSession({
                                user: {
                                    _id: data._id,
                                    role_id: data.role_id,
                                    token: data.token
                                }
                            });
                        }
                    });
            }
        }
        initializeUser()
    }, [])

    let context = { session, actions: { setSession, signOut } }

    return (
        <SessionContext.Provider value={context}>
            {children}
        </SessionContext.Provider>
    )
}