import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

export const OccupiersList: React.FC<{slots: Slot[]}> = ({slots}) => {
    return (
        <div>
            <TableContainer component={Paper} style={{maxWidth: 650}}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Occupant(s)</TableCell>
                            <TableCell align="right">Début</TableCell>
                            <TableCell align="right">Fin</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slots.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.start}</TableCell>
                                <TableCell align="right">{row.end}</TableCell>
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
    name: string
}