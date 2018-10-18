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
    $('#pageButtons').append(`<button type="button" value=${index}>Animal Set ${index}</button>`);
  });
  $('#pageButtons').on('click', event => {
    event.preventDefault();
    if (event.target.value) {
      $('#filter').val('default');
      animalsOnPage = animalDataSets[event.target.value];
      console.log(animalsOnPage);
      renderAnimals(animalsOnPage);
    }
  });

}

function loadAnimals() {
  let loaded = 0;
  jsonDataLinks.forEach((dataLink, index) => {
    $.get(dataLink).then(data => {
      loaded++;
      const animalSet = [];
      data.forEach(animal => {
        animalSet.push(new Animal(animal));
      });
      animalDataSets.push(animalSet);
      if (loaded >= jsonDataLinks.length) {
        animalsOnPage = animalDataSets[0];
        renderFilter();
        renderAnimals(animalsOnPage);
      }
    });
  });
}

$(() => loadAnimals());


