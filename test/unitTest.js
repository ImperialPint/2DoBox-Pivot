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
});
