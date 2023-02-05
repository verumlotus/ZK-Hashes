WITNESS_FILE=hash_generator.wtns
# Compile circuit
circom ./HashGenerator.circom --r1cs --wasm # --prime pallas
# Generate the witness, this is when the output hash is logged
node HashGenerator_js/generate_witness.js HashGenerator_js/HashGenerator.wasm hash_generator.json $WITNESS_FILE

# Now that the output is logged, let's perform cleanup of the artificats
rm $WITNESS_FILE
rm HashGenerator.r1cs
rm HashGenerator.wasm
rm -rf HashGenerator_js