/* Create element for the 'root' text in the cmd-box */
var root = document.registerElement('root');
document.body.appendChild(new root());

/* Create element for the typical user in the cmd-box */
var user = document.registerElement('user');
document.body.appendChild(new user());

/* Create element for the directory in the cmd-box */
var directory = document.registerElement('directory');
document.body.appendChild(new directory());

/* Create element for a key */
var key = document.registerElement('key');
document.body.appendChild(new key());
