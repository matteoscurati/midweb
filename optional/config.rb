page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

set :url_root, '<%= @base_url %>'

ignore '/templates/*'

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'

activate :directory_indexes
activate :pagination
<%- if @token -%>
activate :dato,
  token: '<%= @token %>',
  base_url: '<%= @base_url %>'
<%- end -%>

proxy "/index.html", "/templates/index.html"

activate :external_pipeline,
  name: :webpack,
  command: build? ?
    "./node_modules/webpack/bin/webpack.js -p" :
    "./node_modules/webpack/bin/webpack.js --watch -d --progress --color",
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
  activate :gzip
  activate :relative_assets
end

#after_build do
  #File.rename 'build/redirects', 'build/_redirects'
#end

configure :development do
  activate :livereload
end

#helpers
helpers do
  def markdown(text)
    renderer = Redcarpet::Render::HTML.new
    Redcarpet::Markdown.new(renderer).render(text)
  end
end

<%- if @token -%>
# dato.articles.each do |article|
#   proxy(
#     '/articles/#{article.slug}.html',
#     '/templates/article.html',
#     locals: { article: article }
#   )
# end
# paginate(
#   dato.articles.sort_by(&:published_at).reverse,
#   '/articles',
#   '/templates/articles.html'
# )
# MULTILANG SAMPLES
# [:en, :it].each do |locale|
#   I18n.with_locale(locale) do
#     dato.aritcles.each do |article|
#       I18n.locale = locale
#       proxy "/#{locale}/articles/#{article.slug}/index.html", "/templates/article_template.html", :locals => { article: article }, ignore: true, locale: locale
#     end
#   end
# end

# [:en, :it].each do |locale|
#   I18n.with_locale(locale) do
#     I18n.locale = locale
#     paginate dato.articles.select{|a| a.published == true}.sort_by(&:date).reverse, "/#{I18n.locale}/articles", "/templates/articles.html", locals: { locale: I18n.locale }
#   end
# end
<%- end -%>
