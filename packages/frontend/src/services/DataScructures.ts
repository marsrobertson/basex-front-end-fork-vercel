let CreateOrgJSON = {
    "title": "Add an item to ___NAME___",
    "description": "Someone requested to add an item to ___NAME___",
    "rulingOptions": {
        "titles": [
            "Yes, Add It",
            "No, Don't Add It"
        ],
        "descriptions": [
            "Select this if you think the item complies with the required criteria and should be added.",
            "Select this if you think the item does not comply with the required criteria and should not be added."
        ]
    },
    "category": "Curated Lists",
    "question": "Does the item comply with the required criteria?",
    "fileURI": "/ipfs/Qme7FPNUB5LodubXPv8u1STixYmwygY5VDjMVPEUtQMrAW/2023-06-16-kleros-basex-policies-generic.pdf",
    "evidenceDisplayInterfaceURI": "/ipfs/QmQjJio59WkrQDzPC5kSP3EiGaqrWxjGfkvhmD2mWwm41M/index.html",
    "metadata": {
        "tcrTitle": "___NAME___",
        "tcrDescription": "List of reports applicable to ___NAME___",
        "itemName": "item",
        "itemNamePlural": "items",
        "logoURI": "/ipfs/QmexNCGoG21z4Rn6eQsPLmsCJ5ywsLdFJSVymXGMg9hPt9/placeholder-doge.png",
        "requireRemovalEvidence": true,
        "isTCRofTCRs": false,
        "relTcrDisabled": true,
        "columns": [
            {
                "label": "Title",
                "description": "...",
                "type": "text",
                "isIdentifier": true
            },
            {
                "label": "Source URL",
                "description": "...",
                "type": "text",
                "isIdentifier": false
            },
            {
                "label": "Start Date",
                "description": "...",
                "type": "number"
            },
            {
                "label": "End Date",
                "description": "...",
                "type": "number"
            },
            {
                "label": "File",
                "description": "...",
                "type": "file",
                "allowedFileTypes": "pdf"
            },
            {
                "label": "Comments",
                "description": "...",
                "type": "text"
            },
            {
                "label": "GUID",
                "description": "The GUID of this item",
                "type": "text"
            },
            {
                "label": "GUID Target",
                "description": "In case of the evaluation, we refer to the GUID of the item",
                "type": "text"
            },
            {
                "label": "Positive Value",
                "description": "PVT",
                "type": "number"
            },
            {
                "label": "Negative Value",
                "description": "NVT",
                "type": "number"
            },


            {
                "label": "SDG1 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG1 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG2 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG2 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG3 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG3 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG4 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG4 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG15 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG5 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG6 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG6 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG7 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG7 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG8 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG8 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG9 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG9 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG10 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG10 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG11 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG11 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG12 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG12 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG13 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG13 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG14 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG14 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG15 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG15 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG16 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG16 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG17 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG17 Comment",
                "description": "...",
                "type": "text"
            }
        ]
    }
};

let RemoveOrgJSON = {
    "title": "Remove an item from ___NAME___",
    "description": "Someone requested to remove an item from ___NAME___",
    "rulingOptions": {
        "titles": [
            "Yes, Remove It",
            "No, Don't Remove It"
        ],
        "descriptions": [
            "Select this if you think the item does not comply with the required criteria and should be removed.",
            "Select this if you think the item complies with the required criteria and should not be removed."
        ]
    },
    "category": "Curated Lists",
    "question": "Does the item comply with the required criteria?",
    "fileURI": "/ipfs/Qme7FPNUB5LodubXPv8u1STixYmwygY5VDjMVPEUtQMrAW/2023-06-16-kleros-basex-policies-generic.pdf",
    "evidenceDisplayInterfaceURI": "/ipfs/QmQjJio59WkrQDzPC5kSP3EiGaqrWxjGfkvhmD2mWwm41M/index.html",
    "metadata": {
        "tcrTitle": "___NAME___",
        "tcrDescription": "List of reports applicable to ___NAME___",
        "itemName": "item",
        "itemNamePlural": "items",
        "logoURI": "/ipfs/QmexNCGoG21z4Rn6eQsPLmsCJ5ywsLdFJSVymXGMg9hPt9/placeholder-doge.png",
        "requireRemovalEvidence": true,
        "isTCRofTCRs": false,
        "relTcrDisabled": true,
        "columns": [
            {
                "label": "Title",
                "description": "...",
                "type": "text",
                "isIdentifier": true
            },
            {
                "label": "Source URL",
                "description": "...",
                "type": "text",
                "isIdentifier": false
            },
            {
                "label": "Start Date",
                "description": "...",
                "type": "number"
            },
            {
                "label": "End Date",
                "description": "...",
                "type": "number"
            },
            {
                "label": "File",
                "description": "...",
                "type": "file",
                "allowedFileTypes": "pdf"
            },
            {
                "label": "Comments",
                "description": "...",
                "type": "text"
            },
            {
                "label": "GUID",
                "description": "The GUID of this item",
                "type": "text"
            },
            {
                "label": "GUID (referring to)",
                "description": "In case of the evaluation, we refer to the GUID of the item",
                "type": "text"
            },
            {
                "label": "Positive Value",
                "description": "PVT",
                "type": "number"
            },
            {
                "label": "Negative Value",
                "description": "NVT",
                "type": "number"
            },


            {
                "label": "SDG1 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG1 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG2 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG2 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG3 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG3 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG4 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG4 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG15 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG5 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG6 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG6 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG7 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG7 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG8 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG8 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG9 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG9 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG10 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG10 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG11 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG11 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG12 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG12 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG13 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG13 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG14 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG14 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG15 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG15 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG16 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG16 Comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG17 Value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG17 Comment",
                "description": "...",
                "type": "text"
            }
        ]
    }
};

