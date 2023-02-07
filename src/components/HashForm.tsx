import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import TextField from "@mui/material/TextField";

export default function HashForm() {
  const [hashFunction, setHashFunction] = useState("mimc");
  const [curve, setCurve] = useState("bn-128");
  const [iterations, setIterations] = useState(220);
  const [key, setKey] = useState(0);

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Hash Function</InputLabel>
        <Select
          value={hashFunction}
          label="Hash Function"
          onChange={(e) => setHashFunction(e.target.value)}
        >
          <MenuItem value={'mimc'}>Mimc</MenuItem>
          <MenuItem value={'poseidon'}>Poseidon</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Curve</InputLabel>
        <Select
          value={curve}
          label="Curve"
          onChange={(e) => setCurve(e.target.value)}
        >
          <MenuItem value={'bn-128'}>BN-128</MenuItem>
          <MenuItem value={'vesta'}>Vesta</MenuItem>
          <MenuItem value={'pallas'}>Pallas</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <TextField label="Mimc Iterations" variant="outlined" size="small" onChange={(e) => setIterations(parseInt(e.target.value))}/>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <TextField label="Mimc Key" variant="outlined" size="small" onChange={(e) => setKey(parseInt(e.target.value))}/>
      </FormControl>
    </div>
  );
}
