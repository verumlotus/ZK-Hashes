const dummyVal = 0;
export const inputs = {
    "positiveNumber": 6500, 
    "negativeNumber": -912, 
    // This number is bigger than the BN-128, Pallas, and Vesta curve primes
    "overflowNumber": "28948022309329048855892746252171976963363056481941647379679742748393601871999",
    "simpleArrayShort": [1, 2],
    "simpleArrayLong": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    "complexArrayNegatives": [1, 890, -12, 5647, -900],
    "complexArrayOverflows": [-800, 34, 56, "28948022309329048855892746252171976963363056481941647379679742748393601871988", "-28948022309329048855892746252171976963363056481941647379679742748393601871978"],
    "2DArraySimple": [[1, 2, 3, 4], [9, 900, 34, 56], [89, 76, 23, 25000]],
    "2DArrayNegatives": [[-1, 90, -6, -7], [40, 50, 0, 23], [12, -14, -900000, 5]],
    "2DArrayOverflows": [[8, -9, "28948022309329048855892746252171976963363056481941647379679742748393601871988"], [12, "28948022309329048855892746252171976963363056481941647379679742748393601871898", -14], ["21888242871839275222246405745257275088548364400416034343698204186575837798518", "-21888242871839275222246405745257275088548364400416034343698204186575837798519", 17]],
    "3DArrayNegatives": [[[-92, 24, -91, 27], [75, -79, 74, 5], [54, 29, -37, 17]], [[-55, -47, 19, -79], [-15, -25, 3, -66], [-39, 23, -21, -18]], [[-86, 16, 68, 75], [-76, -3, -65, 11], [-88, 69, -81, 81]], [[84, -13, -58, 100], [-46, 67, -84, 71], [-46, -10, 52, 76]]],
    "3DArrayOverflows": [[[-92, "-17039252085508345054445146089948954297605118350696229162271450321641044061606", 41, -26], [48, "25871844077866966563642810585556709974691624923632687449837618333462858200718", 3, -8], [62, 28, "19326368186325987381126256940884625312664556445690447998276832989288966588898", "19085675532877298006160692929817376471636413682368822925307603473373900411026"]], [[10, -49, -70, 20], [-41, 21, 2, 92], [-75, 10, 63, -72]], [[29, -5, -25, -13], ["-15971384563337002820422482922224879487236770315701207290359901989600793644252", 69, "22347896220559703639797345736300658134780573725103874038693327827467895921364", 18], [-25, 1, "26719068897345387932548870699898836364056105357308367340535087026572637411276", -75]], [["13811140756651496243315306183542403123859093568357057239491567454146138836366", "8639626249264132910036609071192206290338279041639148985107627063308343897383", 28, -47], ["12160942526354926125438854495227764869514556581769226101950009413975911634223", "-20449298695596659795297650787556677883892287491817231954743633712631486259557", 97, -72], [7, 18, -18, -81]]]
}

// export const MimcBN128ExpectedOutput = {
//     "positiveNumber": BigInt(dummyVal),
//     "negativeNumber": BigInt(dummyVal),
//     "overflowNumberBN128": BigInt(dummyVal),
//     "simpleArrayShort": BigInt(dummyVal),
//     "simpleArrayLong": BigInt(dummyVal),
//     "complexArrayNegatives": BigInt(dummyVal),
//     "complexArrayOverflows": BigInt(dummyVal),
//     "2DArrayNegatives": BigInt(dummyVal),
//     "2DArrayOverflows": BigInt(dummyVal),
//     "3DArrayNegatives": BigInt(dummyVal),
//     "3DArrayOverflows": BigInt(dummyVal)
// }

// export const MimcVestaExpectedOutput = {
//     "positiveNumber": BigInt(dummyVal),
//     "negativeNumber": BigInt(dummyVal),
//     "overflowNumberVesta": BigInt(dummyVal),
//     "simpleArrayShort": BigInt(dummyVal),
//     "simpleArrayLong": BigInt(dummyVal),
//     "complexArrayNegatives": BigInt(dummyVal),
//     "complexArrayOverflows": BigInt(dummyVal),
//     "2DArrayNegatives": BigInt(dummyVal),
//     "2DArrayOverflows": BigInt(dummyVal),
//     "3DArrayNegatives": BigInt(dummyVal),
//     "3DArrayOverflows": BigInt(dummyVal)
// }

// export const PoseidonBN128ExpectedOutput = {
//     "simpleArrayShort": BigInt(dummyVal),
//     "simpleArrayLong": BigInt(dummyVal),
//     "complexArrayNegatives": BigInt(dummyVal),
//     "complexArrayOverflows": BigInt(dummyVal),
// }

// export const PoseidonVestaExpectedOutput = {
//     "simpleArrayShort": BigInt(dummyVal),
//     "simpleArrayLong": BigInt(dummyVal),
//     "complexArrayNegatives": BigInt(dummyVal),
//     "complexArrayOverflows": BigInt(dummyVal),
// }

// "positiveNumber":, 
// "negativeNumber":
// "overflowNumberBN128":
// "overflowNumberVesta": 
// "simpleArrayShort": 
// "simpleArrayLong": 
// "complexArrayNegatives": 
// "complexArrayOverflows": 
// "2DArrayNegatives": 
// "2DArrayOverflows": 
// "3DArrayNegatives": 
// "3DArrayOverflows":