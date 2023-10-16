import './App.css';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import {Button} from "@mui/material";
import {NextOccupiers} from "./Components/NextOccupiers";
import {CalendarView} from "./Components/CalendarView";
import {useEffect, useState} from "react";

function App() {


    const [nextOccupiers, setNextOccupiers] = useState([]);

    useEffect(() => {
        fetchSlots().then().catch((e) => console.error(e));
    }, []);

    const fetchSlots = async () => {
        const response = await fetch("http://localhost:8000/");
        setNextOccupiers(await response.json());
    }



    return (
    <div className="App bg-image">
      <h1 style={{marginTop: 0, padding: 5}}>Chantemerle - Réservation de l'appartement</h1>
        <div style={{padding: "1vh"}}>
            <NextOccupiers slots={nextOccupiers} />
        </div>
      <div style={{padding: "1vh"}}>
          <Button variant="contained">
              Réserver un créneau
          </Button>
      </div>
      <div>
          <CalendarView slots={nextOccupiers}/>
      </div>
    </div>
  );
}

export default App;
