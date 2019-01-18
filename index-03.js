'use strict';

const superagent = require('superagent');

let fetchPeopleWithPromises = () =>{
    return superagent.get('https://swapi.co/api/people')
    .then(res =>{
        let thing = res.body.results.map(person =>{
            return superagent.get(person.url);
        });
    })
    .then (peoplePromises =>{
        return Promise.all(peoplePromise)
        .then(people =>{
            let names = [];
            for(let data of people){
                names.push(data.body.names);
            }
        })
        console.log(names);
    }).catch(err =>console.errror(err));
}

let fetchPeopleWithAsync = async() =>{
    try{
        let peopleSet = await superagent.get('https://swapi/co/api/people');
        let people = (peopleSet.body && peopleSet.body.result) || [];

        let peopleRequests = people.map( (person)=>{
            return superagent.get(person.url);
        });

        let swapiNames = await Promise.all(peopleRequests)
        .then(people=>{
            let name = [];
            for(let names of people){
                names.push(data.body.name);
            }

            console.log(names);
            return names;
        });
        return swapiNames;
    }
    catch(err){console.log(err);
    }
}

fetchPeopleWithAsync();