import React, {useEffect, useState} from "react";
import {OccupiersList, Slot} from "./OccupiersDetail";


export const NextOccupiers: React.FC<{slots: Slot[]}> = ({slots}) => {


    return (
        <div style={{justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <h3>Prochains occupants</h3>
    {slots.length === 0 ? (<span>Personne n'a encore indiqué de créneau...</span>) : <OccupiersList slots={slots} />}
        </div>
    )
}