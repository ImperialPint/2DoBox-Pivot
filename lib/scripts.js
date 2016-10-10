const AllToDos = require('./AllToDos.js')
const $ = require('jquery');

$(document).ready(function(){
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
  var id = $(this).closest('.list-item').attr('id');
  AllToDos.find(id).importanceDown();
  var importance = AllToDos.find(id).importance;
  $(this).siblings('.importance').text('importance: ' + importance);
});

$('.list-container').on('click', '.upvote', function(){
  var id = $(this).closest('.list-item').attr('id');
  AllToDos.find(id).importanceUp();
  var importance = AllToDos.find(id).importance;
  $(this).siblings('.importance').text('importance: ' + importance);
});

$('.list-container').on('click', '.remove-button', function(){
  var id = $(this).closest('.list-item').attr('id');
  AllToDos.find(id).remove(id);
  AllToDos.clearListContainer();
  AllToDos.renderStorage();
});

$('.list-container').on('click', '.complete-button', function(){
  var id = $(this).closest('.list-item').attr('id');
  AllToDos.find(id).toggleComplete();
  $(this).parent().parent().toggleClass('complete');
});

$('.list-container').on('keyup', '.new-title-input', function () {
  var id = $(this).closest('.list-item').attr('id');
  var newTitle = $(this).text();

  AllToDos.changeTitle(id, newTitle);
});

$('.list-container').on('keyup', '.new-body-input', function () {
  var id = $(this).closest('.list-item').attr('id');
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

function countChar(input, output){
     var length = input.val().length;
     if (length >= 121) {
              $('.title').value = $('.title').value.substring(0, 121);
     } else {
              $('.title').text(121 - length);
     }
     output.text(length);
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

function ToDo(title, body, id, importance, completeness) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.importance = importance || 'Normal';
  this.completeness = completeness || 'incomplete';
}
