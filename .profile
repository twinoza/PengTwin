# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# if running bash
# Get the aliases and functions
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
			  #echo "Running .bashrc from .profile"
        . "$HOME/.bashrc"
    fi
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    #echo "BLAH"
    PATH="$HOME/bin:.:$PATH"
fi

# set PATH so it includes user's private bin if it exists
if [ -d "/usr/NX/bin" ] ; then
    #echo "DI DAH"
    PATH="/usr/NX/bin:$PATH"
fi
