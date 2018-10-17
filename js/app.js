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
//   allAnimals.push(this);
}

Animal.prototype.render = () => {
  $('#cards').append('<div class="animalCard"></div>');
  let $animalCard = $('div[class="animalCard"]');
  $animalCard.html($('#photo-template').html());

  //   let $clonedAnimal = $('#phone-template').html();

  //   $animalCard.html($clonedAnimal);
  $animalCard.find('h2').text(this.title);
  $animalCard.find('img').attr('src', this.image_url);
  $animalCard.find('p').text(this.description);
  console.log($animalCard)

}

function filterAnimals(keyword) {
  const chosenAnimals = [];
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
    if (this.value === 'default'){
      renderAnimals(allAnimals);
    }
  });
}

const loadAnimals = () => {
  $.get('../data/page-1.json')
    .then(data => {
      data.forEach(animal => {
        allAnimals.push(new Animal(animal));
      });
    //   renderFilter();
      renderAnimals(allAnimals);
    });

  
}

function renderAnimals(animals) {
//   $('#cards').empty();
  animals.forEach(animal => {
    animal.render();
  })
}

// loadAnimals();
$(() => loadAnimals());
