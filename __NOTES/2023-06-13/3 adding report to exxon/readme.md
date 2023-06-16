1. We deployed new organisation (Exxon)
2. We added Exxon to the list
3. Now we are going to add a report to Exxon

Same function as with 2

TX: https://goerli.etherscan.io/tx/0xa3bb56d372bbd0608553424ad797a0e6891e579f86975bbb1797fab5038baa6b

The target of TX is Exxon list, not the list of organisations.

```
{
   "columns":[
      {
         "label":"Title",
         "description":"...",
         "type":"text",
         "isIdentifier":true
      },
      {
         "label":"Source",
         "description":"...",
         "type":"text",
         "isIdentifier":false
      },
      {
         "label":"Report",
         "description":"...",
         "type":"file",
         "allowedFileTypes":"PDF"
      },
      {
         "label":"Start Date",
         "description":"...",
         "type":"number"
      },
      {
         "label":"End Date",
         "description":"...",
         "type":"number"
      },
      {
         "label":"Report Comments",
         "description":"...",
         "type":"text"
      },
      {
         "label":"Report GUID",
         "description":"...",
         "type":"text"
      },
      {
         "label":"Evaluation GUID",
         "description":"use guid of existing report or self reference (if report and evaluation at the same time)",
         "type":"text"
      },
      {
         "label":"Positive Value",
         "description":"PVT",
         "type":"number"
      },
      {
         "label":"Negative Value",
         "description":"NVT",
         "type":"number"
      },
      {
         "label":"Minted",
         "description":"Have tokens already issued",
         "type":"boolean"
      },
      {
         "label":"Evaluation Comments",
         "description":"...",
         "type":"text"
      },
      {
         "label":"Evaluation Report",
         "description":"...",
         "type":"file",
         "allowedFileTypes":"PDF"
      },
      {
         "label":"ESG data",
         "description":"17 SDGs",
         "type":"text"
      }
   ],
   "values":{
      "Title":"Environmental Report 2022",
      "Source":"https://basex.com",
      "Report":"",
      "Start Date":0,
      "End Date":0,
      "Report Comments":"",
      "Report GUID":"",
      "Evaluation GUID":"",
      "Positive Value":900,
      "Negative Value":800,
      "Minted":false,
      "Evaluation Comments":"",
      "Evaluation Report":"",
      "ESG data":""
   }
}
```