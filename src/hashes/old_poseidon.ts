// Credits: https://github.com/iden3/circomlibjs/blob/main/src/poseidon_reference.js
// and https://github.com/paulmillr/noble-curves/blob/main/src/abstract/poseidon.ts
import {PoseidonOpts, poseidon as buildPoseidon} from "@noble/curves/lib/abstract/poseidon";
import {Fp as generatedFieldObject} from "@noble/curves/lib/abstract/modular";
import { Ok, Err, Result } from "ts-results";
import { POSEIDON_ROUNDS_FULL, POSEIDON_ROUNDS_PARTIAL_ARRAY, POSEIDON_ROUND_CONSTANTS as POSEIDON_ROUND_CONSTANTS_STRING, POSEIDON_MDS as POSEIDON_MDS_STRING } from "./constants";

// Convert all constants to BigInt
const POSEIDON_ROUND_CONSTANTS = POSEIDON_ROUND_CONSTANTS_STRING.map((arr) => {return arr.map((elem) => BigInt(elem))});
const POSEIDON_MDS = POSEIDON_MDS_STRING.map((outerArr) => {return outerArr.map((innerArr) => {return innerArr.map((elem) => BigInt(elem))})});

export function poseidon(inputs: bigint[], prime: string): Result<bigint, string> {
    // First, we need to construct a Field object over our prime
    const fp = generatedFieldObject(BigInt(prime));
    const t = inputs.length + 1
    // Poseidon cannot take an array that is too long
    if (inputs.length <= 0 || inputs.length > POSEIDON_ROUNDS_PARTIAL_ARRAY.length) {
        return Err(`Inputs array was too large, it must have a length less than or equal to ${POSEIDON_ROUNDS_PARTIAL_ARRAY.length}`);
    }

    const poseidonOpts: PoseidonOpts = {
        Fp: fp,
        t: t,
        roundsFull: POSEIDON_ROUNDS_FULL, 
        roundsPartial: POSEIDON_ROUNDS_PARTIAL_ARRAY[t - 2],
        mds: POSEIDON_MDS[t - 2],
        roundConstants: POSEIDON_ROUND_CONSTANTS
    }

    const _poseidonFunction = buildPoseidon(poseidonOpts);
    let x = _poseidonFunction(inputs)[0]
    return Ok(x);
}