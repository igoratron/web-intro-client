function showDoneDialog(url) {
  var parent = document.createDocumentFragment();

  var p = document.createElement('p');
  p.innerHTML = 'You page has been published!';

  var a = document.createElement('a');
  a.innerHTML = ['<a target="_blank" href="', url,'">Click here to go to your page</a>'].join('');

  parent.appendChild(p);
  parent.appendChild(a);

  var dialog = createDialog(parent);
  document.body.appendChild(dialog);
}

function showSaveDialog() {
  var form = document.createElement('form');
  form.className = 'js-pagename';

  var label = document.createElement('label');
  label.innerHTML = 'How would you like to name your page?';

  var input = document.createElement('input');
  input.required = true;
  input.name = 'pagename';

  var submit = document.createElement('button');
  submit.innerHTML = 'Publish';

  label.appendChild(input);
  form.appendChild(label);
  form.appendChild(submit);

  var dialog = createDialog(form);
  document.body.appendChild(dialog);
  return new Promise(function(resolve, reject) {
    dialog.addEventListener('submit', function(event) {
      var form = event.target;
      resolve(form.pagename.value);
      dialog.remove();
      event.preventDefault();
    });
    dialog.addEventListener('click', function(event) {
      if(event.target.className === 'overlay_close') {
        reject();
      }
    });
  });
}

function createDialog(content) {
  var overlay = document.createElement('div');
  overlay.className = 'overlay';

  var wrapper = document.createElement('div');
  wrapper.className = 'overlay_wrapper';

  var close = document.createElement('button');
  close.type = 'button';
  close.className = 'overlay_close';
  close.innerHTML = '&times;';
  close.addEventListener('click', function(event) {
    overlay.remove();
  });

  overlay.appendChild(wrapper);
  wrapper.appendChild(content);
  wrapper.appendChild(close);
  return overlay;
}

module.exports = {
  showDoneDialog: showDoneDialog,
  showSaveDialog: showSaveDialog
};
