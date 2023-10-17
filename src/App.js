import './App.css';
import {Button} from "@mui/material";
import {NextOccupiers} from "./Components/NextOccupiers";
import {CalendarView} from "./Components/CalendarView";
import {useEffect, useState} from "react";
import {BookNewSlot} from "./Components/BookNewSlot";

function App() {

    const [nextOccupiers, setNextOccupiers] = useState([]);
    const [isOpen, setOpen] = useState(false);


    useEffect(() => {
        fetchSlots().then().catch((e) => console.error(e));
    }, []);

    const fetchSlots = async () => {
        const response = await fetch("https://api.serreche.atonneau.me/");
        const slots = await response.json() || [];

        const mapSlotsToColor = {};

        let j = 0;
        for (let i = 0; i < slots.length; i++) {
            let color;
            if (!mapSlotsToColor[slots[i].name]) {
                color = colors[j]
                mapSlotsToColor[slots[i].name] = color;
                j++;
            } else {
                color = mapSlotsToColor[slots[i].name]
            }
            slots[i]['color'] = color;
        }

        setNextOccupiers(slots);
    }

    const deleteRow =  (id) => {
        fetch("https://api.serreche.atonneau.me/"+id, {
            method: "DELETE"
        }).then(()  => fetchSlots())
            .catch(e => console.error(e));
    }

    const handleSave = (payload) => {
        const headers = new Headers();
        headers.append("accept", "application/json");
        headers.append("Content-Type", "application/json");
        fetch("https://api.serreche.atonneau.me/", {
            method: "POST",
            body: JSON.stringify(payload),
            headers
        }).then(()  => fetchSlots())
            .then(() => setOpen(false))
            .catch(e => console.error(e));
    }

    return (
    <div className="App bg-image">
      <h1 style={{marginTop: 0, padding: 5}}>Chantemerle - Réservation de l'appartement</h1>
        <div>
            <BookNewSlot isOpen={isOpen} handleClose={() => setOpen(false)} handleSave={handleSave}/>
        </div>
        <div style={{padding: "1vh"}}>
            <NextOccupiers slots={nextOccupiers} deleteRow={deleteRow} />
        </div>
      <div style={{padding: "1vh"}}>
          <Button variant="contained" onClick={() => setOpen(true)}>
              Réserver un créneau
          </Button>
      </div>
      <div>
          <CalendarView slots={nextOccupiers}/>
      </div>

    </div>
  );
}


const colors = ['blue', 'purple', 'yellow', 'orange', 'green']

export default App;
