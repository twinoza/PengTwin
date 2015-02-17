// leave at least 2 line with only a star on it below, or doc generation fails
/**
 *
 *
 * Placeholder for custom user javascript
 * mainly to be overridden in profile/static/custom/custom.js
 * This will always be an empty file in IPython
 *
 * User could add any javascript in the `profile/static/custom/custom.js` file
 * (and should create it if it does not exist).
 * It will be executed by the ipython notebook at load time.
 *
 * Same thing with `profile/static/custom/custom.css` to inject custom css into the notebook.
 *
 */

/**
 * Example :
 *
 *  Use `jQuery.getScript(url [, success(script, textStatus, jqXHR)] );`
 *  to load custom script into the notebook.
 *
 *    // to load the metadata ui extension example.
 *    $.getScript('/static/notebook/js/celltoolbarpresets/example.js');
 *    // or
 *    // to load the metadata ui extension to control slideshow mode / reveal js for nbconvert
 *    $.getScript('/static/notebook/js/celltoolbarpresets/slideshow.js');
 *
 *
 * @module IPython
 * @namespace IPython
 * @class customjs
 * @static
 */

/*
 * Code to hide the raw code notebook wide
 * ref:
 * [1] http://blog.nextgenetics.net/?e=102
 */
code_show=true; 
function code_toggle() {
  if (code_show){
    $('div.input').hide();
  } else {
    $('div.input').show();
  }
  code_show = !code_show;
} 

/*
 * Create a custom button to hide/show inputs, notebook wide.
 * Create a custom button in toolbar that executes `%qtconsole` in kernel
 * and hence open a qtconsole attached to the same kernel as the current notebook
 */
$([IPython.events]).on('app_initialized.NotebookApp', function(){
  IPython.toolbar.add_buttons_group([
    {
      'label'   : 'Run QTConsole',
      'icon'    : 'icon-terminal', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
      'callback': function () {
        IPython.notebook.kernel.execute('%qtconsole')
      }
    },
    {
      'label'   : 'Toggle Code',
      'icon'    : 'icon-code', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
      'callback': function () {
          $( document ).ready(code_toggle);
      }
    }
  ]);
});

/*
 * Add a toolbar entry to show/hide input on a cell-by-cell basis.
 * This could break in some future version of IPython, if they decide
 * to change the DOM structure.
 *
 * ref:
 * [1] http://nbviewer.ipython.org/github/Carreau/posts/blob/master/04-initialisation-cell.ipynb
 * [2] http://www.javascriptkit.com/javatutors/dom3.shtml
 */

var CellToolbar= IPython.CellToolbar;
var show_hide_input = CellToolbar.utils.checkbox_ui_generator('Show/Hide Input',
  // setter
  function(cell, value){
    // we check that the _ben namespace exist and create it if needed
    if (cell.metadata._ben == undefined){cell.metadata._ben = {};}
    // set the value
    cell.metadata._ben.show_hide_input = value;
    if(value == true){
      cell.element.children()[0].childNodes[1].childNodes[1].style.display="none";
    }else if(value == false){
      cell.element.children()[0].childNodes[1].childNodes[1].style.display="block";
    }
  },
  //getter
  function(cell){
    var ns = cell.metadata._ben;
    // if the _ben namespace does not exist return undefined
    // (will be interpreted as false by checkbox) otherwise
    // return the value
    return (ns == undefined)? undefined: ns.show_hide_input;
  }
);
CellToolbar.register_callback('show_hide_input.chkb', show_hide_input);
CellToolbar.register_preset('Show/Hide Input', ['show_hide_input.chkb']);
