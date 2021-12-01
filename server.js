const express = require('express');
const cors = require('cors');
const axios = require("axios");
const app = express();

app.use(cors());

app.get('/', async (req, res) => {
    extract();
    return res.json(oTNum);
});

let ixNum = 1;
var tNum = [];
let url = `http://challenge.dienekes.com.br/api/numbers?page=${ixNum}`;
var vControl = 0;
var oTNum


async function extract() {
    while (vControl != null) {
        try {
            const response = await axios(url);
            const data = response.data;
            const fNum = Object.values(data);
            vControl = fNum[0];
            tNum.push(fNum);
            tNum = tNum.flat(2);
            oTNum = order(tNum);
            ixNum++;
        } catch (error) {
                if (vControl != null) {
                vControl = 0;
                console.log('ERRRORRR');
            }

        }
    }

}



function order(num){
    for( let i = 0; i <= num.length; i++){
        for( let i2 = i+1; i2 <= num.length; i2++){
            if(num[i]>num[i2]){
                let vInter = num[i];
                num[i] = num[i2];
                num[i2] =vInter;
            }
        }
    }
    return num;
}


const PORT =  8000;
const HOSTNAME1 = '127.0.0.1';

app.listen(PORT, HOSTNAME1, () => {
    console.log(`Server is listening at http://${HOSTNAME1}:${PORT}`)
})