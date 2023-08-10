import { createContext } from "react";



export const UserContext = createContext()

export const AddUserToDb = async (details) => {
        fetch(`${process.env.REACT_APP_BACKEND_SERVER}/mongodb/add/Users`,
                {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json', // Set the request headers to indicate JSON data
                        },
                        body: JSON.stringify(details)
                })
}

export const getUserClientsFromDb = async (details) => {
       return await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/mongodb/Clients`,
                {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json', // Set the request headers to indicate JSON data
                        },
                        body: JSON.stringify(details)
                }).then(rawData => rawData.json()).then(Data => Data)

}


export const addUserClientToDb = async (details) => {
        return await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/mongodb/add/Clients`,
        {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json', // Set the request headers to indicate JSON data
                },
                body: JSON.stringify(details)
        }).then(rawData => rawData.json()).then(Data => Data)
}