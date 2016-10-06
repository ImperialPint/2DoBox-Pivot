// const $ = require('jquery');
// const AllToDos = require('./AllToDos.js');
//
// function ToDo(title, body, id, quality) {
//   this.title = title;
//   this.body = body;
//   this.id = id || Date.now();
//   this.quality = quality || 'swill';
// }
//
//
// ToDo.prototype.qualityUp = function () {
//   var quality = this.quality;
//   var id = this.id;
//
//   switch (quality) {
//     case 'swill':
//       this.quality = 'plausible';
//       return AllToDos.store();
//     case 'plausible':
//       this.quality = 'genius';
//       return AllToDos.store();
//     default:
//   }
// };
//
// ToDo.prototype.qualityDown = function() {
//   var quality = this.quality;
//   switch (quality) {
//     case 'genius':
//       this.quality = 'plausible';
//       return AllToDos.store();
//     case 'plausible':
//       this.quality = 'swill';
//       return AllToDos.store();
//     default:
//   }
//   AllToDos.store();
// };
//
// ToDo.prototype.remove = function(id) {
//   id = parseInt(id);
//   debugger;
//   var array = AllToDos.toDoArray;
//   AllToDos.toDoArray = array.filter(function (r) {
//     return r.id !== id;
//   });
//   AllToDos.store();
// };
//
// ToDo.prototype.toggleComplete = function(){
//   // Toggle class of parent container element so that it appears gray / strikethrough text
//   // Either edit the status of the ToDo item and store in local storage
//   // Or delete from the ToDo array and store completed ToDo inside of completed ToDo Array
// };
//
// ToDo.prototype.renderCompletedToDos = function(){
//   //Either grab only ids with status of complete or render todos from todo array
// };
//
// module.exports = ToDo;
