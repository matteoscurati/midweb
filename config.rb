page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

set :url_root, ''

ignore '/templates/*'

#set :css_dir, 'dist/stylesheets'
#set :js_dir, 'javascripts'
#set :images_dir, 'dist/images'

activate :directory_indexes
activate :pagination

activate :external_pipeline,
  name: :webpack,
  command: build? ?
    "./node_modules/webpack/bin/webpack.js -p --env production" :
    "./node_modules/webpack/bin/webpack.js --watch -d --progress --color --env development",
  source: ".tmp/dist",
  latency: 1

configure :build do
  activate :minify_html do |html|
    html.remove_input_attributes = false
  end
  activate :search_engine_sitemap,
    default_priority: 0.5,
    default_change_frequency: 'weekly'
  activate :asset_hash
  activate :relative_assets
end

configure :development do
  activate :livereload
end
