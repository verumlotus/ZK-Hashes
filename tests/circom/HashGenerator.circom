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

    dummy === 1;
}

component main = MimcHashGenerator();