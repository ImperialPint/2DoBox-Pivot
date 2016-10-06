// const $ = require('jquery');
// require('./scripts.js');
//
// var AllToDos = {
//   toDoArray: [],
//   completedArray: [],
//
//   addStoreToArray: function(toDo){
//     //TODO: This will always be truthy (I think) if it returns an [] - check what you return and make sure you're not false flagging yourself
//     this.toDoArray.push(toDo);
//     this.store();
//   },
//
//   changeTitle: function(id, newTitle){
//     id = parseInt(id);
//     var toDo = this.find(id);
//     toDo.title = newTitle;
//     this.store();
//   },
//
//   changeBody: function(id, newBody){
//     id = parseInt(id);
//     var toDo = this.find(id);
//     toDo.body = newBody;
//     this.store();
//   },
//
//   store: function () {
//     localStorage.setItem('toDoArray', JSON.stringify(this.toDoArray));
//     console.log(localStorage.setItem('toDoArray', JSON.stringify(this.toDoArray)));
//   },
//
//   render: function(toDo) {
//     $('.list-container').prepend('<div class="list-item"' +
//     'id="' + toDo.id + '"><li class="title-style"><p class="new-title-input" contenteditable="true">' + toDo.title + '</p><button type="button" class="remove-button btn" ></button></li><li class="body-style"><p class="new-body-input" contenteditable="true">' + toDo.body + '</p></li><div class="quality-style"><button type="button" class="upvote btn"></button><button type="button" class="downvote btn"></button><p class="quality">quality: ' + '<span class="quality-value">' + toDo.quality + '</span>' + '<button class="complete-btn">Completed Task</button></p></div></div>');
//   },
//
//   renderStorage: function() {
//     for (var i = 0; i < this.toDoArray.length; i++) {
//         var object = this.toDoArray[i];
//         var toDo = new ToDo(object.title, object.body, object.id, object.quality);
//         this.toDoArray[i] = toDo;
//         this.render(toDo);
//     }
//   },
//
//   retrieve: function(title, body){
//     // TODO: Verify the truthiness here - if it returns undefined, that will be falsy - if it returns an empty array, that may actually be truthy
//     if (localStorage.toDoArray) {
//       var retrievedArray = localStorage.getItem('toDoArray');
//       this.toDoArray = JSON.parse(retrievedArray);
//       // This return  might be a hotfix. Should retrieve return something and also effect the state of the app?
//       return this.toDoArray;
//       // Currently you only return if the statement is true... how does this effect things?
//     }
//   },
//
//   clearListContainer: function() {
//     $('.list-item').remove();
//   },
//
//   find: function(id) {
//     id = parseInt(id);
//     return this.toDoArray.find(function (toDo) {
//       return toDo.id === id;
//     });
//   }
// };
//
// module.exports = AllToDos;
