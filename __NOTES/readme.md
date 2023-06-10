# Kleros integration

We rely on Kleros jurors, this is our competetive advantage.

### Georli testnet

https://goerli.etherscan.io/address/0x55A3d9Bd99F286F1817CAFAAB124ddDDFCb0F314#code

`LightGTCRFactory` - `Deploy`

```
function deploy(
        IArbitrator _arbitrator,
        bytes memory _arbitratorExtraData,
        address _connectedTCR,
        string memory _registrationMetaEvidence,
        string memory _clearingMetaEvidence,
        address _governor,
        uint256[4] memory _baseDeposits,
        uint256 _challengePeriodDuration,
        uint256[3] memory _stakeMultipliers,
        address _relayContract
    )
```

`transaction-data.json`

`"50000000000000000"` - might need to convert to BigNumber, number too big for JavaScript, 0.05 ETH


### WTF data structures

We need to pass carefully crafted data.

It's called "MetaEvidence"

Reg = registration = https://ipfs.kleros.io/ipfs/QmRPZdDn3g4pJYjZaSoJZ83oUCv6twzYDTXUP9Lq8NKidd/reg-meta-evidence.json

Clr = clearing = https://ipfs.kleros.io/ipfs/QmZFt1kBFpWJ2X8RjeQSHMYaH7TFpugWYLUKorAN1FVGcC/clr-meta-evidence.json

Workaround: just use **HARDCODED** data. **MAYBE**: replace "Shell" with the name of the company + upload to IPFS + use the hash of the uploaded file and use in `transaction-data.json`

Bloated: https://github.com/ethereum/EIPs/issues/1497

See this principle: https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it