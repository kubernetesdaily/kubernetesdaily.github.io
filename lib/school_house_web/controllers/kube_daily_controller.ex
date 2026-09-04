defmodule SchoolHouseWeb.KubeDailyController do
  use SchoolHouseWeb, :controller

  alias SchoolHouse.KubeDaily

  def index(conn, _params),
    do:
      render(conn, "index.html",
        page_title: "KubeDaily: Kubernetes, Containers & Cloud Native Learning",
        seo: %{schema_type: "WebSite"}
      )

  def tools(conn, _params),
    do:
      render(conn, "tools.html",
        page_title: "Kubernetes Tools Collection",
        seo: %{
          description:
            "Explore KubeDaily's curated collection of Kubernetes, container, security, DevOps, and cloud-native tools."
        }
      )

  def labs(conn, _params),
    do:
      render(conn, "labs.html",
        page_title: "Hands-on Kubernetes Labs",
        labs: KubeDaily.labs(),
        seo: %{description: "Learn Kubernetes, Docker, Containerd, and Helm with hands-on KubeDaily labs."}
      )

  def blog(conn, _params),
    do:
      render(conn, "blog.html",
        page_title: "Kubernetes & Cloud Native Blog",
        posts: KubeDaily.posts(),
        seo: %{description: "Practical Kubernetes, containers, DevOps, and cloud-native guides from KubeDaily."}
      )

  def about(conn, _params),
    do:
      render(conn, "about.html",
        page_title: "About KubeDaily",
        seo: %{description: "Learn about KubeDaily's mission to make container and orchestration knowledge accessible."}
      )

  def lab(conn, %{"id" => id}) do
    case KubeDaily.lab(id) do
      nil ->
        send_resp(conn, 404, "Lab not found")

      lab ->
        render(conn, "lab.html",
          page_title: lab["title"],
          lab: lab,
          content: KubeDaily.lab_html(lab),
          seo: %{
            description: lab["description"],
            schema_type: "LearningResource",
            keywords: Enum.join(lab["tags"], ", ")
          }
        )
    end
  end

  def post(conn, %{"id" => id}) do
    case KubeDaily.post(id) do
      nil ->
        send_resp(conn, 404, "Post not found")

      post ->
        render(conn, "post.html",
          page_title: post["title"],
          post: post,
          content: KubeDaily.post_html(post),
          seo: %{
            description: post["excerpt"],
            schema_type: "Article",
            author: post["author"],
            published: post["date"],
            keywords: Enum.join(post["tags"], ", ")
          }
        )
    end
  end

  def docker_images(conn, _params) do
    render(conn, "docker_images.html",
      page_title: "Popular Docker Images",
      rows: KubeDaily.docker_images(),
      seo: %{description: "Explore KubeDaily's data on popular Docker Hub container images."}
    )
  end
end
