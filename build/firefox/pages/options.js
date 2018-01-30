function replace_i18n(obj, tag) {
  var msg = tag.replace(/__MSG_(\w+)__/g, function(match, v1) {
      return v1 ? browser.i18n.getMessage(v1) : '';
  });

  if(msg != tag) {
    obj.innerHTML = msg;
    //arabic should be displayed from the right to the left
    if(browser.i18n.getUILanguage() == 'ar') {
      obj.dir = 'rtl';
      //fix sliders position
      var sliders = document.getElementsByClassName('col-25');
      for(var i = 0; i < sliders.length; i++) {
        sliders[i].style.textAlign = 'left';
      }
    }
  }
}

function localizeHtmlPage() {
  // Localize everything else by replacing all __MSG_***__ tags
  var page = document.getElementsByTagName('html');
  
  for (var j = 0; j < page.length; j++) {
      var obj = page[j];
      var tag = obj.innerHTML.toString();

      replace_i18n(obj, tag);
  }
}

function save_options() {
  console.log('test')
  var addSuggestionBox = document.getElementById('add_suggestion_box').checked;
  var addTopBar = document.getElementById('add_top_bar').checked;
  
  browser.storage.sync.set({
    addSuggestionBox: addSuggestionBox,
    addTopBar: addTopBar
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options updated.';
    status.style.display = 'block';
    setTimeout(function() {
      status.style.display = 'none';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in browser.storage.
function restore_options() {
  browser.storage.sync.get({
    addSuggestionBox: false,
    addTopBar: true
  }, function(items) {
    document.getElementById('add_suggestion_box').checked = items.addSuggestionBox;
    document.getElementById('add_top_bar').checked = items.addTopBar;
  });
}

localizeHtmlPage();

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('add_suggestion_box').addEventListener('click',
    save_options);
document.getElementById('add_top_bar').addEventListener('click',
    save_options);

