const assert =  require('assert');

describe('welcome page', function(){
  it('should have input forms we can set values for', function(){
    browser.url('/');
    var toDoTitle = browser.element('.title');
    var toDoBody = browser.element('.body');

    toDoTitle.setValue('great title');
    toDoBody.setValue('great body');

    assert.equal(toDoTitle.getValue(), 'great title');
    assert.equal(toDoBody.getValue(), 'great body');
  });

  it('should clear the input fields on save', function(){
    browser.url('/');
    browser.click('.save-button');

    var toDoTitle = browser.element('.title');
    var toDoBody = browser.element('.body');

    assert.equal(toDoTitle.getValue(), '');
    assert.equal(toDoBody.getValue(), '');
  });

  it('should be able to add todos to the page', function(){
    browser.url('/');

    var toDoTitle = browser.element('.title');
    var toDoBody = browser.element('.body');

    toDoTitle.setValue('great title');
    toDoBody.setValue('great body');
    browser.click('.save-button');

    var toDoTitles = browser.getText('.new-title-input');
    var toDoBodys = browser.getText('.new-body-input');

    assert.equal(toDoTitles, 'great title');
    assert.equal(toDoBodys, 'great body');
  });

  it('should display the todos on refresh', function(){
    browser.url('/');
    browser.refresh();

    var toDoTitles = browser.getText('.new-title-input');
    var toDoBodys = browser.getText('.new-body-input');

    assert.equal(toDoTitles, 'great title');
    assert.equal(toDoBodys, 'great body');
  });

  it('should be able to upvote a todo on the page', function(){
    browser.url('/');
    browser.click('.upvote');

    var importance = browser.getText('.importance');
    assert.equal(importance, 'importance: High');
  });

  it('should remain as critical if you click upvote while importance is critical', function(){
    browser.url('/');

    browser.click('.upvote');
    browser.click('.upvote');
    browser.click('.upvote');

    var importance = browser.getText('.importance');
    assert.equal(importance, 'importance: Critical');
  });

  it('should be able to downvote a todo on the page', function(){
    browser.url('/');
    browser.click('.downvote');

    var importance = browser.getText('.importance');
    assert.equal(importance, 'importance: High');
  });

  it('should remain as None if you click downvote while importance is None', function(){
    browser.url('/');

    browser.click('.downvote');
    browser.click('.downvote');
    browser.click('.downvote');
    browser.click('.downvote');
    browser.click('.downvote');
    browser.click('.downvote');

    var importance = browser.getText('.importance');
    assert.equal(importance, 'importance: None');
  });

  it('should be able to change the class of a todo after Completed is click', function(){
    browser.url('/');
    browser.click('.complete-button');

    assert.equal(browser.isExisting('.complete'), true);
  });

  // it('should be able to delete a todo from the page', function(){
  //   browser.url('/');
  //
  //   var toDoTitle = browser.element('.title');
  //   var toDoBody = browser.element('.body');
  //
  //   toDoTitle.setValue('great title');
  //   toDoBody.setValue('great body');
  //   browser.click('.save-button');
  //
  //   var toDosBefore = browser.elements('.list-item').getText().length;
  //   browser.click('.remove-button');
  //
  //   var toDosAfter = browser.elements('.list-item').getText().length;
  //
  //   assert.equal(toDosAfter, toDosBefore-1);
  //
  // });

});
