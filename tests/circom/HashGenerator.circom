pragma circom 2.1.1;
include "./utils/mimcsponge.circom";
include "./utils/utils.circom";

template MimcHashGenerator(num_iterations, key) {
    signal input dummy;
    signal output hash;
    component mimc = MiMCSponge(1, num_iterations, 1);
    mimc.ins <== [6500];
    mimc.k <== key;
    log(mimc.outs[0]);
    dummy === 1;
}

component main = MimcHashGenerator(220, 12);