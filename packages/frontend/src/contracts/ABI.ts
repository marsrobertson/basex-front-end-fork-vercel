const ABI = [
	{
	   "inputs":[
		  {
			 "internalType":"address",
			 "name":"target",
			 "type":"address"
		  }
	   ],
	   "name":"AddressEmptyCode",
	   "type":"error"
	},
	{
	   "inputs":[
		  
	   ],
	   "name":"FailedInnerCall",
	   "type":"error"
	},
	{
	   "anonymous":false,
	   "inputs":[
		  {
			 "indexed":false,
			 "internalType":"string",
			 "name":"orgGuid",
			 "type":"string"
		  },
		  {
			 "indexed":false,
			 "internalType":"string",
			 "name":"itemGuid",
			 "type":"string"
		  }
	   ],
	   "name":"ItemAdded",
	   "type":"event"
	},
	{
	   "anonymous":false,
	   "inputs":[
		  {
			 "indexed":false,
			 "internalType":"string",
			 "name":"orgGuid",
			 "type":"string"
		  }
	   ],
	   "name":"OrganisationAddedToKleros",
	   "type":"event"
	},
	{
	   "anonymous":false,
	   "inputs":[
		  {
			 "indexed":false,
			 "internalType":"string",
			 "name":"orgGuid",
			 "type":"string"
		  }
	   ],
	   "name":"OrganisationDeployed",
	   "type":"event"
	},
	{
	   "anonymous":false,
	   "inputs":[
		  {
			 "indexed":false,
			 "internalType":"string",
			 "name":"itemGuid",
			 "type":"string"
		  }
	   ],
	   "name":"TokensMinted",
	   "type":"event"
	},
	{
	   "inputs":[
		  
	   ],
	   "name":"NVT",
	   "outputs":[
		  {
			 "internalType":"contract IERC20",
			 "name":"",
			 "type":"address"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  
	   ],
	   "name":"PVT",
	   "outputs":[
		  {
			 "internalType":"contract IERC20",
			 "name":"",
			 "type":"address"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  {
			 "internalType":"string",
			 "name":"itemGuid",
			 "type":"string"
		  },
		  {
			 "internalType":"string",
			 "name":"targetGuid",
			 "type":"string"
		  },
		  {
			 "internalType":"uint256",
			 "name":"orgIndex",
			 "type":"uint256"
		  },
		  {
			 "internalType":"string",
			 "name":"JSONIPFS",
			 "type":"string"
		  },
		  {
			 "internalType":"uint256",
			 "name":"PVTval",
			 "type":"uint256"
		  },
		  {
			 "internalType":"uint256",
			 "name":"NVTval",
			 "type":"uint256"
		  }
	   ],
	   "name":"addItem",
	   "outputs":[
		  
	   ],
	   "stateMutability":"payable",
	   "type":"function"
	},
	{
	   "inputs":[
		  {
			 "internalType":"uint256",
			 "name":"orgIndex",
			 "type":"uint256"
		  },
		  {
			 "internalType":"string",
			 "name":"organisationJSONIPFS",
			 "type":"string"
		  }
	   ],
	   "name":"addOrganisationToTheList",
	   "outputs":[
		  
	   ],
	   "stateMutability":"payable",
	   "type":"function"
	},
	{
	   "inputs":[
		  
	   ],
	   "name":"admin",
	   "outputs":[
		  {
			 "internalType":"address",
			 "name":"",
			 "type":"address"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  {
			 "internalType":"uint256",
			 "name":"orgIndex",
			 "type":"uint256"
		  },
		  {
			 "internalType":"address",
			 "name":"payoutWallet",
			 "type":"address"
		  }
	   ],
	   "name":"assignPayoutWallet",
	   "outputs":[
		  
	   ],
	   "stateMutability":"nonpayable",
	   "type":"function"
	},
	{
	   "inputs":[
		  {
			 "internalType":"string",
			 "name":"orgGuid",
			 "type":"string"
		  },
		  {
			 "internalType":"string",
			 "name":"name",
			 "type":"string"
		  },
		  {
			 "internalType":"string",
			 "name":"registrationJSONIPFS",
			 "type":"string"
		  },
		  {
			 "internalType":"string",
			 "name":"removingJSONIPFS",
			 "type":"string"
		  }
	   ],
	   "name":"deployOrganisation",
	   "outputs":[
		  {
			 "internalType":"uint256",
			 "name":"",
			 "type":"uint256"
		  },
		  {
			 "internalType":"address",
			 "name":"",
			 "type":"address"
		  }
	   ],
	   "stateMutability":"nonpayable",
	   "type":"function"
	},
	{
	   "inputs":[
		  {
			 "internalType":"uint256",
			 "name":"index",
			 "type":"uint256"
		  }
	   ],
	   "name":"getItem",
	   "outputs":[
		  {
			 "components":[
				{
				   "internalType":"string",
				   "name":"itemGuid",
				   "type":"string"
				},
				{
				   "internalType":"string",
				   "name":"targetGuid",
				   "type":"string"
				},
				{
				   "internalType":"uint256",
				   "name":"orgIndex",
				   "type":"uint256"
				},
				{
				   "internalType":"string",
				   "name":"JSONIPFS",
				   "type":"string"
				},
				{
				   "internalType":"uint256",
				   "name":"PVT",
				   "type":"uint256"
				},
				{
				   "internalType":"uint256",
				   "name":"NVT",
				   "type":"uint256"
				},
				{
				   "internalType":"bool",
				   "name":"approvedToKlerosAndTokensMinted",
				   "type":"bool"
				}
			 ],
			 "internalType":"struct Item",
			 "name":"",
			 "type":"tuple"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  
	   ],
	   "name":"getItems",
	   "outputs":[
		  {
			 "components":[
				{
				   "internalType":"string",
				   "name":"itemGuid",
				   "type":"string"
				},
				{
				   "internalType":"string",
				   "name":"targetGuid",
				   "type":"string"
				},
				{
				   "internalType":"uint256",
				   "name":"orgIndex",
				   "type":"uint256"
				},
				{
				   "internalType":"string",
				   "name":"JSONIPFS",
				   "type":"string"
				},
				{
				   "internalType":"uint256",
				   "name":"PVT",
				   "type":"uint256"
				},
				{
				   "internalType":"uint256",
				   "name":"NVT",
				   "type":"uint256"
				},
				{
				   "internalType":"bool",
				   "name":"approvedToKlerosAndTokensMinted",
				   "type":"bool"
				}
			 ],
			 "internalType":"struct Item[]",
			 "name":"",
			 "type":"tuple[]"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  {
			 "internalType":"uint256",
			 "name":"index",
			 "type":"uint256"
		  }
	   ],
	   "name":"getOrganisation",
	   "outputs":[
		  {
			 "components":[
				{
				   "internalType":"string",
				   "name":"orgGuid",
				   "type":"string"
				},
				{
				   "internalType":"string",
				   "name":"name",
				   "type":"string"
				},
				{
				   "internalType":"string",
				   "name":"JSONIPFS",
				   "type":"string"
				},
				{
				   "internalType":"address",
				   "name":"klerosAddress",
				   "type":"address"
				},
				{
				   "internalType":"address",
				   "name":"payoutWallet",
				   "type":"address"
				},
				{
				   "internalType":"uint256",
				   "name":"PVT",
				   "type":"uint256"
				},
				{
				   "internalType":"uint256",
				   "name":"NVT",
				   "type":"uint256"
				},
				{
				   "internalType":"uint256",
				   "name":"PVThistorical",
				   "type":"uint256"
				},
				{
				   "internalType":"uint256",
				   "name":"NVThistorical",
				   "type":"uint256"
				}
			 ],
			 "internalType":"struct Organisation",
			 "name":"",
			 "type":"tuple"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  
	   ],
	   "name":"getOrganisations",
	   "outputs":[
		  {
			 "components":[
				{
				   "internalType":"string",
				   "name":"orgGuid",
				   "type":"string"
				},
				{
				   "internalType":"string",
				   "name":"name",
				   "type":"string"
				},
				{
				   "internalType":"string",
				   "name":"JSONIPFS",
				   "type":"string"
				},
				{
				   "internalType":"address",
				   "name":"klerosAddress",
				   "type":"address"
				},
				{
				   "internalType":"address",
				   "name":"payoutWallet",
				   "type":"address"
				},
				{
				   "internalType":"uint256",
				   "name":"PVT",
				   "type":"uint256"
				},
				{
				   "internalType":"uint256",
				   "name":"NVT",
				   "type":"uint256"
				},
				{
				   "internalType":"uint256",
				   "name":"PVThistorical",
				   "type":"uint256"
				},
				{
				   "internalType":"uint256",
				   "name":"NVThistorical",
				   "type":"uint256"
				}
			 ],
			 "internalType":"struct Organisation[]",
			 "name":"",
			 "type":"tuple[]"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  {
			 "internalType":"string",
			 "name":"",
			 "type":"string"
		  }
	   ],
	   "name":"guidCollisions",
	   "outputs":[
		  {
			 "internalType":"bool",
			 "name":"",
			 "type":"bool"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  {
			 "internalType":"address",
			 "name":"_klerosFactory",
			 "type":"address"
		  },
		  {
			 "internalType":"address",
			 "name":"_klerosOrganisations",
			 "type":"address"
		  }
	   ],
	   "name":"initializer",
	   "outputs":[
		  
	   ],
	   "stateMutability":"nonpayable",
	   "type":"function"
	},
	{
	   "inputs":[
		  {
			 "internalType":"uint256",
			 "name":"",
			 "type":"uint256"
		  }
	   ],
	   "name":"items",
	   "outputs":[
		  {
			 "internalType":"string",
			 "name":"itemGuid",
			 "type":"string"
		  },
		  {
			 "internalType":"string",
			 "name":"targetGuid",
			 "type":"string"
		  },
		  {
			 "internalType":"uint256",
			 "name":"orgIndex",
			 "type":"uint256"
		  },
		  {
			 "internalType":"string",
			 "name":"JSONIPFS",
			 "type":"string"
		  },
		  {
			 "internalType":"uint256",
			 "name":"PVT",
			 "type":"uint256"
		  },
		  {
			 "internalType":"uint256",
			 "name":"NVT",
			 "type":"uint256"
		  },
		  {
			 "internalType":"bool",
			 "name":"approvedToKlerosAndTokensMinted",
			 "type":"bool"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  
	   ],
	   "name":"itemsLength",
	   "outputs":[
		  {
			 "internalType":"uint256",
			 "name":"",
			 "type":"uint256"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  
	   ],
	   "name":"klerosFactory",
	   "outputs":[
		  {
			 "internalType":"contract LightGTCRFactory",
			 "name":"",
			 "type":"address"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  
	   ],
	   "name":"klerosOrganisations",
	   "outputs":[
		  {
			 "internalType":"contract KlerosList",
			 "name":"",
			 "type":"address"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  {
			 "internalType":"uint256",
			 "name":"index",
			 "type":"uint256"
		  }
	   ],
	   "name":"mintTokensAfterAdded",
	   "outputs":[
		  
	   ],
	   "stateMutability":"nonpayable",
	   "type":"function"
	},
	{
	   "inputs":[
		  {
			 "internalType":"bytes[]",
			 "name":"data",
			 "type":"bytes[]"
		  }
	   ],
	   "name":"multicall",
	   "outputs":[
		  {
			 "internalType":"bytes[]",
			 "name":"results",
			 "type":"bytes[]"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  {
			 "internalType":"uint256",
			 "name":"",
			 "type":"uint256"
		  }
	   ],
	   "name":"organisations",
	   "outputs":[
		  {
			 "internalType":"string",
			 "name":"orgGuid",
			 "type":"string"
		  },
		  {
			 "internalType":"string",
			 "name":"name",
			 "type":"string"
		  },
		  {
			 "internalType":"string",
			 "name":"JSONIPFS",
			 "type":"string"
		  },
		  {
			 "internalType":"address",
			 "name":"klerosAddress",
			 "type":"address"
		  },
		  {
			 "internalType":"address",
			 "name":"payoutWallet",
			 "type":"address"
		  },
		  {
			 "internalType":"uint256",
			 "name":"PVT",
			 "type":"uint256"
		  },
		  {
			 "internalType":"uint256",
			 "name":"NVT",
			 "type":"uint256"
		  },
		  {
			 "internalType":"uint256",
			 "name":"PVThistorical",
			 "type":"uint256"
		  },
		  {
			 "internalType":"uint256",
			 "name":"NVThistorical",
			 "type":"uint256"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  
	   ],
	   "name":"organisationsLength",
	   "outputs":[
		  {
			 "internalType":"uint256",
			 "name":"",
			 "type":"uint256"
		  }
	   ],
	   "stateMutability":"view",
	   "type":"function"
	},
	{
	   "inputs":[
		  {
			 "internalType":"address",
			 "name":"PVTaddr",
			 "type":"address"
		  },
		  {
			 "internalType":"address",
			 "name":"NVTaddr",
			 "type":"address"
		  }
	   ],
	   "name":"setupPVTNVT",
	   "outputs":[
		  
	   ],
	   "stateMutability":"nonpayable",
	   "type":"function"
	}
 ]

export default ABI;
