import { BN128_PRIME, VESTA_PRIME, PALLAS_PRIME } from "@/hashes/constants";
import { mimcHash } from "./mimcSponge";
import { poseidon } from "./poseidon";
import JSONBigBase from "json-bigint";
import { Result } from "ts-results";

const JSONBig = JSONBigBase({ useNativeBigInt: true, alwaysParseAsBig: true });
export const curve_to_prime = {
  "bn-128": BN128_PRIME,
  "vesta": VESTA_PRIME,
  "pallas": PALLAS_PRIME,
};

export function generateHash(hashFunction: string, curve: "bn-128" | "vesta" | "pallas", iterations: number, key: number, input: string): Result<bigint, string> {
  // First, convert the input from a string into an array of bigints
  let inputArray: bigint[];
  if (input.trim().startsWith("[")) {
    inputArray = JSONBig.parse(input).flat(50);
  } else {
    // We have a single number
    inputArray = [JSONBig.parse(input)];
  }

  // Now, we generate the hash 
  if (hashFunction == "mimc") {
    let res = mimcHash(inputArray, iterations, BigInt(key), curve_to_prime[curve]);
    return res;

  } else {
    let res = poseidon(inputArray, curve_to_prime[curve]);
    return res;
  }
}
