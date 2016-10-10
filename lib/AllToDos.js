require('./scripts.js');
const $ = require('jquery');

var AllToDos = {
  maxToDos: 10,
  toDoArray: [],

  addStoreToArray: function(toDo){
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
    'id="' + toDo.id + '"><div class="title-style"><p class="new-title-input" contenteditable="true">' + toDo.title + '</p><button title="remove todo" type="button" class="remove-button btn" ></button></div><div class="body-style"><p class="new-body-input" contenteditable="true">' + toDo.body + '</p></div><div class="importance-style"><button type="button" class="upvote btn" title="upvote todo"></button><button title="downvote todo" type="button" class="downvote btn"></button><p class="importance">importance: ' + toDo.importance + '</p><button label="show-completed" class="complete-button">Completed Task</button></div></div>');
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

function ToDo(title, body, id, importance, completeness) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.importance = importance || 'Normal';
  this.completeness = completeness || 'incomplete';
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

ToDo.prototype.toggleComplete = function(){
  var completeness = this.completeness;
  var toggleCompleteness = {
    "complete" : "incomplete",
    "incomplete" : "complete"
  };
  this.completeness = toggleCompleteness[completeness];
  return AllToDos.store();
};


module.exports = AllToDos;