let AddItemJSON = {
    "columns": [
        {
            "label": "Title",
            "description": "...",
            "type": "text",
            "isIdentifier": true
        },
        {
            "label": "Source URL",
            "description": "...",
            "type": "text",
            "isIdentifier": false
        },
        {
            "label": "Start Date",
            "description": "...",
            "type": "number"
        },
        {
            "label": "End Date",
            "description": "...",
            "type": "number"
        },
        {
            "label": "File",
            "description": "...",
            "type": "file",
            "allowedFileTypes": "pdf"
        },
        {
            "label": "Comments",
            "description": "...",
            "type": "text"
        },
        {
            "label": "GUID",
            "description": "The GUID of this item",
            "type": "text"
        },
        {
            "label": "GUID Target",
            "description": "In case of the evaluation, we refer to the GUID of the item",
            "type": "text"
        },
        {
            "label": "Positive Value",
            "description": "PVT",
            "type": "number"
        },
        {
            "label": "Negative Value",
            "description": "NVT",
            "type": "number"
        },


        {
            "label": "SDG1 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG1 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG2 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG2 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG3 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG3 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG4 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG4 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG15 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG5 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG6 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG6 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG7 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG7 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG8 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG8 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG9 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG9 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG10 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG10 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG11 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG11 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG12 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG12 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG13 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG13 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG14 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG14 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG15 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG15 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG16 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG16 Comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG17 Value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG17 Comment",
            "description": "...",
            "type": "text"
        }
    ],
        "values": {
            "Title": "",
            "Source URL": "",
            "File": "",
            "Comments": "",
            "Start Date": "",
            "End Date": "",
            "Positive Value": "",
            "Negative Value": "",
            "GUID": "",
            "GUID Target": "",
            "SDG1 Value": "",
            "SDG1 Comment": "",
            "SDG2 Value": "",
            "SDG2 Comment": "",
            "SDG3 Value": "",
            "SDG3 Comment": "",
            "SDG4 Value": "",
            "SDG4 Comment": "",
            "SDG5 Value": "",
            "SDG5 Comment": "",
            "SDG6 Value": "",
            "SDG6 Comment": "",
            "SDG7 Value": "",
            "SDG7 Comment": "",
            "SDG8 Value": "",
            "SDG8 Comment": "",
            "SDG9 Value": "",
            "SDG9 Comment": "",
            "SDG10 Value": "",
            "SDG10 Comment": "",
            "SDG11 Value": "",
            "SDG11 Comment": "",
            "SDG12 Value": "",
            "SDG12 Comment": "",
            "SDG13 Value": "",
            "SDG13 Comment": "",
            "SDG14 Value": "",
            "SDG14 Comment": "",
            "SDG15 Value": "",
            "SDG15 Comment": "",
            "SDG16 Value": "",
            "SDG16 Comment": "",
            "SDG17 Value": "",
            "SDG17 Comment": ""
        }
};

let AddOrgToKlerosJSON = {
    "columns":[
       {
          "label":"Address",
          "description":"The list address.",
          "type":"GTCR address",
          "isIdentifier":true
       }
    ],
    "values":{
       "Address":""
    }
};

export { CreateOrgJSON, RemoveOrgJSON, AddItemJSON, AddOrgToKlerosJSON };
