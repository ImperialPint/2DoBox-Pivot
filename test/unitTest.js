const assert = require('chai').assert;
const ToDo = require('../lib/todo.js');

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

  it('should have a default completeness of incomplete', function(){
    var todo = new ToDo();
    assert.equal(todo.completeness, 'incomplete');
  });
});
