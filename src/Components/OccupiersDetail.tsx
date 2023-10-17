import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export const OccupiersList: React.FC<{ slots: Slot[], deleteRow: (id: string) => void}> = ({slots, deleteRow}) => {
    return (
        <div>
            <TableContainer component={Paper} style={{maxWidth: 650}}>
                <Table sx={{maxWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Occupant(s)</TableCell>
                            <TableCell align="right">Début</TableCell>
                            <TableCell align="right">Fin</TableCell>
                            <TableCell align="right">Supprimer le créneau</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slots.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0, backgroundColor: row.id%2===0 ? 'white' : '#DEDEDE' }}}
                            >
                                <TableCell component="th" scope="row">
                                    <b>{row.name}</b>
                                </TableCell>
                                <TableCell align="right"><b>{row.start}</b></TableCell>
                                <TableCell align="right"><b>{row.end}</b></TableCell>
                                <TableCell align="right">
                                    <div >
                                        <svg fill="#ff0000" height="20px" width="20px" version="1.1" id="Layer_1"
                                             xmlns="http://www.w3.org/2000/svg"
                                             xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 300.003 300.003"
                                             style={{cursor: "pointer"}}
                                             onClick={() => deleteRow(row.id)}
                                             xmlSpace="preserve" stroke="#ff0000">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                               strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M150,0C67.159,0,0.001,67.159,0.001,150c0,82.838,67.157,150.003,149.997,150.003S300.002,232.838,300.002,150 C300.002,67.159,232.839,0,150,0z M206.584,207.171c-5.989,5.984-15.691,5.984-21.675,0l-34.132-34.132l-35.686,35.686 c-5.986,5.984-15.689,5.984-21.672,0c-5.989-5.991-5.989-15.691,0-21.68l35.683-35.683L95.878,118.14 c-5.984-5.991-5.984-15.691,0-21.678c5.986-5.986,15.691-5.986,21.678,0l33.222,33.222l31.671-31.673 c5.986-5.984,15.694-5.986,21.675,0c5.989,5.991,5.989,15.697,0,21.678l-31.668,31.671l34.13,34.132 C212.57,191.475,212.573,201.183,206.584,207.171z"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}


export type Slot = {
    start: string;
    end: string;
    name: string;
    id?: number;
    color: string
}