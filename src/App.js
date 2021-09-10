import React, { useState, useEffect } from 'react'

//components
import Loading from './Loading'
import Tours from './Tours'

//api
const url = 'https://course-api.com/react-tours-project'

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    }
    catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const removeTour = (id) => {
    const newTours = tours.filter(tour => {
      return(tour.id !== id);
    });
    setTours(newTours);
  }

  useEffect(() => {
    fetchTours();
  }, []);

  if(loading) {
    return <main><Loading /></main>
  }
  if(tours.length === 0) {
    return(
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button
            className='btn'
            onClick={fetchTours}
          >
            Fetch Tours
          </button>
        </div>
      </main>
    );
  }
  return(
    <main>
      <Tours
        removeTour={removeTour}
        tours={tours}
      />
    </main>
  );
}

export default App
