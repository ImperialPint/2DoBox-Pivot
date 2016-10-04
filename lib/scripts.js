const $ = require('jquery');

$(document).ready(function(){
  AllIdeas.retrieve();
  AllIdeas.renderStorage();
});



$('.save-button').on('click', function(){
 var title = $('.title').val();
 var body = $('.body').val();
 var idea = new Idea(title, body);
 if (title === '' || body === '') {
   displayErrorMessage('inputBlanks');
 } else {
 AllIdeas.addStoreToArray(idea);
 AllIdeas.retrieve();
 AllIdeas.clearListContainer();
 AllIdeas.renderStorage();
 displayErrorMessage();
 clearInputFields();
 }
});

$('.list-container').on('click', '.downvote', function(){
  var id = $(this).parent().parent().attr('id');
  AllIdeas.find(id).qualityDown();
  AllIdeas.clearListContainer();
  AllIdeas.renderStorage();
});

$('.list-container').on('click', '.upvote', function(){
  var id = $(this).parent().parent().attr('id');
  AllIdeas.find(id).qualityUp();
  AllIdeas.clearListContainer();
  AllIdeas.renderStorage();
});

$('.list-container').on('click', '.remove-button', function(){
  console.log('test');
  var id = $(this).parent().parent().attr('id');
  AllIdeas.find(id).remove(id);
  AllIdeas.clearListContainer();
  AllIdeas.renderStorage();
});

$('.list-container').on('keyup', '.new-title-input', function () {
  var id = $(this).parent().parent().attr('id');
  var newTitle = $(this).text();
  AllIdeas.changeTitle(id, newTitle);
});

$('.list-container').on('keyup', '.new-body-input', function () {
  var id = $(this).parent().parent().attr('id');
  var newBody = $(this).text();
  AllIdeas.changeBody(id, newBody);
});

$('.search').on('keyup', function(){
  var $ideaslist = $('.list-container div');
  var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

  $ideaslist.show().filter(function() {
    var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
    return !~text.indexOf(val);
  }).hide();
});

function Idea(title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.quality = quality || 'swill';
  // this.complete = complete || incomplete;
}

function displayErrorMessage(errorType) {
 switch (errorType) {
   case 'inputBlanks':
     $('.message-to-user').text('An input field is empty. Please fill in both fields.');
     break;
   default:
     $('.message-to-user').text('');
 }
}

function clearInputFields() {
 $('.title').val('');
 $('.body').val('');
}

Idea.prototype.qualityUp = function () {
  var quality = this.quality;
  var id = this.id;

  switch (quality) {
    case 'swill':
      this.quality = 'plausible';
      return AllIdeas.store();
    case 'plausible':
      this.quality = 'genius';
      return AllIdeas.store();
    default:
  }
};

Idea.prototype.qualityDown = function() {
  var quality = this.quality;
  switch (quality) {
    case 'genius':
      this.quality = 'plausible';
      return AllIdeas.store();
    case 'plausible':
      this.quality = 'swill';
      return AllIdeas.store();
    default:
  }
  AllIdeas.store();
};

Idea.prototype.remove = function(id) {
  id = parseInt(id);
  ideasArray = ideasArray.filter(function (r) {
    return r.id !== id;
  });
  AllIdeas.store();
};


var ideasArray = [];

var AllIdeas = {

  addStoreToArray: function(idea){
    ideasArray.push(idea);
    this.store();
    console.log(ideasArray);
  },

  changeTitle: function(id, newTitle){
    id = parseInt(id);
    var idea = this.find(id);
    idea.title = newTitle;
    this.store();
  },

  changeBody: function(id, newBody){
    id = parseInt(id);
    var idea = this.find(id);
    idea.body = newBody;
    this.store();
  },

  store: function () {
    localStorage.setItem('ideasArray', JSON.stringify(ideasArray));
    console.log(localStorage.setItem('ideasArray', JSON.stringify(ideasArray)));
  },

  render: function(idea) {
    $('.list-container').prepend('<div class="list-item"' + 'id="' + idea.id + '"><li class="title-style"><p class="new-title-input" contenteditable="true">' + idea.title + '</p><button type="button" class="remove-button btn" ></button></li><li class="body-style"><p class="new-body-input" contenteditable="true">' + idea.body + '</p></li><div class="quality-style"><button type="button" class="upvote btn"></button><button type="button" class="downvote btn"></button><p class="quality">quality: ' + '<span class="quality-value">' + idea.quality + '</span>' + '<button>Completed Task</button></p></div></div>');
  },

  renderStorage: function() {
    for (var i = 0; i < ideasArray.length; i++) {
        var object = ideasArray[i];
        var idea = new Idea(object.title, object.body, object.id, object.quality);
        ideasArray[i] = idea;
      this.render(idea);
    }
  },

  retrieve: function(title, body){
    if (localStorage.ideasArray) {
      var retrievedArray = localStorage.getItem('ideasArray');
      ideasArray = JSON.parse(retrievedArray);
    }
  },

  clearListContainer: function() {
    $('.list-item').remove();
  },

  find: function(id) {
    id = parseInt(id);
    return ideasArray.find(function (idea) {
      return idea.id === id;
    });
  }
};
