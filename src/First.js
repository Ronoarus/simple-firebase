import React from 'react';
import firebase from 'firebase';

import { Context } from '.';
import { Paper, Input, Button, Checkbox } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export function First() {
  const {firestore} = React.useContext(Context);
  const [value, setValue] = React.useState('');
  const setInputValue = React.useCallback((event) => setValue(event.target.value), []);
  
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      firestore.collection('data').orderBy('createdAt').onSnapshot((data) => {
        setData(data.docs.map(doc => ({...doc.data(), id: doc.id})))
      })
    };
    fetchData();    
  }, [])

  const onCreate = () => {    
    firestore.collection('data').add({
      text: value,
      checked: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue('');
  }

  const onDelete = (id) => () => firestore.collection('data').doc(id).delete();

  const onUpdate = (id, obj) => () => firestore.collection('data').doc(id).set({
    ...obj,
    checked: !obj.checked,
  });


  return (
      <div className="contentWrapper">
        <h2>Firebase Firestore</h2>
        <Paper className="inp-wr">
          <Input label="Описание..." value={value} onChange={setInputValue}/>
          <Button variant="contained" color="primary" onClick={onCreate}>
            Добавить новую задачу
          </Button>
        </Paper>

        {data.map(v=>(
          <Paper className="record" key={v.id}>
            <span>{v.text}</span>
            <Checkbox color="primary" checked={v.checked} onClick={onUpdate(v.id, v)}/>
            <DeleteIcon className="trash" onClick={onDelete(v.id)}/>
          </Paper>
        ))}
      </div>
  );
}

