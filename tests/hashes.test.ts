import { mimcHash } from "../src/hashes/mimcSponge";
import {poseidon} from "../src/hashes/poseidon";
import { inputs, MimcBN128ExpectedOutput } from "./inputOutput";
import { BN128_PRIME, VESTA_PRIME } from "../src/hashes/constants";
// import { Ok, Err, Result } from "ts-results";

// Verifying JS Libraries match with CircomLib output
describe("MimcBN128", () => {
    it("positiveNumber", () => {
        // Num iterations = 220, key = 12
        const hash_inputs = BigInt(inputs['positiveNumber']);
        const num_iterations = 220;
        const key = BigInt(12);
        const value = mimcHash([hash_inputs], num_iterations, key, BN128_PRIME);
        expect(value.val).toEqual(BigInt("4461432677172336824418814573703057640945545961921058491712912892595903902118"));
    })
    it("negativeNumber", () => {
        // Num iterations = 211, key = 900
        const hash_inputs = BigInt(inputs['negativeNumber']);
        const num_iterations = 211;
        const key = BigInt(900);
        const value = mimcHash([hash_inputs], num_iterations, key, BN128_PRIME);
        expect(value.val).toEqual(BigInt("6213774002967914397523395822807914809105290069651663353468649348524194433652"));
    })
    it("overflowNumberBN128", () => {
        // Num iterations = 187, key = 2
        const hash_inputs = BigInt(inputs['overflowNumberBN128']);
        const num_iterations = 187;
        const key = BigInt(2);
        const value = mimcHash([hash_inputs], num_iterations, key, BN128_PRIME);
        expect(value.val).toEqual(BigInt("15695208591769246316122970722379901526894492661299557970751078185958724645522"));
    })
    it("simpleArrayShort", () => {
        // Num iterations = 219, key = 7
        const hash_inputs = inputs['simpleArrayShort'].flatMap((elem) => BigInt(elem));
        const num_iterations = 219;
        const key = BigInt(7);
        const value = mimcHash(hash_inputs, num_iterations, key, BN128_PRIME);
        expect(value.val).toEqual(BigInt("9163458729317902996979304919878739830537582438161074387490291767340360840985"));
    })
    it("simpleArrayLong", () => {
        // Num iterations = 117, key = 3456
        const hash_inputs = inputs['simpleArrayLong'].flatMap((elem) => BigInt(elem));
        const num_iterations = 117;
        const key = BigInt(3456);
        const value = mimcHash(hash_inputs, num_iterations, key, BN128_PRIME);
        expect(value.val).toEqual(BigInt("18266212716526074266605924953738472907975966420064116550458055612803684335619"));
    })
    it("complexArrayNegatives", () => {
        // Num iterations = 181, key = 0
        const hash_inputs = inputs['complexArrayNegatives'].flatMap((elem) => BigInt(elem));
        const num_iterations = 181;
        const key = BigInt(0);
        const value = mimcHash(hash_inputs, num_iterations, key, BN128_PRIME);
        expect(value.val).toEqual(BigInt("644602865236917251718162161997568837828677511196005913290723810797897279702"));
    })
    it("complexArrayOverflows", () => {
        // Num iterations = 208, key = 77
        const hash_inputs = inputs['complexArrayOverflows'].flatMap((elem) => BigInt(elem));
        const num_iterations = 208;
        const key = BigInt(77);
        const value = mimcHash(hash_inputs, num_iterations, key, BN128_PRIME);
        expect(value.val).toEqual(BigInt("16056100543132141196167326806921271085749252700115893648820796452686373850357"));
    })
    it("2DArraySimple", () => {
        // Num iterations = 200, key = 20
        const hash_inputs = inputs['2DArraySimple'].flatMap((arr) => {return arr.flatMap((elem) => BigInt(elem))});
        const num_iterations = 200;
        const key = BigInt(20);
        const value = mimcHash(hash_inputs, num_iterations, key, BN128_PRIME);
        expect(value.val).toEqual(BigInt("7791320094710154790029759622725503065814531517402155941626002724332901633656"));
    })
    it("2DArrayNegatives", () => {
        // Num iterations = 217, key = 218
        const hash_inputs = inputs['2DArrayNegatives'].flatMap((arr) => {return arr.flatMap((elem) => BigInt(elem))});
        const num_iterations = 217;
        const key = BigInt(218);
        const value = mimcHash(hash_inputs, num_iterations, key, BN128_PRIME);
        expect(value.val).toEqual(BigInt("13071366733944871372949294168015678105887661555742525870234659209245509701488"));
    })
    it("2DArrayOverflows", () => {
        // Num iterations = 212, key = 5001
        const hash_inputs = inputs['2DArrayOverflows'].flatMap((arr) => {return arr.flatMap((elem) => BigInt(elem))});
        const num_iterations = 212;
        const key = BigInt(5001);
        const value = mimcHash(hash_inputs, num_iterations, key, BN128_PRIME);
        expect(value.val).toEqual(BigInt("16868075657917333696542907055577222940014678628079087874311505717893483647145"));
    })
    it("3DArrayNegatives", () => {
        // Num iterations = 220, key = 0
        const hash_inputs = inputs['3DArrayNegatives'].flatMap((outerArr) => {return outerArr.flatMap((innerArr) => {return innerArr.flatMap((elem) => BigInt(elem))})});
        const num_iterations = 220;
        const key = BigInt(0);
        const value = mimcHash(hash_inputs, num_iterations, key, BN128_PRIME);
        expect(value.val).toEqual(BigInt("21865030777828483721814814140605586061033847637133116016794408111123908573563"));
    })
    it("3DArrayOverflows", () => {
        // Num iterations = 219, key = 42
        const hash_inputs = inputs['3DArrayOverflows'].flatMap((outerArr) => {return outerArr.flatMap((innerArr) => {return innerArr.flatMap((elem) => BigInt(elem))})});
        const num_iterations = 219;
        const key = BigInt(42);
        const value = mimcHash(hash_inputs, num_iterations, key, BN128_PRIME);
        expect(value.val).toEqual(BigInt("11103571403184333388678300158844507410532454363643595465412138681918501733988"));
    })
});

export {}