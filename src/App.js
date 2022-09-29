import './App.css';
import { useEffect, useState } from 'react';

function App({ ditto }) {
  const [cars, setCars] = useState({});

  const logState = () => {
    const collection = ditto.store.collection('cars');
    console.log(collection);
  }

  const addCarToCollection = () => {
    ditto.store.collection('cars').upsert({
      type: `Mazda`,
      color: Math.floor(Math.random()*2) === 0 ? "blue" : "red",
    });
  }

  const logCollectionLength = async () => {
    const carDocs = await ditto.store.collection('cars').find("type == 'Mazda'");
    console.log(carDocs);
  }

  const logCollectionIds = async () => {
    const carDocs = await ditto.store.collection('cars').find("type == 'Mazda'");
    carDocs.forEach((c) => {
      console.log(c._id);
    }); 
  }

  useEffect(() => {
    const liveQuery = ditto.store
      .collection('cars')
      .find("type == 'Mazda'")
      .observe((currentCars, event) => {
        console.log(currentCars);
        console.log(event);
        setCars(currentCars);
      });
    
    const getInitialValues = async () => {
      const carDocs = await ditto.store.collection('cars').find("type == 'Mazda'")
      setCars(carDocs);
    }

    getInitialValues();

    return () => liveQuery.stop();
  }, [])

  const carsElement = [];
  Array.from(cars).forEach(c => {
    carsElement.push(<div>{`${c.color} ${c.type}`}</div>);
  })
  
  return (
    <div className="App">
      <button onClick={() => { logState() }}>Console Log State</button>
      <button onClick={() => { logCollectionLength() }}>Log Collection</button>
      <button onClick={() => { logCollectionIds() }}>Log Collection Ids</button>
      <h2>Cars!</h2>
      <button onClick={() => { addCarToCollection() }}>Add Car</button>
      <div>{carsElement}</div> 
    </div>
  );
}

export default App;
