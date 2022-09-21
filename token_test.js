import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
    stages: [

     
        { duration: '1m', target: 50 },
        {noVUConnectionReuse: true},
        
    
      ],
};

const BASE_URL = 'https://posmcmc-uat.thaibevapp.com/security/api/v1/Login';

export default function () {
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

  let body = JSON.stringify({
    username: 'tccpos1',
    password: 'tccpos1',
    posClientID: "tccpos1",
    version: "1.0.0"
  });
  let salebody = JSON.stringify({
    saleOrderID: String(makeid(5)), //ทุกครั้งที่ยิงต้องgenใหม่
    docNo: "string",
    beforeVATSale: 0,
    totalDiscount: 0,
    vatSale: 0,
    totalSale: 0,
    memberID: "string",
    status: 0,
    createBy: "LOADTEST",//ใส่เป็นคำว่าLOADTEST
    createDate: "2022-09-06T10:11:36.265Z",
    isActive: false,
    voidBy: "LOADTEST",//ใส่เป็นคำว่าLOADTEST
    voidDate: "2022-09-06T10:11:36.265Z",
    saleItems: [
      {
        saleItemID: String(makeid(5)),//ทุกครั้งที่ยิงต้องgenใหม่
        seq: 0,
        skuid: "string",
        price: 0,
        quantity: 0,
        fullPrice: 0,
        compCode: "string",
        promotionID: 0,
        createBy: "LOADTEST",//ใส่เป็นคำว่าLOADTEST
        createDate: "2022-09-06T10:11:36.266Z",
        isActive: false,
        voidType: 0,
        voidBy: "string",
        voidDate: "2022-09-06T10:11:36.266Z"
      }
    ],
    payments: [
      {
        seq: 0,
        paymentID: String(makeid(5)),//ทุกครั้งที่ยิงต้องgenใหม่
        paymentMethod: 0,
        amount: 0,
        createBy: "strLOADTESTLOADTESTing",//ใส่เป็นคำว่าLOADTEST
        createDate: "2022-09-06T10:11:36.266Z",
        isActive: false
      }
    ]
  });
  const params1 = {
    headers: {
      'Content-Type': 'application/json',
    },
    tags: {
      name: 'login', // first request
    },
  };

  group('simple user journey', (_) => {
    // Login request
    const login_response = http.post(`${BASE_URL}`, body, params1);
    check(login_response, {
      'is status 200': (res) => res.status === 200,
      'logged in successfully': (res) => res.json('token') !== '',
      'is api key present': (res) => res.json().hasOwnProperty('token'),
      
    });
    console.log("login_response :"+login_response.status)
   params1.headers['token'] = login_response.json()['token'];
   const authHeaders = {

    headers: {

      Authorization: `Bearer ${login_response.json('token')}`

    },

  };
  const Saleauth = {

    headers: {

      Authorization: `Bearer ${login_response.json('token')}`,
      'Content-Type': 'application/json',

    },

  };


 /* const myObjects = http.get(`https://posmcmc-uat.thaibevapp.com/sale/api/v1/SKU/Lookup/BarcodePOS`, authHeaders).body;


  check(myObjects, { 'retrieved crocodiles': (obj) => obj.length > 0 

});*/
  const Open = http.post(`https://posmcmc-uat.thaibevapp.com/sale/api/v1/Shift/Open`," ",authHeaders);
  check(Open, {
    'is status 200': (res) => res.status === 200,})
    console.log("open :"+ Open.status)

  const saleOrder = http.post(`https://posmcmc-uat.thaibevapp.com/sale/api/v1/SaleOrder`, salebody, Saleauth);
  check(saleOrder, {
    'is status 200': (res) => res.status === 200,});
    console.log("sale :" +saleOrder.status)
    const Close = http.post(`https://posmcmc-uat.thaibevapp.com/sale/api/v1/Shift/Close`," ",authHeaders);
    check(Close, {
      'is status 200': (res) => res.status === 200,})
      console.log("open :"+ Close.status)
  });
  };