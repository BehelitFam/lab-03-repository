'use strict';

const jsonDataLinks = ['../data/page-1.json', '../data/page-2.json'];
const animalDataSets = [];
let animalsOnPage = [];
const allKeywords = [];
const template = Handlebars.compile($('#card-template').html());

function Animal (animal) {
  this.url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;

  addKeyword(this.keyword);
}

Animal.prototype.render = function() {
  $('#cards').append(template(this));
}

function addKeyword(keyword) {
  if (!allKeywords.includes(keyword)) {
    allKeywords.push(keyword);
  }
}

function filterAnimals(keyword) {
  const chosenAnimals = [];
  animalsOnPage.forEach(animal => {
    if (animal.keyword === keyword) {
      chosenAnimals.push(animal);
    }
  });
  return chosenAnimals;
}

function renderAnimals(animals) {
  $('#cards').empty();
  animals.forEach(animal => {
    animal.render();
  });
}

function renderFilter() {
  allKeywords.forEach(keyword => {
    $('#filter').append(`<option value=${keyword}>${keyword}</option>`);
  });
  $('#filter').on('change', function() {
    if (this.value === 'default'){
      renderAnimals(animalsOnPage);
    } else {
      renderAnimals(filterAnimals(this.value));
    }
  });
  jsonDataLinks.forEach((link, index) => {
    $('#pageButtons').append(`<button type="button" value=${link}>Animal Set ${index}</button>`);
  });
  $('#pageButtons').on('click', event => {
    animalsOnPage = event.target.value;
    renderAnimals(animalsOnPage);
  });

}

function loadAnimals() {
  jsonDataLinks.forEach(dataLink => {
    $.get(dataLink).then(data => {
      console.log(dataLink);
      const animalSet = [];
      data.forEach(animal => {
        animalSet.push(new Animal(animal));
      });
      console.log(animalSet);
      animalDataSets.push(animalSet);
      console.log(animalDataSets);
    });
  }).then(() => {
    animalsOnPage = animalDataSets[0];
    //renderFilter();
    renderAnimals(animalsOnPage);
  });
}

$(() => loadAnimals());


