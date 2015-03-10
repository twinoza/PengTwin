# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

# If not running interactively, don't do anything
[ -z "$PS1" ] && return

# don't put duplicate lines in the history. See bash(1) for more options
# don't overwrite GNU Midnight Commander's setting of `ignorespace'.
export HISTCONTROL=$HISTCONTROL${HISTCONTROL+,}ignoredups
# ... or force ignoredups and ignorespace
export HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "$debian_chroot" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

# Prompt Customization
if [ -n "$DISPLAY" -a "$TERM" == "xterm" ]; then
		export TERM=xterm-256color
fi

#if [[ $COLORTERM = gnome-* && $TERM = xterm* ]] && infocmp gnome-256color >/dev/null 2>&1; then
# 		TERM=gnome-256color;
#		echo " WHAT KIND OF GAME IS THIS: "
#fi

# Define variables for each of the colors
if tput setaf 1 &> /dev/null; then
	tput sgr0
	if [[ $(tput colors) -ge 256 ]] 2>/dev/null; then
		BASE03=$(tput setaf 234)
		BASE02=$(tput setaf 235)
		BASE01=$(tput setaf 240)
		BASE00=$(tput setaf 241)
		BASE0=$(tput setaf 244)
		BASE1=$(tput setaf 245)
		BASE2=$(tput setaf 254)
		BASE3=$(tput setaf 230)
		YELLOW=$(tput setaf 136)
		ORANGE=$(tput setaf 166)
		RED=$(tput setaf 160)
		MAGENTA=$(tput setaf 125)
		VIOLET=$(tput setaf 61)
		BLUE=$(tput setaf 33)
		CYAN=$(tput setaf 37)
		GREEN=$(tput setaf 64)
	else
		BASE03=$(tput setaf 8)
		BASE02=$(tput setaf 0)
		BASE01=$(tput setaf 10)
		BASE00=$(tput setaf 11)
		BASE0=$(tput setaf 12)
		BASE1=$(tput setaf 14)
		BASE2=$(tput setaf 7)
		BASE3=$(tput setaf 15)
		YELLOW=$(tput setaf 3)
		ORANGE=$(tput setaf 9)
		RED=$(tput setaf 1)
		MAGENTA=$(tput setaf 5)
		VIOLET=$(tput setaf 13)
		BLUE=$(tput setaf 4)
		CYAN=$(tput setaf 6)
		GREEN=$(tput setaf 2)
	fi
	BOLD=$(tput bold)
	RESET=$(tput sgr0)
else
	# Linux console colors. I don't have the energy
	# to figure out the Solarized values
	MAGENTA="\033[1;31m"
	ORANGE="\033[1;33m"
	GREEN="\033[1;32m"
	PURPLE="\033[1;35m"
	WHITE="\033[1;37m"
	BOLD=""
	RESET="\033[m"
fi
 
unset color_prompt force_color_prompt

# Add git information to the prompt
source ~/bin/git-completion.bash
source ~/bin/git-prompt.bash
GIT_PS1_SHOWDIRTYSTATE=1
GIT_PS1_SHOWSTASHSTATE=1
export GIT_PS1_SHOWDIRTYSTATE
export GIT_PS1_SHOWSTASHSTATE
PS1='\[${BOLD}${GREEN}\]\u@\h\[$RESET\]:\[${BLUE}\]\w\[${BOLD}${YELLOW}\]$(__git_ps1) \[$RESET\]\$ '
#The following line is disabled because I can't figure out how to get tmux to start in the current working directory
#PS1='$([ -n "$TMUX" ] && tmux setenv TMUXPWD_$(tmux display -p "#I") $PWD)\[${BOLD}${GREEN}\]\u@\h\[$RESET\]:\[${BLUE}\]\w\[${BOLD}${YELLOW}\]$(__git_ps1) \[$RESET\]\$ '

# Set the directories up to be colored
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
fi

# Print basic info about this machine
uname -a

# Alias definitions.
# You may want to put all your additions into a separate file like
# ~/.bash_aliases, instead of adding them here directly.
# See /usr/share/doc/bash-doc/examples in the bash-doc package.
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
fi

if [ ${hostname}=='ng-hippocampus' ]; then
    PATH="$HOME/bin:.:$PATH"
fi

# Use tmux for the terminal by default
#alias tmux='tmux -2'
#[[ -z "$TMUX" ]] && exec tmux
#The following lines are disabled because I can't figure out how to get tmux to start in the current working directory
#if [[ ! $TERM =~ screen ]]; then
#	exec tmux
#fi

umask 0002

export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/home/noza/work/neuro-boa/lib:/home/noza/Downloads/Software/gmock-1.6.0/gtest/lib/.libs:/home/noza/Downloads/Software/gmock-1.6.0/lib/.libs
export GTEST_DIR=/home/noza/Downloads/Software/gmock-1.6.0/gtest
export GMOCK_DIR=/home/noza/Downloads/Software/gmock-1.6.0/

