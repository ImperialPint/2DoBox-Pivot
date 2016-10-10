const $ = require('jquery');

$(document).ready(function(){
  // TODO: verify:step one is populate the AllToDos.toDoArray from localStorage
  // TODO: verify: step two: render everything out of that populated array
  AllToDos.retrieve();
  AllToDos.renderStorage();
  AllToDos.hideComplete();
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
 AllToDos.hideComplete();
 displayErrorMessage();
 clearInputFields();
 }
});

$('.show-complete-button').on('click', function(){
  AllToDos.renderComplete();
  AllToDos.showComplete();
});

$('.hide-complete-button').on('click', function(){
  AllToDos.clearListContainer();
  AllToDos.renderStorage();
  AllToDos.hideComplete();
});

$('.show-more').on('click', function(){
  AllToDos.renderMore();
});

$('.critical-button').on('click', function(){
  AllToDos.clearListContainer();
  AllToDos.renderImportance('Critical');
});

$('.high-button').on('click', function(){
  AllToDos.clearListContainer();
  AllToDos.renderImportance('High');
});

$('.normal-button').on('click', function(){
  AllToDos.clearListContainer();
  AllToDos.renderImportance('Normal');
});

$('.low-button').on('click', function(){
  AllToDos.clearListContainer();
  AllToDos.renderImportance('Low');
});

$('.none-button').on('click', function(){
  AllToDos.clearListContainer();
  AllToDos.renderImportance('None');
});

$('.list-container').on('click', '.downvote', function(){
  var id = $(this).parent().parent().attr('id');
  AllToDos.find(id).importanceDown();
  var importance = AllToDos.find(id).importance;
  $(this).siblings('.importance').text('importance: ' + importance);
});

$('.list-container').on('click', '.upvote', function(){
  var id = $(this).parent().parent().attr('id');
  AllToDos.find(id).importanceUp();
  var importance = AllToDos.find(id).importance;
  $(this).siblings('.importance').text('importance: ' + importance);
});

$('.list-container').on('click', '.remove-button', function(){
  var id = $(this).parent().parent().attr('id');
  AllToDos.find(id).remove(id);
  AllToDos.clearListContainer();
  AllToDos.renderStorage();
});

$('.list-container').on('click', '.complete-button', function(){
  var id = $(this).parent().parent().attr('id');
  AllToDos.find(id).toggleComplete();
  $(this).parent().parent().toggleClass('complete');
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

$('.title').on('keyup', function(){
  var input = $('.title');
  var output = $('#charNumTitle');
  countChar(input, output);
});

$('.body').on('keyup', function(){
  var input = $('.body');
  var output = $('#charNumBody');
  countChar(input, output);
});

function ToDo(title, body, id, importance, completeness) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.importance = importance || 'Normal';
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

ToDo.prototype.importanceUp = function () {
  // var imports = importance;
  var importance = this.importance;
  var increaseImportance = {
    "None" : "Low",
    "Low" : "Normal",
    "Normal" : "High",
    "High" : "Critical",
    "Critical" : "Critical"
  };
  this.importance = increaseImportance[importance];
  return AllToDos.store();
};

ToDo.prototype.importanceDown = function () {
  var importance = this.importance;
  var decreaseImportance = {
    "Critical":"High",
    "High" : "Normal",
    "Normal" : "Low",
    "Low" : "None",
    "None" : "None"
  };
  this.importance = decreaseImportance[importance];
  return AllToDos.store();
};

ToDo.prototype.remove = function(id) {
  id = parseInt(id);
  AllToDos.toDoArray = AllToDos.toDoArray.filter(function (r) {
    return r.id !== id;
  });
  AllToDos.store();
};

function countChar(input, output){
     var length = input.val().length;
     if (length >= 121) {
              $('.title').value = $('.title').value.substring(0, 121);
     } else {
              $('.title').text(121 - length);
     }
     output.text(length);
}

ToDo.prototype.toggleComplete = function(){
  var completeness = this.completeness;
  var toggleCompleteness = {
    "complete" : "incomplete",
    "incomplete" : "complete"
  };
  this.completeness = toggleCompleteness[completeness];
  return AllToDos.store();
};

var AllToDos = {
  maxToDos: 10,
  toDoArray: [],

  addStoreToArray: function(toDo){
    //TODO: This will always be truthy (I think) if it returns an [] - check what you return and make sure you're not false flagging yourself
    this.toDoArray.unshift(toDo);
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
    $('.list-container').append('<div class="list-item ' + toDo.completeness + '"' +
    'id="' + toDo.id + '"><li class="title-style"><p class="new-title-input" contenteditable="true">' + toDo.title + '</p><button type="button" class="remove-button btn" ></button></li><li class="body-style"><p class="new-body-input" contenteditable="true">' + toDo.body + '</p></li><div class="importance-style"><button type="button" class="upvote btn"></button><button type="button" class="downvote btn"></button><p class="importance">importance: ' + toDo.importance + '</p><button class="complete-button">Completed Task</button></div></div>');
  },

  renderImportance: function(importance){
    var array = this.toDoArray.filter(function(todo){
      return todo.importance === importance;
    }).slice(0, this.maxToDos);
    array.forEach(function(todo){
      this.render(todo);
    }.bind(this));
  },

  renderStorage: function() {
    var incompleteArray = this.toDoArray.filter(function(todo){
      return todo.completeness === 'incomplete';
    }).slice(0, this.maxToDos);
    incompleteArray.forEach(function(todo){
      this.render(todo);
    }.bind(this));
  },

  renderFirstTen: function() {
    var idArray = [];
    $('.list-item').each(function(){
      var id = this.attr('id');
      idArray.push(id);
    });

    var array = this.toDoArray.slice(0, this.maxToDos);
    array.forEach(function(todo){
      this.render(todo);
    }.bind(this));
  },

  renderComplete: function() {
    var completeArray = this.toDoArray.filter(function(todo){
      return todo.completeness === 'complete';
    }).slice(0, this.maxToDos);
    completeArray.forEach(function(todo){
      this.render(todo);
    }.bind(this));
  },

  renderMore: function() {
    this.maxToDos = this.maxToDos + 10;
    this.clearListContainer();
    this.renderStorage();
  },

  retrieve: function(){
    if (localStorage.toDoArray) {
      var retrievedArray = localStorage.getItem('toDoArray');
      this.toDoArray = JSON.parse(retrievedArray);
      for (var i = 0; i < this.toDoArray.length; i++) {
          var object = this.toDoArray[i];
          var toDo = new ToDo(object.title, object.body, object.id, object.importance, object.completeness);
          this.toDoArray[i] = toDo;}
      return this.toDoArray;
    }
  },

  hideComplete: function() {
    $('.list-item').each(function(){
        $('.list-item.complete').hide();
    });
  },

  showComplete: function() {
    $('.list-item').each(function(){
        $('.list-item.complete').show().insertBefore($('.list-item')[0]);
    });
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
