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

  it('should be able to delete a todo from the page', function(){
    browser.url('/');

    var toDoTitle = browser.element('.title');
    var toDoBody = browser.element('.body');

    toDoTitle.setValue('great title');
    toDoBody.setValue('great body');
    browser.click('.save-button');
    browser.click('.remove-button');
    assert.equal(browser.isExisting('.list-item'), false);

  });

  it('should display an error message when the user attempts to save a blank todo', function(){
    browser.url('/');

    var toDoTitle = browser.element('.title');
    var toDoBody = browser.element('.body');

    toDoTitle.setValue('');
    toDoBody.setValue('');
    browser.click('.save-button');
    assert.equal(browser.getText('.message-to-user'), 'An input field is empty. Please fill in both fields.');

  });

  it('should render critical tasks when a user clicks critical', function(){
    browser.url('/');

    var toDoTitle = browser.element('.title');
    var toDoBody = browser.element('.body');

    toDoTitle.setValue('great title');
    toDoBody.setValue('great body');
    browser.click('.save-button');
    browser.click('.upvote');
    browser.click('.upvote');
    browser.click('.critical-button');
    assert.equal(browser.getText('.importance'), 'importance: Critical');

  });

  it('should render high tasks when a user clicks high', function(){
    browser.url('/');

    var toDoTitle = browser.element('.title');
    var toDoBody = browser.element('.body');

    toDoTitle.setValue('great title');
    toDoBody.setValue('great body');
    browser.click('.save-button');
    browser.click('.upvote');
    browser.click('.high-button');
    assert.equal(browser.getText('.importance'), 'importance: High');

  });


    it('should render normal tasks when a user clicks normal', function(){
      browser.url('/');

      var toDoTitle = browser.element('.title');
      var toDoBody = browser.element('.body');

      toDoTitle.setValue('great title');
      toDoBody.setValue('great body');
      browser.click('.save-button');
      browser.click('.normal-button');
      assert.equal(browser.getText('.importance'), 'importance: Normal');

    });
    it('should render low tasks when a user clicks low', function(){
      browser.url('/');

      var toDoTitle = browser.element('.title');
      var toDoBody = browser.element('.body');

      toDoTitle.setValue('great title');
      toDoBody.setValue('great body');
      browser.click('.save-button');
      browser.click('.downvote');
      browser.click('.low-button');
      assert.equal(browser.getText('.importance'), 'importance: Low');

    });

    it('should render none tasks when a user clicks none', function(){
      browser.url('/');

      var toDoTitle = browser.element('.title');
      var toDoBody = browser.element('.body');

      toDoTitle.setValue('great title');
      toDoBody.setValue('great body');
      browser.click('.save-button');
      browser.click('.downvote');
      browser.click('.none-button');
      assert.equal(browser.getText('.importance'), 'importance: None');

    });

    it('should not display any todos when the user searches for a todo that is not there', function(){
      browser.url('/');

      var toDoTitle = browser.element('.title');
      var toDoBody = browser.element('.body');

      toDoTitle.setValue('great title');
      toDoBody.setValue('great body');
      browser.click('.save-button');

      browser.setValue('.search','asdfasdfasdf');

      assert.equal(browser.isVisibleWithinViewport('.list-item')[0], false);
    });

    it('should display todos when the user searches for a todo that is there', function(){
      browser.url('/');

      var toDoTitle = browser.element('.title');
      var toDoBody = browser.element('.body');

      toDoTitle.setValue('great title');
      toDoBody.setValue('great body');
      browser.click('.save-button');

      browser.setValue('.search','great');

      assert.equal(browser.isVisibleWithinViewport('.list-item')[0], true);
    });

    it('should display todos when the user searches for a todo that is there', function(){
      browser.url('/');

      var toDoTitle = browser.element('.title');
      var toDoBody = browser.element('.body');

      toDoTitle.setValue('great title');
      toDoBody.setValue('great body');
      browser.click('.save-button');

      browser.setValue('.search','great');

      assert.equal(browser.isVisibleWithinViewport('.list-item')[0], true);
    });

    it('should display completed todos at the top of the page when the user selects show complete', function(){
      browser.url('/');

      var toDoTitle = browser.element('.title');
      var toDoBody = browser.element('.body');

      toDoTitle.setValue('great title');
      toDoBody.setValue('great body');
      browser.click('.save-button');
      browser.click('.complete-button');
      browser.click('.show-complete-button');

      assert.equal(browser.isVisibleWithinViewport('.complete')[0], true);
    });

    it('should not display completed todos at the top of the page when the user selects show complete', function(){
      browser.url('/');

      var toDoTitle = browser.element('.title');
      var toDoBody = browser.element('.body');

      toDoTitle.setValue('great title');
      toDoBody.setValue('great body');
      browser.click('.save-button');
      browser.click('.complete-button');
      browser.click('.hide-complete-button');

      assert.equal(browser.isVisibleWithinViewport('.complete')[0], undefined);
    });
});
