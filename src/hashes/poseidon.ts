// Modified from: https://github.com/iden3/circomlibjs/blob/main/src/poseidon_reference.js
import assert from "assert";
import bigInt, { BigInteger } from "big-integer";
import { poseidonConstants } from "./constants";
import { Ok, Err, Result } from "ts-results";

class FieldObject {
  prime: BigInteger;
  zero: BigInteger;

  constructor(prime: string) {
    this.prime = bigInt(prime);
    this.zero = bigInt(0);
  }

  modPrimeBigInt(elem: BigInteger): BigInteger {
    let ret = elem.mod(this.prime);
    if (ret.lesser(bigInt(0))) {
      ret = ret.add(this.prime);
    }
    return ret;
  }

  mapStringToFieldElem(elem: string): BigInteger {
    // If this starts with hex, we must specify the base
    if (elem.startsWith("0x")) {
      return this.modPrimeBigInt(bigInt(elem.slice(2), bigInt(16)));
    }
    return this.modPrimeBigInt(bigInt(elem));
  }

  mapBigIntNativeToField(elem: bigint): BigInteger {
    return this.modPrimeBigInt(bigInt(elem));
  }

  add(elem1: BigInteger, elem2: BigInteger): BigInteger {
    return this.modPrimeBigInt(elem1.add(elem2));
  }

  mul(elem1: BigInteger, elem2: BigInteger): BigInteger {
    return this.modPrimeBigInt(elem1.multiply(elem2));
  }

  exp(elem: BigInteger, power: number): BigInteger {
    return this.modPrimeBigInt(elem.modPow(power, this.prime));
  }
}

//@ts-ignore
function unsringifyConstants(F: FieldObject, o) {
  if (typeof o == "string" && /^[0-9]+$/.test(o)) {
    return F.mapStringToFieldElem(o);
  } else if (typeof o == "string" && /^0x[0-9a-fA-F]+$/.test(o)) {
    return F.mapStringToFieldElem(o);
  } else if (Array.isArray(o)) {
    return o.map(unsringifyConstants.bind(null, F));
  } else if (typeof o == "object") {
    if (o === null) return null;
    const res = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      //@ts-ignore
      res[k] = unsringifyConstants(F, o[k]);
    });
    return res;
  } else {
    return o;
  }
}

function buildPoseidon(prime: string) {
  const F: FieldObject = new FieldObject(prime);

  // Parameters are generated by a reference script https://extgit.iaik.tugraz.at/krypto/hadeshash/-/blob/master/code/generate_parameters_grain.sage
  // Used like so: sage generate_parameters_grain.sage 1 0 254 2 8 56 0x30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001
  const { C, M } = unsringifyConstants(F, poseidonConstants);

  // Using recommended parameters from whitepaper https://eprint.iacr.org/2019/458.pdf (table 2, table 8)
  // Generated by https://extgit.iaik.tugraz.at/krypto/hadeshash/-/blob/master/code/calc_round_numbers.py
  // And rounded up to nearest integer that divides by t
  const N_ROUNDS_F = 8;
  const N_ROUNDS_P = [
    56, 57, 56, 60, 60, 63, 64, 63, 60, 66, 60, 65, 70, 60, 64, 68,
  ];

  const pow5 = (a: any) => F.exp(a, 5);

  function poseidon(inputs: bigint[]) {
    assert(inputs.length > 0);
    assert(inputs.length <= N_ROUNDS_P.length);

    const t = inputs.length + 1;
    const nRoundsF = N_ROUNDS_F;
    const nRoundsP = N_ROUNDS_P[t - 2];

    const initState = F.zero;
    const nOut = 1;

    let state = [initState, ...inputs.map((a: bigint) => F.mapBigIntNativeToField(a))];
    for (let r = 0; r < nRoundsF + nRoundsP; r++) {
      state = state.map((a, i) => F.add(a, C[t - 2][r * t + i]));

      if (r < nRoundsF / 2 || r >= nRoundsF / 2 + nRoundsP) {
        state = state.map((a) => pow5(a));
      } else {
        state[0] = pow5(state[0]);
      }

      state = state.map((_, i) =>
        state.reduce(
          (acc, a, j) => F.add(acc, F.mul(M[t - 2][i][j], a)),
          F.zero
        )
      );
    }
    if (nOut == 1) {
      return state[0];
    } else {
      return state.slice(0, nOut);
    }
  }

  poseidon.F = F;
  return poseidon;
}

export function poseidon(inputs: bigint[], prime: string): Result<bigint, string> {
  if (inputs.length <= 0 || inputs.length > 16) {
    return Err(`Inputs array was too large, it must have a length less than or equal to 16`);
  } 
  const _poseidonFunction = buildPoseidon(prime);
  let x = _poseidonFunction(inputs);
  return Ok(BigInt(x.toString()));
}
