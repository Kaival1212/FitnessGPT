import React, { useContext, useEffect, useState } from 'react';
import { UserContext, getUserClientsFromDb, addUserClientToDb } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './User.css';

function User() {
  const navigate = useNavigate();
  const [UserInfo] = useContext(UserContext);
  const UserUID = UserInfo?.user?.uid || UserInfo?.uid || '';
  const UserEmail = UserInfo?.user?.email || UserInfo?.email || '';
  const [Clients, setClients] = useState([]);
  const [Name, setName] = useState('');
  const [selectedClientName, setSelectedClientName] = useState(); // State for selected client name
  const [numberOfClients, setNumberOfClients] = useState(0);

  const AddClientToDb = async () => {
    console.log(Clients);
    const ClientUUID = uuidv4();
    await addUserClientToDb({ UserUID, ClientUUID, Name });

    getUserClientsFromDb({ UserUID }).then((Clients) => {
      setClients(Clients);
      const updatedNumberOfClients = Object.keys(Clients).length;
      setNumberOfClients(updatedNumberOfClients);
    });
  };

  useEffect(() => {
    if (UserUID) {
      const getDataHandle = async () => {
        const Clients = await getUserClientsFromDb({ UserUID });
        setClients(Clients);
        const numberOfClients = Object.keys(Clients).length;
        setNumberOfClients(numberOfClients);
      };

      getDataHandle();
    }
  }, [UserUID]);

  if (UserInfo) {
    return (
      <>
        <div className='UserDashboardMain'>
          <div>
            Hello, {UserEmail}
            <br />
            you have {numberOfClients} Clients
            <div className='UserDashboardClientsDiv'>
              <input
                type='text'
                className='UserDashboardinput'
                value={Name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
              <button className='UserDashboardBtn' onClick={AddClientToDb}>
                Add a Client
              </button>
              <div className='UserDashboardClients'>
                {Clients &&
                  Object.entries(Clients).map(([clientID, clientData]) => (
                    <div
                      key={clientID}
                      className='UserDashboardIndiClient'
                      onClick={() => setSelectedClientName(clientData)} // Set the selected client's name
                    >
                      Name: {clientData.Name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className='UserDashboardClientsInfo'>
            {/* Display the selected client's name */}
            Selected Client: {selectedClientName ? selectedClientName.Name : ''}
            {selectedClientName?.months && Object.entries(selectedClientName?.months).map(([month,diet] )=> (<div> {month} {JSON.stringify(diet.diet)}</div>))}
          </div>

        </div>
      </>
    );
  } else {
    // If the user is not logged in, redirect to /auth page
    navigate('/auth');
    return null;
  }
}

export default User;
