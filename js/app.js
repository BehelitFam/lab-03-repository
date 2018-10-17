'use strict';

let allAnimals = [];
console.log(allAnimals);

$.get('./data/page-1.json', function(data) {
    console.log(data);
    data.forEach(animal => {
        console.log(animal);
        allAnimals.push(animal);
    });
    console.log(allAnimals);
});


