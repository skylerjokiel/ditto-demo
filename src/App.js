import './App.css';
import { useEffect, useState } from 'react';

function App({ ditto }) {
  const [carColors, setCarColors] = useState([]);

  const logState = () => {
    const collection = ditto.store.collection('cars');
    console.log(collection);
  }

  const addCarToCollection = () => {
    ditto.store.collection('cars').upsert({
      type: `Mazda`,
      color: "blue",
    });
  }

  const logCollectionLength = async () => {
    const response = await ditto.store.collection('cars').find("type == 'Mazda'");
    console.log(response);
  }

  const logCollectionIds = async () => {
    const response = await ditto.store.collection('cars').find("type == 'Mazda'");
    response.forEach((value) => {
      console.log(value.age);
    }); 
  }

  useEffect(() => {
    const liveQuery = ditto.store
      .collection('cars')
      .find("color == 'blue'")
      .observe((cars) => {
        console.log(`New car added: Type:${cars.type} Color:${cars.color}`);
        setCarColors([...carColors, cars.color]);
      });
    return () => liveQuery.stop();
  }, [])


  return (
    <div className="App">
      <button onClick={() => { logState() }}>Console Log State</button>
      <button onClick={() => { addCarToCollection() }}>Add Car</button>
      <button onClick={() => { logCollectionLength() }}>Log Collection Length</button>
      <button onClick={() => { logCollectionIds() }}>Log Collection Ids</button>
    </div>
  );
}

export default App;
