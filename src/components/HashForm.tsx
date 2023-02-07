import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Result } from "ts-results";
import { generateHash } from "@/hashes/frontendUtils";
import styles from '@/styles/Home.module.css'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function HashForm() {
  const [hashFunction, setHashFunction] = useState("mimc");
  const [curve, setCurve] = useState<"bn-128" | "vesta" | "pallas">("bn-128");
  const [iterations, setIterations] = useState(220);
  const [key, setKey] = useState(0);
  const [input, setInput] = useState('');
  const [hashValue, setHashValue] = useState('');

  // Called when the generate button is clicked
  function generateAndDisplayHash() {
    let res: Result<bigint, string> = generateHash(hashFunction, curve, iterations, key, input);
    if (res.err) {
      toast.error('There was an error, please ensure your inputs are correct & settings are appropriate', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setHashValue(res.val.toString());
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>Hash Function</InputLabel>
          <Select
            value={hashFunction}
            label="Hash Function"
            onChange={(e) => setHashFunction(e.target.value)}
          >
            <MenuItem value={'mimc'}>MiMC</MenuItem>
            <MenuItem value={'poseidon'}>Poseidon</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>Curve</InputLabel>
          <Select
            value={curve}
            label="Curve"
            // @ts-ignore
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

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Button variant="outlined" onClick={generateAndDisplayHash}> Compute Hash </Button>
        </FormControl>

      </div>
      {
        hashValue &&
          <p className={styles.description} style={{padding: '1%'}}> 
            The hash is: {hashValue}
          </p>
      }
      <TextField
          label="Inputs"
          multiline
          rows={12}
          onChange={(e) => setInput(e.target.value)}
          defaultValue="Your hash input here (number, vector, or matrix)"
      />
      <ToastContainer
        position="top-left"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
