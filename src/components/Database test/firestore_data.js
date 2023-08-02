import React, { useEffect, useState } from 'react';
import { firebaseDatabase } from '../AuthPage/firebaseconfig';
import { getDoc ,doc } from 'firebase/firestore';

const db = firebaseDatabase;

function FirestoreData() {

  useEffect(() => {
    async function fetchData() {
        const docRef = doc(db, "PT Kaival", "Hello");

        const querySnapshot = await getDoc(docRef);
        console.log(querySnapshot.data());
    }

    fetchData();
  }, []);

  return (
    <div>
        lo
    </div>
  );
}

export default FirestoreData;
