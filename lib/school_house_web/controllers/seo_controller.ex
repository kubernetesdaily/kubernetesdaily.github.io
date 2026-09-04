defmodule SchoolHouseWeb.SeoController do
  use SchoolHouseWeb, :controller

  alias SchoolHouse.KubeDaily
  alias SchoolHouseWeb.SeoHelpers

  def sitemap(conn, _params) do
    urls =
      ["/", "/tools", "/docker-images", "/labs", "/roadmap", "/blog", "/about"] ++
        Enum.map(KubeDaily.labs(), &"/labs/#{&1["id"]}") ++
        Enum.map(KubeDaily.posts(), &"/blog/#{&1["id"]}")

    body =
      ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"] ++
        Enum.map(urls, fn path -> "  <url><loc>#{SeoHelpers.site_url()}#{path}</loc></url>" end) ++
        ["</urlset>"]

    conn
    |> put_resp_content_type("application/xml")
    |> send_resp(200, Enum.join(body, "\n"))
  end
end
