/**
 *
 * This file contains javascript extensions for IPython notebook,
 * compatible with Jupyter. The file contains the following extensions
 *
 * a. Button to launch QTConsole
 * b. Button to show/hide all input cells
 * c. Toolbar entry to add show/hide checkbox for each cell
 * d. Hide all marked cells when Notebook is launched
 * e. Open gVim to edit current cell and update with saved content
 *
 * Other settings:
 * i.  Show line numbers by default in code cells
 * ii. Show equation number when using Mathjax
 *
 * Ben Varkey Benjamin : 21-Mar-2015
 */

/*
 * Code to hide the raw code
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

require([
    'base/js/namespace',
    'base/js/events'
    ], function(IPython, events) {
        events.on("app_initialized.NotebookApp", function () {
            /*
             *  Extensions from IPython-notebook-extensions
             *  Uncomment to use the appropriate extension
             */
            // PUBLISHING
            //    IPython.load_extensions('publishing/nbviewer_theme/main')
            //    IPython.load_extensions('publishing/gist_it')
            //    IPython.load_extensions('publishing/nbconvert_button')
            //    IPython.load_extensions('publishing/printview_button')
            //    IPython.load_extensions('publishing/printviewmenu_button')
            // SLIDEMODE
            //    IPython.load_extensions('slidemode/main')
            // STYLING
            //    IPython.load_extensions('styling/css_selector/main')
            // TESTING
            //    IPython.load_extensions('testing/hierarchical_collapse/main')
            //    IPython.load_extensions('testing/history/history'])
            //    IPython.load_extensions('testing/cellstate')
            // USABILITY
            //    IPython.load_extensions('usability/aspell/ipy-aspell')
            //    IPython.load_extensions('usability/codefolding/codefolding')
            //    IPython.load_extensions('usability/codefolding/main');
            //    IPython.load_extensions('usability/dragdrop/drag-and-drop')
            //    IPython.load_extensions('usability/runtools/runtools')
            //    IPython.load_extensions('usability/chrome_clipboard')
            //    IPython.load_extensions('usability/navigation-hotkeys')
            //    IPython.load_extensions('usability/shift-tab')
            //    IPython.load_extensions('usability/toggle_all_line_number')
            //    IPython.load_extensions('usability/help_panel/help_panel')
            //    IPython.load_extensions('usability/hide_input')
            //    IPython.load_extensions('usability/search')
            //    IPython.load_extensions('usability/split-combine')
            //    IPython.load_extensions('usability/read-only')
            //    IPython.load_extensions('usability/init_cell/main')
            //    IPython.load_extensions('usability/autosavetime')
            //    IPython.load_extensions('usability/autoscroll')
            //    IPython.load_extensions('usability/breakpoints')
            //    IPython.load_extensions('usability/clean_start')
            //    IPython.load_extensions('usability/comment-uncomment')
            //    IPython.load_extensions('usability/linenumbers')
            //    IPython.load_extensions('usability/no_exec_dunder')
            //    IPython.load_extensions('usability/noscroll')
            //    IPython.load_extensions('usability/hide_io_selected')
            //    IPython.load_extensions('usability/execute_time/ExecuteTime')
            //    IPython.load_extensions('usability/python-markdown')
            
            
            /* Custom written extension by Ben */
            IPython.toolbar.add_buttons_group([
                /**
                 * a. Button to launch QTConsole
                 */
                {
                     'label'   : 'Run QTConsole',
                     'icon'    : 'fa-terminal', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
                     'callback': function () {
                         IPython.notebook.kernel.execute('%qtconsole')
                     }
                },
                /*
                 * b. Button to show/hide all input cells
                 */
                {
                     'label'   : 'Toggle Code',
                     'icon'    : 'fa-code', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
                     'callback': function () {
                        $( document ).ready(code_toggle);
                     }
                }
                
            ]);
            /*
             * c. Toolbar entry to add show/hide checkbox for each cell
             */
            var CellToolbar = IPython.CellToolbar;
            var show_hide_input = CellToolbar.utils.checkbox_ui_generator('Hide Input',
             // setter
             function(cell, value){
                 // we check that the _draft namespace exist and create it if needed
                 if (cell.metadata._ben == undefined){cell.metadata._ben = {};}
                    // set the value
                 cell.metadata._ben.show_hide_input = value;
                 if(value === true){
                    cell.element.children()[0].childNodes[1].childNodes[1].style.display="none";
                 }else if(value === false){
                    cell.element.children()[0].childNodes[1].childNodes[1].style.display="block";
                 }},
             //getter
             function(cell){ var ns = cell.metadata._ben;
                 // if the _draft namespace does not exist return undefined
                 // (will be interpreted as false by checkbox) otherwise
                 // return the value
                    return (ns == undefined)? undefined: ns.show_hide_input;
                 }
             );
            CellToolbar.register_callback('show_hide_input.chkb', show_hide_input);
            CellToolbar.register_preset('Show/Hide Input', ['show_hide_input.chkb']);
            /* 
             * e. Open gVim to edit current cell and update with saved content 
             * Use 'g' to open gvim. Use 'u' after saving and exiting gvim.
             *
             * I think I found this code on some Stackoverflow page.
             *
             */
            IPython.keyboard_manager.command_shortcuts.add_shortcut('g', {
                handler : function (event) {
                    var input = IPython.notebook.get_selected_cell().get_text();
                    var cmd = "f = open('/tmp/.ipycell.py', 'w');f.close()";
                    if (input != "") {
                        cmd = '%%writefile /tmp/.ipycell.py\n' + input;
                    }
                    IPython.notebook.kernel.execute(cmd);
                    cmd = "import os;os.system('gvim /tmp/.ipycell.py')";
                    IPython.notebook.kernel.execute(cmd);
                    return false;
                }}
            );
            IPython.keyboard_manager.command_shortcuts.add_shortcut('u', {
                handler : function (event) {
                    function handle_output(msg) {
                        var ret = msg.content.text;
                        IPython.notebook.get_selected_cell().set_text(ret);
                    }
                    var callback = {'output': handle_output};
                    var cmd = "f = open('/tmp/.ipycell.py', 'r');print(f.read())";
                    IPython.notebook.kernel.execute(cmd, {iopub: callback}, {silent: false});
                    return false;
                }}
            );

            // i. Show line numbers by default
            IPython.CodeCell.options_default.cm_config["lineNumbers"] = true;
        });
});

/* 
 * d. Hide all marked cells when Notebook is launched
 * 
 * Ref: http://nbviewer.ipython.org/github/Carreau/posts/blob/master/04-initialisation-cell.ipynb
 */
var hide_init = function(){
    var cells = IPython.notebook.get_cells();
    for(var i in cells){
        var cell = cells[i];
        var namespace =  cell.metadata._ben|| {};
        var isHidden = namespace.show_hide_input;
        // you also need to check that cell is instance of code cell,
        // but lets keep it short
        if( isHidden === true){
            cell.element.children()[0].childNodes[1].childNodes[1].style.display="none";
        }
    }
};
$([IPython.events]).on('notebook_loaded.Notebook', hide_init);

// ii. Numbering for IPython notebook equations
MathJax.Hub.Config({
      TeX: { equationNumbers: { autoNumber: "AMS" } }
});
