defmodule SchoolHouseWeb.SeoController do
  use SchoolHouseWeb, :controller

  alias SchoolHouse.PublicPages
  alias SchoolHouseWeb.SeoHelpers

  def sitemap(conn, _params) do
    urls = PublicPages.paths()

    body =
      ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"] ++
        Enum.map(urls, fn path ->
          canonical = if path == "/", do: path, else: String.trim_trailing(path, "/") <> "/"
          "  <url><loc>#{SeoHelpers.site_url()}#{canonical}</loc></url>"
        end) ++
        ["</urlset>"]

    conn
    |> put_resp_content_type("application/xml")
    |> send_resp(200, Enum.join(body, "\n"))
  end
end
