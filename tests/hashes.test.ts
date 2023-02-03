import { mimcHash } from "../src/hashes/mimcSponge";
import {poseidon} from "../src/hashes/poseidon";
import { inputs, MimcBN128ExpectedOutput } from "./inputOutput";
import { BN128_PRIME, VESTA_PRIME } from "../src/hashes/constants";
// import { Ok, Err, Result } from "ts-results";

describe("Verifying JS Libraries match with CircomLib output", () => {
    describe("MimcBN128", () => {
        it("positiveNumber", () => {
            // Num iterations = 220, key = 12
            const hash_inputs = BigInt(inputs['positiveNumber']);
            const num_iterations = 220;
            const key = BigInt(12);
            const value = mimcHash([hash_inputs], num_iterations, key, BN128_PRIME);
            expect(value.val).toEqual(BigInt("4461432677172336824418814573703057640945545961921058491712912892595903902118"));
        })
    });
});

export {}