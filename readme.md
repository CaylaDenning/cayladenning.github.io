## Getting Started writting Posts

For Ubuntu, use the following commands to install jekyll and ruby

`sudo apt-get install ruby ruby-dev build-essential`

```
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME=$HOME/gems' >> ~/.bashrc
echo 'export PATH=$HOME/gems/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

`gem install jekyll bundler`

`gem sources --add https://rubygems.org/`


Confirm your ruby install

`ruby -v`


If you run into issues try this command:

`bundle update jekyll`

`gem update jekyll`

To run Jekyll

`jekyll serve --watch`
