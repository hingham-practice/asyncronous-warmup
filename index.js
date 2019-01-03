'use strict';

const express = require('express');
const app = express();
const superagent = require('superagent');
const util = require('util');
const fs = require('fs');


const port = 4000;

app.listen(port, () => console.log(`listening on port ${port}`));
    
let promiseApi = new Promise(function(resolve, reject){
        let urlArr = [];
        let URL = `https://swapi.co/api/people`
            superagent.get(URL)
            .then((people)=> {
                for(let i = 0; i< people.body.results.length; i++){
                    urlArr.push(people.body.results[i].url);
                }
                resolve(urlArr);
            })
            .catch(console.log('error'));
            return urlArr;
    })

    function getPromises(arr){
        let promiseArr = [];
        for(let i in arr){
            let URL = arr[i];
            promiseArr.push( superagent.get(URL) );//return a promise
        }
        return promiseArr;
    }

promiseApi.then((arr) =>{
    console.log('in the promise');
    let pArr = getPromises(arr);
        Promise.all(pArr)
        .then((people)=>{
            people.map(ppl=>{ 
               console.log( JSON.parse( ppl.res.text ).name );
        })
    });
});

function asyncFun () {
    let urlArr = [];
    let URL = `https://swapi.co/api/people`
        superagent.get(URL)
        .then((people)=> {
            for(let i = 0; i< people.body.results.length; i++){
                urlArr.push(people.body.results[i].url);
            }
        })
        .catch(console.log('error'));
        return urlArr;
}




// async function asyncCall(starArr) {
//         let arr = await asyncFun();
//         let pArr = await getPromises(arr);

// }

// asyncCall();




