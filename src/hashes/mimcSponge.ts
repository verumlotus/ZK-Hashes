// Modified from: https://github.com/darkforest-eth/packages/blob/fa364c8acaf93492092784421b7776746319065b/hashing/src/mimc.ts

import bigInt, { BigInteger } from 'big-integer';
import { MIMC_CONSTANTS } from './constants';
import { Ok, Err, Result } from "ts-results";

const c = MIMC_CONSTANTS.map((n) => bigInt(n));

class FeistelState {
  l: BigInteger;
  r: BigInteger;
  rounds: number;
  k: BigInteger;
  p: BigInteger;

  constructor(rounds: number, k: BigInteger, p: BigInteger) {
    this.l = bigInt(0);
    this.r = bigInt(0);
    this.rounds = rounds;
    this.k = k;
    this.p = p;
  }

  inject(elt: BigInteger): void {
    this.l = this.l.add(elt).mod(this.p);
  }

  mix(): void {
    for (let i = 0; i < this.rounds - 1; i++) {
      const t = this.k.add(this.l).add(c[i]).mod(this.p);
      const lNew = t.modPow(5, this.p).add(this.r).mod(this.p);
      this.r = this.l;
      this.l = lNew;
    }
    const t = this.k.add(this.l).mod(this.p);
    this.r = t.modPow(5, this.p).add(this.r).mod(this.p);
  }
}

export function mimcSponge(
  inputs: BigInteger[],
  nOutputs: number,
  rounds: number,
  key: number,
  p: BigInteger
): BigInteger[] {
  const state = new FeistelState(rounds, bigInt(key), p);
  for (const elt of inputs) {
    state.inject(elt);
    state.mix();
  }
  const outputs: BigInteger[] = [state.l];
  for (let i = 0; i < nOutputs - 1; i++) {
    state.mix();
    outputs.push(state.l);
  }
  return outputs;
}

/**
 * Modulo a number with the LOCATION_ID_UB constant.
 * If the result is < 0, the LOCATION_ID_UB will then be added.
 *
 * @param x The number to modulo against LOCATION_ID_UB
 */
export function modPBigInt(x: bigint, p: BigInteger) {
  let ret = bigInt(x).mod(p);
  if (ret.lesser(bigInt(0))) {
    ret = ret.add(p);
  }
  return ret;
}

const _mimcWithRounds =
  (rounds: number, key: number, p: BigInteger) =>
  (inputs: bigint[]) =>
    mimcSponge(
      inputs.map((n) => modPBigInt(n, p)),
      1,
      rounds,
      key,
      p
    )[0];

/**
 * The primary function used to build any MiMC hashing algorithm
 */
function mimcHash(inputs: bigint[], num_iterations: number, key: number, prime: string): Result<bigint, string> {
  let mimcWithRounds = _mimcWithRounds(num_iterations, key, bigInt(prime));
  let value = BigInt(mimcWithRounds(inputs).toString());
  return Ok(value);
}

export default mimcHash;