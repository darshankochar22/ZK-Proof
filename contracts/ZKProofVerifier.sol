// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Verifier.sol";

/**
 * @title ZKProofVerifier
 * @dev Wrapper contract for the ZK-SNARK verifier with user-friendly functions
 */
contract ZKProofVerifier is Groth16Verifier {
    struct ProofData {
        address prover;
        uint256 publicHash;
        uint256 timestamp;
        bool isValid;
    }

    // Mapping from proof hash => ProofData
    mapping(bytes32 => ProofData) public verifiedProofs;

    // Array to store all proof hashes
    bytes32[] public proofHashes;

    // Events
    event ProofVerified(
        bytes32 indexed proofHash,
        address indexed prover,
        uint256 publicHash,
        uint256 timestamp
    );

    event VerificationFailed(address indexed prover, uint256 timestamp);

    /**
     * @dev Verify a ZK-SNARK proof and store it on-chain
     * @param pA First part of the proof
     * @param pB Second part of the proof
     * @param pC Third part of the proof
     * @param pubSignals Public signals (the hash output)
     */
    function verifyAndStore(
        uint[2] memory pA,
        uint[2][2] memory pB,
        uint[2] memory pC,
        uint[1] memory pubSignals
    ) public returns (bool) {
        // Verify the proof using the parent contract
        bool isValid = this.verifyProof(pA, pB, pC, pubSignals);

        if (isValid) {
            // Create a unique hash for this proof
            bytes32 proofHash = keccak256(
                abi.encodePacked(pA, pB, pC, pubSignals, msg.sender)
            );

            // Store the proof data
            verifiedProofs[proofHash] = ProofData({
                prover: msg.sender,
                publicHash: pubSignals[0],
                timestamp: block.timestamp,
                isValid: true
            });

            // Add to array
            proofHashes.push(proofHash);

            // Emit event
            emit ProofVerified(
                proofHash,
                msg.sender,
                pubSignals[0],
                block.timestamp
            );

            return true;
        } else {
            emit VerificationFailed(msg.sender, block.timestamp);
            return false;
        }
    }

    /**
     * @dev Get proof data by hash
     */
    function getProof(
        bytes32 proofHash
    ) public view returns (ProofData memory) {
        return verifiedProofs[proofHash];
    }

    /**
     * @dev Get total number of verified proofs
     */
    function getTotalProofs() public view returns (uint256) {
        return proofHashes.length;
    }

    /**
     * @dev Get all proofs by a specific prover
     */
    function getProofsByProver(
        address prover
    ) public view returns (bytes32[] memory) {
        uint256 count = 0;

        // Count proofs by this prover
        for (uint256 i = 0; i < proofHashes.length; i++) {
            if (verifiedProofs[proofHashes[i]].prover == prover) {
                count++;
            }
        }

        // Create result array
        bytes32[] memory result = new bytes32[](count);
        uint256 index = 0;

        // Fill result array
        for (uint256 i = 0; i < proofHashes.length; i++) {
            if (verifiedProofs[proofHashes[i]].prover == prover) {
                result[index] = proofHashes[i];
                index++;
            }
        }

        return result;
    }

    /**
     * @dev Get the latest N proofs
     */
    function getLatestProofs(
        uint256 count
    ) public view returns (bytes32[] memory) {
        uint256 total = proofHashes.length;
        uint256 returnCount = count > total ? total : count;

        bytes32[] memory result = new bytes32[](returnCount);

        for (uint256 i = 0; i < returnCount; i++) {
            result[i] = proofHashes[total - 1 - i];
        }

        return result;
    }
}
