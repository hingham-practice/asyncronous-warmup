'use strict';

const superagent = require('superagent');
//this returns a promise
let fetchPeopleWithPromises = () =>{

    return superagent.get('https://swapi.co/api/people')
    .then( res =>{
        let thing = res.body.results.map( person =>{
            return superagent.get(person.url);
        });
    })
    .then( peoplePromises =>{
        return Promise.all(peoplePromises)
        .then(people =>{
            let names = [];
            for (let data of people) {
                names.push(data.body.name);
            }
        })

    }).catch(console.error);
};
//every promise has to return something
//the next promise picks up the return

// fetchPeopleWithPromises();

//outside of the async funciton it looks like it returns a promise
let fetchPeopleWithAsync = async () =>{

    try {

    let peopleSet = await superagent.get('https://swapi.co/api/people');
    let people = (peopleSet.body && peopleSet.body.results) || [];

    let peopleRequests = people.map( (person) =>{
        return superagent.get(person.url);
    });
    //Promise.all needs the .then 
    let swapiNames = await Promise.all(peopleRequest)
    .then(people =>{
        let names = [];
        for(let data of people){
            names.push(data.body.name);
        }
        return names;
    });
    return swapiNames;
    }     
    catch( e ) {console.error(e) ;}
}

fetchPeopleWithAsync() 
    .then(names => console.log('Async, names'));

