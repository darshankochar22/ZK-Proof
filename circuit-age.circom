pragma circom 2.0.0;

// Circuit to prove age >= 18 without revealing actual age
template AgeVerifier(){
    signal input age;           // Private: Your actual age
    signal input minAge;        // Public: Minimum age (18)
    signal output isValid;      // Public: 1 if age >= 18, 0 otherwise
    
    // Check if age >= minAge
    signal diff;
    diff <== age - minAge;
    
    // If age >= 18, diff should be >= 0
    // We'll use a simple comparison
    component isGte = GreaterEqThan(8);  // 8 bits = max age 255
    isGte.in[0] <== age;
    isGte.in[1] <== minAge;
    
    isValid <== isGte.out;
}

// Helper template for >= comparison
template GreaterEqThan(n) {
    signal input in[2];
    signal output out;

    component lt = LessThan(n);
    lt.in[0] <== in[0];
    lt.in[1] <== in[1];

    out <== 1 - lt.out;
}

// LessThan comparison (from circomlib)
template LessThan(n) {
    assert(n <= 252);
    signal input in[2];
    signal output out;

    component n2b = Num2Bits(n+1);
    n2b.in <== in[0]+ (1<<n) - in[1];

    out <== 1-n2b.out[n];
}

// Convert number to bits
template Num2Bits(n) {
    signal input in;
    signal output out[n];
    var lc1=0;

    var e2=1;
    for (var i = 0; i<n; i++) {
        out[i] <-- (in >> i) & 1;
        out[i] * (out[i] -1 ) === 0;
        lc1 += out[i] * e2;
        e2 = e2+e2;
    }

    lc1 === in;
}

component main {public [minAge]} = AgeVerifier();

