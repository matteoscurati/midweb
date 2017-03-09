require 'thor/group'

module Middleman
  class Generator < ::Thor::Group
    include ::Thor::Actions

    source_root File.expand_path(File.dirname(__FILE__))

    def copy_default_files
      directory 'template', '.', exclude_pattern: /\.DS_Store$/
    end

    def ask_about_datocms_params
      if yes?('Do you want to configure DatoCMS?')
        @token = ask('Please insert your DatoCMS site read-only token:')
        @base_url = ask('What will be the base url of your site? (eg. https://www.mysite.com)')
      end

      template 'optional/config.rb', 'config.rb'
      template '.babelrc', '.babelrc'
      template '.gitignore', '.gitignore'
      template '.nvmrc', '.nvmrc'
      template '.ruby-version', '.ruby-version'
    end

    def setup_bemo
      run 'yarn'
      run './node_modules/.bin/bemo-scaffold -s source/assets/stylesheets/'
      run 'yarn run webfonts'
      remove_file 'source/assets/stylesheets/application.sass'
      template 'optional/application.sass', 'source/assets/stylesheets/application.sass'
    end
  end
end
