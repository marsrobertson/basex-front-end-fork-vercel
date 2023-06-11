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

### Data structures

What exactly do we need?

#### Add organisation
```
    guid: guid // generated on the front end: https://github.com/uuidjs/uuid
    name: string
    logo: image (upload to IPFS)
```

#### Add data (SIMPLIFICATION)

Adding the data can be any of these:
* add report
* add evalution
* add report + evaluation at the same time


```
    guid: guid

    // REPORT PART
    title: string
    source: string (URL validation)
    uploadReport: string (UPLOAD then IPFS hash)
    start date: date (or unix time number)
    end date: date 
    commentsReport: string

    // EVALUATION PART
    positive value: number
    negative value: number // Solidity does not have negative numbers
    minted: boolean // after the evaluation is done, we can mint the tokens
    uploadEval: string (UPLOAD then IPFS hash)
    ESGdata: JSON to IPFS // These 17 SDGs - that will be a treasure trove of data, we want to keep it
    commentsEval: string
    reportGUID: guid // use guid of existing report or self reference (if report and evaluation at the same time)
```

