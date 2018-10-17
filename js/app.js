'use strict';

const allAnimals = [];
const allKeywords = [];


function Animal (animal) {
    this.url = animal.image_url;
    this.title = animal.title;
    this.description = animal.description;
    this.keyword = animal.keyword;
    this.horns = animal.horns;

    addKeyword(this.keyword);
    allAnimals.push(this);
}

Animal.prototype.render = () => {
    $('#cards').append('<div class="animalCard"></div>');
    const $animalCard = $('.animalCard:last');

}

function filterAnimals(keyword) {
    const chosenAnimals = [];
    if (keyword = "All")
    allAnimals.forEach(animal => {
        if (animal.keyword === keyword) {
            chosenAnimals.push(animal);
        }
    });
    return chosenAnimals;
}

function addKeyword(keyword) {
    if (!allKeywords.includes(keyword)) {
        allKeywords.push(keyword);
    }
}

function renderFilter() {
    allKeywords.forEach(keyword => {
        $('#filter').append(`<option value=${keyword}>${keyword}</option>`);
    });
    $('#filter').on('change', function() {
        console.log(this.value);
        renderAnimals(filterAnimals(this.value));
    });
}

function renderAnimals(animals) {
    $('#cards').empty();
    animals.forEach(animal => {
        animal.render();
    });
}

const loadAnimals = () => {
    $.get('data/page-1.json', function(data) {
        data.forEach(animal => {
            new Animal(animal);
        });
        console.log(allAnimals);
        renderFilter();
        renderAnimals(allAnimals);
    });
}

loadAnimals();