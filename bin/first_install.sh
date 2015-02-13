#!/bin/bash

sudo apt-get install vim
sudo apt-get install git
sudo apt-get install gitk gitg
sudo apt-get install qtcreator
sudo apt-get install colordiff
sudo apt-get install ipython ipython-qtconsole python-matplotlib python-scipy

if [ ! -d "/home/noza/work/neuro-boa/" ]; then
	cd /home/noza/work
	git clone git@github.com:Stanford-BIS/neuro-boa.git
	cd ~/work/neuro-boa
	git config --global user.name "noza"
	git config --global user.email noza@stanford.edu
	git config --global core.editor vim
	git config --global color.ui true
	cd /home/noza
else
	echo "git repository (neuro-boa) already cloned"
fi

