const $ = require('jquery');

$(document).ready(function(){
  // TODO: verify:step one is populate the AllToDos.toDoArray from localStorage
  // TODO: verify: step two: render everything out of that populated array
  AllToDos.retrieve();
  AllToDos.renderStorage();
});

$('.save-button').on('click', function(){
 var title = $('.title').val();
 var body = $('.body').val();
 var toDo = new ToDo(title, body);
 if (title === '' || body === '') {
   displayErrorMessage('inputBlanks');
 } else {
 AllToDos.addStoreToArray(toDo);
 // TODO: Do you need to call retrieve again on save?
 AllToDos.retrieve();
 AllToDos.clearListContainer();
 AllToDos.renderStorage();
 displayErrorMessage();
 clearInputFields();
 }
});

$('.list-container').on('click', '.downvote', function(){
  var id = $(this).parent().parent().attr('id');
  AllToDos.find(id).qualityDown();
  AllToDos.clearListContainer();
  AllToDos.renderStorage();
});

$('.list-container').on('click', '.upvote', function(){
  var id = $(this).parent().parent().attr('id');
  AllToDos.find(id).qualityUp();
  AllToDos.clearListContainer();
  AllToDos.renderStorage();
});

$('.list-container').on('click', '.remove-button', function(){
  var id = $(this).parent().parent().attr('id');
  AllToDos.find(id).remove(id);
  AllToDos.clearListContainer();
  AllToDos.renderStorage();
});

$('.list-container').on('click', '.complete-button', function(){
  var id = $(this).parent().parent().parent().attr('id');
  AllToDos.find(id).toggleComplete();
  AllToDos.clearListContainer();
  AllToDos.renderStorage();
});

$('.list-container').on('keyup', '.new-title-input', function () {
  var id = $(this).parent().parent().attr('id');
  var newTitle = $(this).text();
  AllToDos.changeTitle(id, newTitle);
});

$('.list-container').on('keyup', '.new-body-input', function () {
  var id = $(this).parent().parent().attr('id');
  var newBody = $(this).text();
  AllToDos.changeBody(id, newBody);
});

$('.search').on('keyup', function(){
  var $toDoList = $('.list-container div');
  var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

  $toDoList.show().filter(function() {
    var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
    return !~text.indexOf(val);
  }).hide();
});

function ToDo(title, body, id, quality, completeness) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.quality = quality || 'swill';
  this.completeness = completeness || 'incomplete';
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

ToDo.prototype.qualityUp = function () {
  var quality = this.quality;
  var id = this.id;

  switch (quality) {
    case 'swill':
      this.quality = 'plausible';
      return AllToDos.store();
    case 'plausible':
      this.quality = 'genius';
      return AllToDos.store();
    default:
  }
};

ToDo.prototype.qualityDown = function() {
  var quality = this.quality;
  switch (quality) {
    case 'genius':
      this.quality = 'plausible';
      return AllToDos.store();
    case 'plausible':
      this.quality = 'swill';
      return AllToDos.store();
    default:
  }
  AllToDos.store();
};

ToDo.prototype.remove = function(id) {
  id = parseInt(id);
  AllToDos.toDoArray = AllToDos.toDoArray.filter(function (r) {
    return r.id !== id;
  });
  AllToDos.store();
};

ToDo.prototype.toggleComplete = function(){
  var completeness = this.completeness;
  switch (completeness) {
    case 'incomplete':
      this.completeness = 'complete';
      //toggle class create css for appearance change;
      return AllToDos.store();
    default:

  }
  AllToDos.store();
  // Toggle class of parent container element so that it appears gray / strikethrough text
  // Either edit the status of the ToDo item and store in local storage
  // Or delete from the ToDo array and store completed ToDo inside of completed ToDo Array
};

ToDo.prototype.renderCompletedToDos = function(){
  //Either grab only ids with status of complete or render todos from todo array
};

var AllToDos = {
  toDoArray: [],
  completedArray: [],

  addStoreToArray: function(toDo){
    //TODO: This will always be truthy (I think) if it returns an [] - check what you return and make sure you're not false flagging yourself
    this.toDoArray.push(toDo);
    this.store();
  },

  changeTitle: function(id, newTitle){
    id = parseInt(id);
    var toDo = this.find(id);
    toDo.title = newTitle;
    this.store();
  },

  changeBody: function(id, newBody){
    id = parseInt(id);
    var toDo = this.find(id);
    toDo.body = newBody;
    this.store();
  },

  store: function () {
    localStorage.setItem('toDoArray', JSON.stringify(this.toDoArray));
  },

  render: function(toDo) {
    $('.list-container').prepend('<div class="list-item"' +
    'id="' + toDo.id + '"><li class="title-style"><p class="new-title-input" contenteditable="true">' + toDo.title + '</p><button type="button" class="remove-button btn" ></button></li><li class="body-style"><p class="new-body-input" contenteditable="true">' + toDo.body + '</p></li><div class="quality-style"><button type="button" class="upvote btn"></button><button type="button" class="downvote btn"></button><p class="quality">quality: ' + '<span class="quality-value">' + toDo.quality + '</span>' + '<button class="complete-button">Completed Task</button></p></div></div>');
  },

  renderStorage: function() {
    for (var i = 0; i < this.toDoArray.length; i++) {
        var object = this.toDoArray[i];
        var toDo = new ToDo(object.title, object.body, object.id, object.quality);
        this.toDoArray[i] = toDo;
        this.render(toDo);
    }
  },

  retrieve: function(title, body){
    // TODO: Verify the truthiness here - if it returns undefined, that will be falsy - if it returns an empty array, that may actually be truthy
    if (localStorage.toDoArray) {
      var retrievedArray = localStorage.getItem('toDoArray');
      this.toDoArray = JSON.parse(retrievedArray);
      // This return  might be a hotfix. Should retrieve return something and also effect the state of the app?
      return this.toDoArray;
      // Currently you only return if the statement is true... how does this effect things?
    }
  },

  clearListContainer: function() {
    $('.list-item').remove();
  },

  find: function(id) {
    id = parseInt(id);
    return this.toDoArray.find(function (toDo) {
      return toDo.id === id;
    });
  }
};
