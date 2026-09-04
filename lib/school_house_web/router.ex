defmodule SchoolHouseWeb.Router do
  use SchoolHouseWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {SchoolHouseWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug SchoolHouseWeb.RedirectPlug
    plug SchoolHouseWeb.SetLocalePlug
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", SchoolHouseWeb do
    pipe_through :browser

    get "/", KubeDailyController, :index
    get "/sitemap.xml", SeoController, :sitemap
    get "/tools", KubeDailyController, :tools
    get "/docker-images", KubeDailyController, :docker_images
    get "/labs", KubeDailyController, :labs
    get "/labs/:id", KubeDailyController, :lab
    get "/blog", KubeDailyController, :blog
    get "/blog/:id", KubeDailyController, :post
    get "/about", KubeDailyController, :about

    # Keep the original School House pages available to its publishing tasks and
    # regression tests without taking over KubeDaily's public URLs.
    get "/school-house", PageController, :index, as: :page
    get "/school-house/privacy", PageController, :privacy, as: :page
    get "/school-house/blog", PostController, :index, as: :post
    get "/school-house/blog/tag/:tag", PostController, :filter_by_tag, as: :post
    get "/school-house/blog/:slug", PostController, :show, as: :post

    scope "/:locale" do
      get "/", PageController, :index
      get "/why", PageController, :why
      get "/get_involved", PageController, :get_involved
      get "/podcasts", PageController, :podcasts
      live "/conferences", ConferencesLive

      get "/report", ReportController, :index

      get "/lessons/:section", LessonController, :index
      get "/lessons/:section/:name", LessonController, :lesson
    end
  end
end
