require('codemirror/addon/selection/selection-pointer');
//require('codemirror/mode/xml/xml');
//require('codemirror/mode/javascript/javascript');
//require('codemirror/mode/css/css');
require('codemirror/mode/htmlmixed/htmlmixed');

//require('codemirror/addon/fold/xml-fold');
require('codemirror/addon/edit/matchtags');
require('codemirror/addon/selection/active-line');

var CodeMirror = require('codemirror/lib/codemirror');
var dialogs = require('./dialogs');

var placeholder = document.querySelector('.js-editor');
var iframe = document.querySelector('.js-display');
var deployBtn = document.querySelector('.js-deploy');

var editor = CodeMirror.fromTextArea(placeholder, {
    mode: {
      name: 'htmlmixed'
    },
    theme: 'solarized dark',
    tabSize: 2,
    lineNumbers: true
});

editor.on('change', function(editor) {
  iframe.contentDocument.body.innerHTML = editor.getValue();
});

deployBtn.addEventListener('click', function() {
  dialogs.showSaveDialog()
    .then(function(pagename) {
      return upload(editor.getValue(), pagename);
    })
    .then(function(response) {
      dialogs.showDoneDialog(response.Location);
    });
});

function upload(contents, pagename) {
  var formData = new FormData();
  var blob = new Blob([contents], { type: "text/html"});
  formData.append('webpage', blob);
  formData.append('pagename', pagename);

  return fetch('http://webintro.elasticbeanstalk.com/upload', {
      method: 'POST',
      body: formData
  })
  .then(function(response) {
    return response.json();
  });
}

