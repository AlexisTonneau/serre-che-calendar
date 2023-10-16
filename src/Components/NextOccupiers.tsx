import {useEffect, useState} from "react";
import {OccupiersList, Slot} from "./OccupiersDetail";


export const NextOccupiers = () => {

    const [nextOccupiers, setNextOccupiers] = useState<Slot[]>([]);

    useEffect(() => {
        setNextOccupiers([{name: "Alexis", start: "3 Décembre", end: "8 Décembre"}])
    }, []);

    return (
        <div style={{justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h3>Prochains occupants</h3>
    {nextOccupiers.length === 0 ? (<span>Personne n'a encore indiqué de créneau...</span>) : <OccupiersList slots={nextOccupiers} />}
        </div>
    )
}