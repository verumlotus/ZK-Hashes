pragma circom 2.1.1;
include "./utils/mimcsponge.circom";
include "./utils/utils.circom";

template MimcHashGenerator() {
    signal input dummy;
    signal output hash;

    // Positive Number
    component mimc = MiMCSponge(1, 220, 1);
    mimc.ins <== [6500];
    mimc.k <== 12;
    log("Positive Number: ", mimc.outs[0]);

    // Negative Number
    component mimc_neg = MiMCSponge(1, 211, 1);
    mimc_neg.ins <== [-912];
    mimc_neg.k <== 900;
    log("Negative Number: ", mimc_neg.outs[0]);

    // Overflow Number
    component mimc_overflow = MiMCSponge(1, 187, 1);
    mimc_overflow.ins <== [21888242871839275222246405745257275088548364400416034343698204186575837798518];
    mimc_overflow.k <== 2;
    log("BN128 Overflow Number: ", mimc_overflow.outs[0]);

    // 2D Simply Array Short
    component mimc_simply_array_short = MiMCSponge(2, 219, 1);
    mimc_simply_array_short.ins <== [1, 2];
    mimc_simply_array_short.k <== 7;
    log("2D Simply Array Short: ", mimc_simply_array_short.outs[0]);

    // 2D Simply Array Long
    component mimc_simply_array_long = MiMCSponge(16, 117, 1);
    mimc_simply_array_long.ins <== [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    mimc_simply_array_long.k <== 3456;
    log("2D Simply Array Long: ", mimc_simply_array_long.outs[0]);

    // complexArrayNegatives
    component mimc_complexArrayNegatives = MiMCSponge(5, 181, 1);
    mimc_complexArrayNegatives.ins <== [1, 890, -12, 5647, -900];
    mimc_complexArrayNegatives.k <== 0;
    log("complexArrayNegatives: ", mimc_complexArrayNegatives.outs[0]);

    // complexArrayOverflows
    component mimc_complexArrayOverflows = MiMCSponge(5, 208, 1);
    mimc_complexArrayOverflows.ins <== [-800, 34, 56, 28948022309329048855892746252171976963363056481941647379679742748393601871988, 
    -28948022309329048855892746252171976963363056481941647379679742748393601871978];
    mimc_complexArrayOverflows.k <== 77;
    log("complexArrayOverflows: ", mimc_complexArrayOverflows.outs[0]);

    // 2D Array Simple
    component mimc_2d_simple = MimcHashMatrix2D(3, 4, 200, 20);
    mimc_2d_simple.matrix <== [[1, 2, 3, 4], [9, 900, 34, 56], [89, 76, 23, 25000]];
    log("2D Array Simple: ", mimc_2d_simple.hash);

    // 2D Array Negatives
    component mimc_2d_negatives = MimcHashMatrix2D(3, 4, 217, 218);
    mimc_2d_negatives.matrix <== [[-1, 90, -6, -7], [40, 50, 0, 23], [12, -14, -900000, 5]];
    log("2D Array Negatives: ", mimc_2d_negatives.hash);

    // 2D Array Overflows
    component mimc_2d_overflows = MimcHashMatrix2D(3, 3, 212, 5001);
    mimc_2d_overflows.matrix <== [[8, -9, 28948022309329048855892746252171976963363056481941647379679742748393601871988], [12, 28948022309329048855892746252171976963363056481941647379679742748393601871898, -14], [21888242871839275222246405745257275088548364400416034343698204186575837798518, -21888242871839275222246405745257275088548364400416034343698204186575837798519, 17]];
    log("2D Array Overflows: ", mimc_2d_overflows.hash);

    // 3D Array Negatives
    component mimc_3d_negatives = MimcHashMatrix3D(4, 3, 4, 220, 0);
    mimc_3d_negatives.matrix <== [[[-92, 24, -91, 27], [75, -79, 74, 5], [54, 29, -37, 17]], [[-55, -47, 19, -79], [-15, -25, 3, -66], [-39, 23, -21, -18]], [[-86, 16, 68, 75], [-76, -3, -65, 11], [-88, 69, -81, 81]], [[84, -13, -58, 100], [-46, 67, -84, 71], [-46, -10, 52, 76]]];
    log("3D Array Negatives: ", mimc_3d_negatives.hash);

    // 3D Array Overflows
    component mimc_3d_overflows = MimcHashMatrix3D(4, 3, 4, 219, 42);
    mimc_3d_overflows.matrix <== [[[-92, -17039252085508345054445146089948954297605118350696229162271450321641044061606, 41, -26], [48, 25871844077866966563642810585556709974691624923632687449837618333462858200718, 3, -8], [62, 28, 19326368186325987381126256940884625312664556445690447998276832989288966588898, 19085675532877298006160692929817376471636413682368822925307603473373900411026]], [[10, -49, -70, 20], [-41, 21, 2, 92], [-75, 10, 63, -72]], [[29, -5, -25, -13], [-15971384563337002820422482922224879487236770315701207290359901989600793644252, 69, 22347896220559703639797345736300658134780573725103874038693327827467895921364, 18], [-25, 1, 26719068897345387932548870699898836364056105357308367340535087026572637411276, -75]], [[13811140756651496243315306183542403123859093568357057239491567454146138836366, 8639626249264132910036609071192206290338279041639148985107627063308343897383, 28, -47], [12160942526354926125438854495227764869514556581769226101950009413975911634223, -20449298695596659795297650787556677883892287491817231954743633712631486259557, 97, -72], [7, 18, -18, -81]]];
    log("3D Array Overflows: ", mimc_3d_overflows.hash);

    dummy === 1;
}

component main = MimcHashGenerator();