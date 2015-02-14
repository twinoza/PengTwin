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
