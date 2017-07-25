function save_options() {
  var addSuggestionBox = document.getElementById('add_suggestion_box').checked;
  var addTopBar = document.getElementById('add_top_bar').checked;
  
  chrome.storage.sync.set({
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
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    addSuggestionBox: false,
    addTopBar: true
  }, function(items) {
    document.getElementById('add_suggestion_box').checked = items.addSuggestionBox;
    document.getElementById('add_top_bar').checked = items.addTopBar;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('add_suggestion_box').addEventListener('click',
    save_options);
document.getElementById('add_top_bar').addEventListener('click',
    save_options);