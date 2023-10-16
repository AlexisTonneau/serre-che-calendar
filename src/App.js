import './App.css';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import {Button} from "@mui/material";
import {NextOccupiers} from "./Components/NextOccupiers";
import {CalendarView} from "./Components/CalendarView";

function App() {
  return (
    <div className="App bg-image">
      <h1 style={{marginTop: 0, padding: 5}}>Chantemerle - Réservation de l'appartement</h1>
        <div style={{padding: "1vh"}}>
            <NextOccupiers />
        </div>
      <div style={{padding: "1vh"}}>
          <Button variant="contained">
              Réserver un créneau
          </Button>
      </div>
      <div>
          <CalendarView/>
      </div>
    </div>
  );
}

export default App;
