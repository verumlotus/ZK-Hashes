pragma circom 2.1.1;

include "mimcsponge.circom";

// MiMC hash a 2D Matrix, with NUM_ITERATIONS iterations for MimC
template MimcHashMatrix2D(rows, cols, num_iterations, key) {
    signal input matrix[rows][cols];
    signal output hash;

    component mimc = MiMCSponge(rows * cols, num_iterations, 1);
    mimc.k <== key;
}

// MiMC hash a 3D matrix, with NUM_ITERATIONS iterations for MiMC
// Elements are unrolled into a single flattened vector
template MimcHashMatrix3D(rows, cols, depth, num_iterations, key) {
    signal input matrix[rows][cols][depth];
    signal output hash;

    component mimc = MiMCSponge(rows * cols * depth, num_iterations, 1);
    mimc.k <== key;

    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            for (var dep = 0; dep < depth; dep++) {
                var indexFlattenedVector = (row * cols * depth) + (col * depth) + dep;
                mimc.ins[indexFlattenedVector] <== matrix[row][col][dep];
            }
        }
    }

    hash <== mimc.outs[0];
}