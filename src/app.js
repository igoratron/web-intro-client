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
    upload(editor.getValue());
  });

  function upload(contents) {
    var formData = new FormData();
    var blob = new Blob([contents], { type: "text/html"});
    formData.append('webpage', blob);

    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
  }

}());
