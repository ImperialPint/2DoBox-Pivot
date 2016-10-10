const assert = require('chai').assert;
const ToDo = require('../lib/todo.js');
const AllToDos = require('../lib/AllToDos.js');
const countChar = require('../lib/scripts.js');

describe('ToDo Object Unit Tests', function(){
  it('ToDo should be an object', function(){
    var todo = new ToDo();
    assert.isObject(todo, true);
  });

  it('should have a default importance of normal', function(){
    var todo = new ToDo();
    assert.equal(todo.importance, 'Normal');
  });

  it('todo.importanceUp should increase importance to High from default', function(){
    var todo = new ToDo();
    todo.importanceUp();
    assert.equal(todo.importance, 'High');
  });

  it('todo.importanceUp should increase importance from High to Critical', function(){
    var todo = new ToDo();
    todo.importance = 'High';
    todo.importanceUp();
    assert.equal(todo.importance, 'Critical');
  });

  it('todo.importanceUp should remain at Critical when todo.importance is Critical', function(){
    var todo = new ToDo();
    todo.importance = 'Critical';
    todo.importanceUp();
    assert.equal(todo.importance, 'Critical');
  });

  it('todo.importanceDown should decrease importance from Normal to Low', function(){
    var todo = new ToDo();
    todo.importanceDown();
    assert.equal(todo.importance, 'Low');
  });

  it('todo.importanceDown should remain at None when todo.importance is None', function(){
    var todo = new ToDo();
    todo.importance = 'None';
    todo.importanceDown();
    assert.equal(todo.importance, 'None');
  });

  it('todo.importanceDown should decrease importance from Low to None', function(){
    var todo = new ToDo();
    todo.importance = 'Low';
    todo.importanceDown();
    assert.equal(todo.importance, 'None');
  });

  it('should have a default completeness of incomplete', function(){
    var todo = new ToDo();
    assert.equal(todo.completeness, 'incomplete');
  });

  it('should have a completeness of complete when todo.toggleComplete is called on default', function(){
    var todo = new ToDo();
    todo.toggleComplete();
    assert.equal(todo.completeness, 'complete');
  });

  it('should have a completeness of incomplete when todo.toggleComplete is called when todo.completeness is complete', function(){
    var todo = new ToDo();
    todo.completeness = 'complete';
    todo.toggleComplete();
    assert.equal(todo.completeness, 'incomplete');
  });

  describe('AllToDos object unit tests', function(){
    it('should be an object', function(){
      assert.isObject(AllToDos, true);
    });
    it('should have a property maxToDos with a default value of 10', function(){
      assert.equal(AllToDos.maxToDos, 10);
    });
    it('should have a property toDoArray set as an empty array', function(){
      assert.deepEqual(AllToDos.toDoArray, []);
    });
  });
  describe('countChar', function(){
    it('should be a function', function(){
      assert.isFunction(countChar, true);
    });
    
  });
});
