import React from "react";
import {OccupiersList, Slot} from "./OccupiersDetail";


export const NextOccupiers: React.FC<{slots: Slot[], deleteRow: (id: string) => void}> = ({slots, deleteRow}) => {


    return (
        <div style={{justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h3>Prochains occupants</h3>
    {slots.length === 0 ? (<span>Personne n'a encore indiqué de créneau...</span>) : <OccupiersList slots={slots} deleteRow={deleteRow} />}
        </div>
    )
}