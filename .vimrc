call pathogen#infect()
call pathogen#helptags()

set ic 
set shiftwidth=2
set tabstop=2
set softtabstop=2
set nu
set hlsearch
set t_Co=16

syntax on

" Set The ColorScheme
syntax enable
set background=dark
"let g:solarized_termcolors= 16
"let g:solarized_termtrans = 0
"let g:solarized_degrade = 0
"let g:solarized_bold = 1
"let g:solarized_underline = 1
"let g:solarized_italic = 1
"let g:solarized_contrast = 'normal'
"let g:solarized_visibility= 'normal'
colorscheme solarized

" Set Status Line full of information
set laststatus=2
set statusline=%F\ %y\ %m%r%h%w\ \ \ \ \ \ %c,%l/%L\ %p%%\ %P
"set statusline=%F%m%r%h%w\ [TYPE=%Y\ %{&ff}]\
"\ [%l/%L\ (%p%%)

filetype plugin indent on
au FileType py set autoindent
au FileType py set smartindent
"au FileType py set textwidth=79 " PEP-8 Friendly

" NERD_tree config
let NERDTreeChDirMode=2
let NERDTreeIgnore=['\.vim$', '\~$', '\.pyc$', '\.swp$']
let NERDTreeSortOrder=['^__\.py$', '\/$', '*', '\.swp$',  '\~$']
let NERDTreeShowBookmarks=1
map <F3> :NERDTreeToggle<CR>

" Syntax for multiple tag files are
" set tags=/my/dir1/tags, /my/dir2/tags
set tags=tags;$HOME/.vim/tags/

" TagList Plugin Configuration
let Tlist_Ctags_Cmd='/usr/bin/ctags'
let Tlist_GainFocus_On_ToggleOpen = 1
let Tlist_Close_On_Select = 1
let Tlist_Use_Right_Window = 1
let Tlist_File_Fold_Auto_Close = 1
map <F8> :TlistToggle<CR>

" Set quit to 'q' instead of ':q' and set save to 'v' instead of ':w'
nnoremap Q q
map q :q
map v :w

" Make Vim recognize XTerm escape sequences for Page and Arrow
" " keys combined with modifiers such as Shift, Control, and Alt.
" " See http://www.reddit.com/r/vim/comments/1a29vk/_/c8tze8p
if &term =~ '^screen'
	" Page keys http://sourceforge.net/p/tmux/tmux-code/ci/master/tree/FAQ
	execute "set t_kP=\e[5;*~"
	execute "set t_kN=\e[6;*~"

	" Arrow keys http://unix.stackexchange.com/a/34723
	execute "set <xUp>=\e[1;*A"
	execute "set <xDown>=\e[1;*B"
	execute "set <xRight>=\e[1;*C"
	execute "set <xLeft>=\e[1;*D"
endif

" Viewport Controls (moving between split panes)
nmap <silent> <A-Up> :wincmd k<CR>
nmap <silent> <A-Down> :wincmd j<CR>
nmap <silent> <A-Left> :wincmd h<CR>
nmap <silent> <A-Right> :wincmd l<CR>

" Shorthand notation to split window
map :spv :vsplit
map :sph :split

nnoremap <silent> <Leader>df :call DiffToggle()<CR>

function! DiffToggle()
	if &diff
		diffoff
	else
		diffthis
	endif
:endfunction

if !exists("autocommands_loaded")
  let autocommands_loaded = 1
  autocmd BufRead,BufNewFile,FileReadPost *.py source ~/.vim/python
endif

" map <Leader>b :MiniBufExplorer<cr>
" map <Leader>c :CMiniBufExplorer<cr>
" map <Leader>u :UMiniBufExplorer<cr>
" map <Leader>t :TMiniBufExplorer<cr>

" let g:miniBufExplSplitBelow=0			" Puts new window below or ro the right of the current window
" let g:miniBufExplMapWindowNavVim = 1	" Allows navigation through buffers using <Ctrl>-[h,j,k,l]
" let g:miniBufExplMapWindowNavArrows = 1	" Allows navigation through buffers using <Crtl>-<Arrow keys>
" let g:miniBufExplMapCTabSwitchBufs = 1	" Switch between tabs using <Ctrl>-Tab
" let g:miniBufExplUseSingleClick = 1		" Single-click on tab shifts focus to that buffer
" let g:miniBufExplModSelTarget = 1 
" let g:miniBufExplorerMoreThanOne=1		" Opens MiniBufExplorer when there are more than 0 open buffers
" let g:miniBufExplForceSyntaxEnable = 1

" MiniBufExpl Colors
" hi MBEVisibleActive guifg=#A6DB29 guibg=fg
" hi MBEVisibleChangedActive guifg=#F1266F guibg=fg
" hi MBEVisibleChanged guifg=#F1266F guibg=fg
" hi MBEVisibleNormal guifg=#5DC2D6 guibg=fg
" hi MBEChanged guifg=#CD5907 guibg=fg
" hi MBENormal guifg=#808080 guibg=fg
