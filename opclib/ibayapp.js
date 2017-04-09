//var OpenPaymentsCloudApplicationApi = require('open_payments_cloud_application_api');

var admin = require("firebase-admin");

var serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ibay-a190b.firebaseio.com"
});

var database = admin.database();

var ref = database.ref("invoices");

// Attach an asynchronous callback to read the data at our posts reference
console.log('starting');
ref.orderByChild("endDate").on("value", function(snapshot) {
    const auctions = snapshot.val();
    //console.log('auctions', auctions);
    Object.keys(auctions).forEach((key) => {
        const auction = auctions[key];
        if (!auction.status && auction.bids && Object.keys(auction.bids).length > 0 && auction.endDate < new Date().getTime()) {
            //console.log('Processing');
            const maxBid = Object.keys(auction.bids).reduce((max, bid) => {
                if (!max || max.bid < auction.bids[bid].bid) {
                    max = auction.bids[bid];
                }
                return max;
            });
            Promise.all([admin.auth().getUser(auction.user), admin.auth().getUser(auction.bids[maxBid].user)]).then(([seller, buyer]) => {
                ref.child(`${key}/status`).set({
                    status: 'processed',
                    result: {
                        card: '4532564821410515'
                    }
                });
                // // Sign up loan shard get managed card
                console.log(auction);
                // Update firebase with managed card and set status to processed
                console.log(seller);
                console.log(buyer);
                process.exit();
            })
        } else {
            console.log('exiting');
            //process.exit();
        }
    })
  console.log();
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// var hackbot = {
//     programmeId: "739345648328338",
//     credentialcode: "team-17",
//     password: "8Wt7GLd^",
//     withdraw: "97593089101271040",
//     deposit: "97593089101270016",
//     transfer: "97593089101269760",
//     externalaccount: "97593089101269504",
//     managedcard: "97593089101269248",
//     managedaccount: "97593089101268992",
//     corporateidentity: "97593089101268736",
//     corporateidentityinstance: "87593085012710413"
// }

// var xCallref = "initialtest";
// var xProgrammeKey = `${hackbot.credentialcode}|${hackbot.programmeId}`;
// //var xProgrammeKey = "team-17|739345648328338";

// var loginapi = new OpenPaymentsCloudApplicationApi.AuthApi();

// var loginrequest = {
//    "programmeId": hackbot.programmeId,
//    "credentialCode": hackbot.credentialcode,
//    "password": hackbot.password
// };

// var authorization = loginapi.authLogin(xCallref, xProgrammeKey, loginrequest).then(function(data) {
//         console.log('AUTHLOGIN API called successfully. Returned token:' + data.token);
//         return data.token;
//     }, function (error) {
//         console.error(error);
//     }
// );

// // Ignore this
// function CreateInvoiceTrade() {
// // 1. Create LoanSharkIdentity
// // 1.a Set password for LoanSharkIdentityRootUser
// // 2. Create External Account
// // 2.a. Top up external account with funds using payment simulator 
// // 3. Create Managed Account
// // 3.a. Make a deposit from External Account to Managed Account
// // 4. Create Managed Card
// // 5. Immediate top up Managed Card with funds from the Managed Account, equal to the bid amount
// // 6. Return Managed Card details to be given to the supplier of invoice
// // 6.a. Return external account details which receives the invoice payment on due date

// }

// // TODO: Change all the fields in loansharkidentityparams every time TestLoanSharkJoin is created
// function TestLoanSharkJoin() {
//     var loansharkidentityparams = {
//         "name": "uniqueshark8",
//         "profileId": hackbot.corporateidentity,
//         "rootCredentialCode": "uniquesharkrootcc8",
//         "supportEmail": "unique8@gmail.com",
//         "notificationEmail": "unique8@gmail.com",
//         "adminTitle": "Mr",
//         "adminName": "unique8",
//         "adminSurname": "shark8",
//         "adminEmail": "unique8@gmail.com"
//     };
//     var externalaccountparams = {
//         "profileId":hackbot.externalaccount,
//         "ownerId":"97757432090984448", // loan shark corporate identity instance
//         "friendlyName": "unique shark external account 1",
//         "externalAccountInfo": {
//             "bankAccountNumber":"31926819",
//             "payee": "Mr John Doe",
//             "bankName": "Bank of Europe",
//             "bankCode": "NWBK",
//             "branchCode": "601613",
//             "accountType": "Savings",
//             "checkDigits": "29",
//             "ibanCode": "GB29NWBK60161331926819",
//             "swiftCode": "ABCDEF12",
//             "branchAddress": "Bank of Europe, London, UK",
//             "country": "GB",
//             "additionalInformation": "Any additional information goes here",
//             "currency": "GBP"
//         }
//     };
//     var managedaccountparams = {
//         "profileId": hackbot.managedaccount,
//         "ownerId": "97757432090984448", // loan shark corporate identity instance 
//         "friendlyName": "unique shark managed account 1",
//         "currency": "GBP",
//         "issuingProvider": "Card Issuing Provider"
//     };

//     return LoanSharkJoin(loansharkidentityparams, externalaccountparams, managedaccountparams).then(function(data) {
//         console.log("Successful LoanSharkJoin . Data: " + JSON.stringify(data));
//         return data;
//     }, function(error) {
//         console.log(error);
//     });
// }

// function TestLoanSharkBuysInvoice() {
//     var p = TestLoanSharkJoin();
//     var p2 = p.then(function(data) {
//         var {loansharkid, externalaccountid, managedaccountid} = data;
//         var amount = 100000000;
//         var payintoexternalaccountparams = {
//             "amount": {
//                 "amount": 1000000,
//                 "currency": "GBP"
//             },
//             "externalAccountId": "97758165001961472",
//             "additionalInfo": "This is a payin test"
//         };
//         var transferfromexternaltomanagedparams = {
//             "profileId": hackbot.deposit,
//             "amount": {
//                 "amount": 1000000,
//                 "currency": "GBP"
//             },
//             "sourceInstrumentId": {
//                 "id": "97758165001961472",
//                 "type": "external_accounts"
//             },
//             "sourcePayinId": "97758465335099392",
//             "destinationInstrumentId": {
//                 "id": "{{MA1-1}}", // Fix this
//                 "type": "managed_accounts"
//             }
//         };
//         return LoanSharkTopUp(amount, loansharkid, externalaccountid, managedaccountid,
//         payintoexternalaccountparams, transferfromexternaltomanagedparams).then(function(data) {
//             return p;
//         }, function(error) {
//             console.log(error);
//         });
//     });

//     p2.then(function(data) {
//         var {loansharkid, externalaccountid, managedaccountid} = data;
//         var auction = { 
//             "seller": "panda slave",
//             "amount": 100
//         };
//         var managedcardparams = {
//             "profileId": hackbot.managedcard,
//             "ownerId": "97757432090984448", // loan shark corporate identity instance
//             "friendlyName": "My Managed Card 22",
//             "currency": "GBP",
//             "issuingProvider": "Issuer",
//             "processingProvider": "Processor",
//             "nameOnCard": "John Doe"
//         };
//         var transferparams = {
//             "profileId": hackbot.transfer,
//             "amount": {
//                 "currency": "GBP",
//                 "amount": 1000
//             },
//             "sourceInstrumentId": {
//                 "id": "{{MA1-1}}",
//                 "type": "managed_accounts"
//             },
//             "destinationInstrumentId": {
//                 "id": "97757863147929600",
//                 "type": "managed_cards"
//             }
//         };
//         return LoanSharkBuysInvoice(loansharkid, externalaccountid, managedaccountid,
//         auction, managedcardparams, transferparams).then(function(data) {
//             console.log("TestLoanSharkWord. Data" + JSON.stringify(data));
//             return data;
//         }, function(error) {
//             console.log(error);
//         });
//     }, function(error) {
//         console.log(error);
//     });
// }

// function LoanSharkJoin(loansharkidentityparams, externalaccountparams, managedaccountparams) {
//     // Create LoanSharkIdentity
//     // Create ExternalAccount
//     // Top up external account with funds using payment simulator
//     // Create ManagedAccount
//     // Return LoanSharkIdentity, ExternalAccount, ManagedAccount

//     var loansharkid = "";
//     var externalaccountid = "";
//     var managedaccountid = "";

//     return CreateLoanSharkIdentity(request = loansharkidentityparams).then(function(data) {
//         loansharkid = data.id;
//         var request = externalaccountparams;
//         request.ownerId = loansharkid;
//         return CreateExternalAccount(request).then(function(data) {
//             externalaccountid = data.id.id;
//             var request = managedaccountparams;
//             request.ownerId = loansharkid;
//             return CreateManagedAccount(request).then(function(data){
//                 managedaccountid = data.id.id;
//                 return { 
//                     "loansharkid": "" + loansharkid, 
//                     "externalaccountid": "" + externalaccountid,
//                     "managedaccountid": "" + managedaccountid}; // To put into firebase?
//                 }, function(error) {
//                     console.log(error);
//             });
//             }, function(error) {
//                 console.log(error);
//         });
//     }, function(error) {
//         console.log(error);
//     });
// }

// function LoanSharkTopUp(amount, loansharkid, externalaccountid, managedaccountid, payintoexternalaccountparams, transferfromexternaltomanagedparams) {
//     // PayInSimulator 
//     // TransferFromExternalToManagedAccount
//     var simulatedpayinid = "";
//     var request = payintoexternalaccountparams;
//     request.amount.amount = amount;
//     request.externalAccountId = externalaccountid;
//     return PayIntoExternalAccount(request).then(function(data) {
//         simulatedpayinid = data.id;
//         var request = transferfromexternaltomanagedparams;
//         request.sourcePayinId = simulatedpayinid;
//         request.amount.amount = amount;
//         request.sourceInstrumentId.id = externalaccountid;
//         request.destinationInstrumentId.id = managedaccountid;
//         return TransferFromExternalToManagedAccount(request).then(function(data){
//             return data;
//         }, function(error) {
//             console.log(error);
//         });
//     }, function(error) {
//         console.log(error);
//     });
// }

// function LoanSharkBuysInvoice(loansharkid, externalaccountid, managedaccountid, auction, managedcardparams, transferparams) {
//     // Create ManagedCard
//     // Transfer auction winning bid amount from managed account to managed card
//     // Return managed card , lookup loansharkidentity external account to send notification to invoice counterparty
//     var request = managedcardparams;
//     request.ownerId = loansharkid;
//     request.nameOnCard = auction.seller; // auction seller;

//     var managedcardid = "";

//     return CreateManagedCard(request).then(function(data) {
//         managedcardid = data;

//         var request = transferparams;
//         request.amount.amount = auction.amount;
//         request.sourceInstrumentId.id = managedaccountid;
//         request.destinationInstrumentId.id = managedcardid;

//         return LoadFundsOntoManagedCard(request).then(function(data) {
//             console.log("Managed card loaded: data" + JSON.stringify(data));
//             var transferid = data.id;
//             console.log("Managed card created with id : " + managedcardid);
//             return managedcardid;
//         }, function(error) {
//             console.error(error);
//         });
//     }, function(error) {
//         console.error(error);
//     });
// }

// function CreateLoanSharkIdentity(request = {
//             "name": "loanrk3",
//             "profileId": hackbot.corporateidentity,
//             "rootCredentialCode": "rtsha3l",
//             "supportEmail": "string3@gmail.com",
//             "notificationEmail": "string3@gmail.com",
//             "adminTitle": "Mr",
//             "adminName": "string",
//             "adminSurname": "string",
//             "adminEmail": "strq@gmail.com"
// }) {
//     return authorization.then(function(token){
//     // Step 1. corporateIdentitiesIdCreate
//         var apiInstance = new OpenPaymentsCloudApplicationApi.CorporateIdentitiesApi();
//         return apiInstance.corporateIdentitiesIdCreate(xCallref, xProgrammeKey, request).then(function(data) {
//             console.log('CorporateIdentitiesIdCreate API called successfully. Returned data: ' + JSON.stringify(data));
//             return data;
//             /*{
//             "id": "97757401059622912",
//             "name": "loanshark2",
//             "profileId": "97593089101268736",
//             "profileName": "Profile 97593089101268736",
//             "supportEmail": "string2@gmail.com",
//             "notificationEmail": "string2@gmail.com",
//             "state": "ACTIVE",
//             "creationTimestamp": "1491659578457"
//             }*/
//             }, function(error) {
//             console.error(error);
//         });
//    });
// }  
   
// function SetCredentialIdentityRootUserPassword(request = {
//         "credentialType": "ROOT",
//         "identityId": hackbot.corporateidentityinstance,
//         "password": {
//             "value": "Ul2password$"
//         }
//  }) {
//     return authorization.then(function(token) {
//        var apiInstance = new OpenPaymentsCloudApplicationApi.PasswordsApi();
//        return apiInstance.passwordsCredentialIdCreate(data.id, xCallref, xProgrammeKey, request).then(function(data){
//            console.log('PasswrodsCredentialIdCreate API called successfully. Returned data: ' + JSON.stringify(data));
//            return data;
//             /*{
//             "credentialId": "97757160162263040",
//             "credentialType": "ROOT",
//             "version": 0,
//             "identityId": "97757160162263040",
//             "expiryDate": "1499432258987",
//             "expiryNotificationDate": "0"
//             }*/
//        }, function(error) {
//            console.error(error);
//        });
//    });
// }

// function CreateManagedAccount(request = {
//   "profileId": hackbot.managedaccount,
//   "ownerId": "97757432090984448", // loan shark corporate identity instance 
//   "friendlyName": "Loan Sharks Friendly Managed Account",
//   "currency": "GBP",
//   "issuingProvider": "Card Issuing Provider"
// }) {
//     return authorization.then(function(token) {
//         var apiInstance = new OpenPaymentsCloudApplicationApi.ManagedAccountsApi();
//         return apiInstance.managedAccountsIdCreate(xCallref, xProgrammeKey, token, request).then(function(data){
//             console.log('CreateManagedAccount API called successfully. Returned data: ' + JSON.stringify(data));
//             return data;
//         }, function (error) {
//             console.error(error);
//         });
//     });
// }

// function CreateExternalAccount(request = {
// 	"profileId":hackbot.externalaccount,
// 	"ownerId":"97757432090984448", // loan shark corporate identity instance
// 	"friendlyName": "My External Account 873",
// 	"externalAccountInfo" :{
// 			"bankAccountNumber":"31926819",
// 			"payee": "Mr John Doe",
// 			"bankName": "Bank of Europe",
// 			"bankCode": "NWBK",
// 			"branchCode": "601613",
// 			"accountType": "Savings",
// 			"checkDigits": "29",
// 			"ibanCode": "GB29NWBK60161331926819",
// 			"swiftCode": "ABCDEF12",
// 			"branchAddress": "Bank of Europe, London, UK",
// 			"country": "GB",
// 			"additionalInformation": "Any additional information goes here",
// 			"currency": "GBP"
// 		}
// }) {
//     return authorization.then(function(token) {
//         var apiInstance = new OpenPaymentsCloudApplicationApi.ExternalAccountsApi();
//         return apiInstance.externalAccountsIdCreate(xCallref, xProgrammeKey, token, request).then(function(data) {
//             console.log("CreateExternalAccount API called successfully. Returned data: " + JSON.stringify(data));
//             return data;
//         }, function(error) {
//             console.error(error);
//         });
//     });
//     /*
//         {
//     "id": {
//         "id": "97758165001961472",
//         "type": "external_accounts"
//     },
//     "profileId": "97593089101269504",
//     "ownerId": "97757432090984448",
//     "friendlyName": "My External Account 735",
//     "programmeId": "739345648328338",
//     "externalAccountInfo": {
//         "bankAccountNumber": "31926819",
//         "payee": "Mr John Doe",
//         "bankName": "Bank of Europe",
//         "bankCode": "NWBK",
//         "branchCode": "601613",
//         "accountType": "Savings",
//         "checkDigits": "29",
//         "ibanCode": "GB29NWBK60161331926819",
//         "swiftCode": "ABCDEF12",
//         "branchAddress": "Bank of Europe, London, UK",
//         "country": "GB",
//         "additionalInformation": "Any additional information goes here",
//         "currency": "GBP"
//     },
//     "actions": []
//     }
//     */
// }

// function PayIntoExternalAccount(request = {
// 	"amount": {
// 		"amount": 1000000000,
// 		"currency": "GBP"
// 	},
// 	"externalAccountId": "97758165001961472",
// 	"additionalInfo": "This is a payin test"
// }) {
//     return authorization.then(function(token){
//         var apiInstance = new OpenPaymentsCloudApplicationApi.PayinSimulatorApi();
//         return apiInstance.payinSimulatorIdPayin(xCallref, xProgrammeKey, token, request).then(function(data){
//             console.log("Payin Simulator API called successfuly. Return data:" + JSON.stringify(data));
//             return data;
//         }, function(error) {
//             console.error(error);
//         });
//     }); 
//     /*
//     {
//     "id": "97758465335099392",
//     "externalAccountId": "97758165001961472",
//     "additionalInfo": "This is a payin test"
//     }
//     */  
// }

// function TransferFromExternalToManagedAccount(request = {
// 	"profileId": hackbot.deposit,
// 	"amount": {
// 		"amount": 1000000,
// 		"currency": "GBP"
// 	},
// 	"sourceInstrumentId": {
// 		"id": "97758165001961472",
// 		"type": "external_accounts"
// 	},
// 	"sourcePayinId": "97758465335099392",
// 	"destinationInstrumentId": {
// 		"id": "{{MA1-1}}", // Fix this
// 		"type": "managed_accounts"
// 	}
// }) {
//     return authorization.then(function(token) {
//         var apiInstance = new OpenPaymentsCloudApplicationApi.DepositsApi();
//         return apiInstance.depositsIdCreateFromExternalAccount(xCallref, xProgrammeKey, token, request).then(function(data){
//             console.log("DepositCreateFromExternalAccount API called successfully. Reurned data: " + JSON.stringify(data));    
//             return data;
//         }, function(error) {
//             console.error(error);
//         });
//     });
//     /*
//     {
//     "id": 0,
//     "programmeId": 0,
//     "profileId": 0,
//     "state": "NONE",
//     "timestamp": 0,
//     "depositCurrency": "string",
//     "depositAmount": 0,
//     "source": {
//         "instrumentId": {
//         "id": 0,
//         "type": "string"
//         },
//         "transactionAmountInInstrumentCurrency": {
//         "currency": "string",
//         "amount": 0
//         },
//         "transactionAmountWithFeesInInstrumentCurrency": {
//         "currency": "string",
//         "amount": 0
//         }
//     },
//     "destination": {
//         "instrumentId": {
//         "id": 0,
//         "type": "string"
//         },
//         "transactionAmountInInstrumentCurrency": {
//         "currency": "string",
//         "amount": 0
//         },
//         "transactionAmountWithFeesInInstrumentCurrency": {
//         "currency": "string",
//         "amount": 0
//         }
//     },
//     "failureReason": "NO_ERROR"
//     }
//     */
// }

// function CreateManagedCard(request = {
//   "profileId": hackbot.managedcard,
//   "ownerId": "97757432090984448", // loan shark corporate identity instance
//   "friendlyName": "My Managed Card 22",
//   "currency": "GBP",
//   "issuingProvider": "Issuer",
//   "processingProvider": "Processor",
//   "nameOnCard": "John Doe"
// }) {
//       return authorization.then(function(token) {
//           var apiInstance = new OpenPaymentsCloudApplicationApi.ManagedCardsApi();
//           return apiInstance.managedCardsIdCreate(xCallref, xProgrammeKey, token, request).then(function(data) {
//               console.log('CreateManagedCards API called successfully. Returned data: ' + JSON.stringify(data));
//               return data.id.id;
//           }, function(error) {
//               console.error(error);
//           });
//       }, function(error) {
//           console.error(error);
//       });
//     }

// function LoadFundsOntoManagedCard(request = {
// 	"profileId": hackbot.transfer,
// 	"amount": {
// 		"currency": "GBP",
// 		"amount": 1000
// 	},
// 	"sourceInstrumentId": {
// 		"id": "{{MA1-1}}",
// 		"type": "managed_accounts"
// 	},
// 	"destinationInstrumentId": {
// 		"id": "97757863147929600",
// 		"type": "managed_cards"
// 	}
// }) {
//     return authorization.then(function(token) {
//         var apiInstance = new OpenPaymentsCloudApplicationApi.TransfersApi();
//         return apiInstance.transfersIdCreate(xCallref, xProgrammeKey, token, request).then(function(data) {
//             console.log("LoadFundsOntoManagedCard API called successfully. Return data: " + JSON.stringify(data));
//             return data;
//         });
//     }, function(error) {
//         console.error(error);
//     });
// }

// //TestLoanSharkBuysInvoice();