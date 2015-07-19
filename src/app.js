(function() {
  var placeholder = document.querySelector('.js-editor');
  var editor = CodeMirror.fromTextArea(placeholder, {
      mode: {
        name: 'htmlmixed'
      },
      lineNumbers: true
  });
  var iframe = document.querySelector('.js-display');
  var deployBtn = document.querySelector('.js-deploy');

  editor.on('change', function(editor) {
    iframe.contentDocument.body.innerHTML = editor.getValue();
  });

  deployBtn.addEventListener('click', function() {
    console.log('deploy');
  });
}());
