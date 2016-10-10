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
  // return AllToDos.store();
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
  // return AllToDos.store();
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

module.exports = ToDo;
