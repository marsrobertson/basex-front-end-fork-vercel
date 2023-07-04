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
                "label": "SDG1 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG1 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG2 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG2 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG3 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG3 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG4 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG4 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG15 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG5 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG6 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG6 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG7 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG7 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG8 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG8 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG9 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG9 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG10 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG10 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG11 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG11 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG12 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG12 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG13 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG13 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG14 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG14 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG15 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG15 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG16 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG16 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG17 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG17 comment",
                "description": "...",
                "type": "text"
            }
        ]
    }
}

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
                "label": "SDG1 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG1 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG2 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG2 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG3 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG3 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG4 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG4 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG15 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG5 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG6 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG6 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG7 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG7 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG8 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG8 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG9 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG9 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG10 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG10 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG11 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG11 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG12 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG12 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG13 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG13 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG14 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG14 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG15 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG15 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG16 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG16 comment",
                "description": "...",
                "type": "text"
            },
            {
                "label": "SDG17 value",
                "description": "...",
                "type": "number"
            },
            {
                "label": "SDG17 comment",
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
            "label": "SDG1 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG1 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG2 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG2 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG3 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG3 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG4 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG4 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG15 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG5 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG6 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG6 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG7 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG7 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG8 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG8 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG9 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG9 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG10 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG10 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG11 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG11 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG12 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG12 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG13 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG13 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG14 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG14 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG15 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG15 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG16 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG16 comment",
            "description": "...",
            "type": "text"
        },
        {
            "label": "SDG17 value",
            "description": "...",
            "type": "number"
        },
        {
            "label": "SDG17 comment",
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
            "GUID (referring to)": "",
            "SDG1 value": "",
            "SDG1 comment": "",
            "SDG2 value": "",
            "SDG2 comment": "",
            "SDG3 value": "",
            "SDG3 comment": "",
            "SDG4 value": "",
            "SDG4 comment": "",
            "SDG5 value": "",
            "SDG5 comment": "",
            "SDG6 value": "",
            "SDG6 comment": "",
            "SDG7 value": "",
            "SDG7 comment": "",
            "SDG8 value": "",
            "SDG8 comment": "",
            "SDG9 value": "",
            "SDG9 comment": "",
            "SDG10 value": "",
            "SDG10 comment": "",
            "SDG11 value": "",
            "SDG11 comment": "",
            "SDG12 value": "",
            "SDG12 comment": "",
            "SDG13 value": "",
            "SDG13 comment": "",
            "SDG14 value": "",
            "SDG14 comment": "",
            "SDG15 value": "",
            "SDG15 comment": "",
            "SDG16 value": "",
            "SDG16 comment": "",
            "SDG17 value": "",
            "SDG17 comment": ""
        }
    }

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
 }

export { CreateOrgJSON, RemoveOrgJSON, AddItemJSON, AddOrgToKlerosJSON };
