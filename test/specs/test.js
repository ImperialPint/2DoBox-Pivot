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

  it('should be able to delete a todo from the page', function(){
    browser.url('/');

    var toDoTitle = browser.element('.title');
    var toDoBody = browser.element('.body');

    toDoTitle.setValue('great title');
    toDoBody.setValue('great body');
    browser.click('.save-button');
    var allToDos = browser.elements('.list-item').getText();

    browser.click('.remove-button');
    assert.equal(allToDos.length, 2);

  });
});
