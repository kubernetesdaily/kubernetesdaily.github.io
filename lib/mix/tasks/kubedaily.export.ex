defmodule Mix.Tasks.Kubedaily.Export do
  @moduledoc """
  Renders the public KubeDaily routes into a static directory for GitHub Pages.
  """

  use Mix.Task

  alias SchoolHouse.KubeDaily
  alias SchoolHouseWeb.Endpoint

  @shortdoc "Exports KubeDaily as a static site"

  @impl Mix.Task
  def run(args) do
    {options, _, _} = OptionParser.parse(args, strict: [output: :string])
    output = options[:output] || "_site"

    Mix.Task.run("app.start")
    output = Path.expand(output)

    File.rm_rf!(output)
    File.mkdir_p!(output)
    File.cp_r!(Application.app_dir(:school_house, "priv/static"), output)
    File.cp!(Path.join([output, "kubedaily", "404.html"]), Path.join(output, "404.html"))

    Enum.each(routes(), &write_page(output, &1))

    File.write!(Path.join(output, "robots.txt"), robots_txt())
    File.write!(Path.join(output, "CNAME"), "kubedaily.com\n")
    File.touch!(Path.join(output, ".nojekyll"))
  end

  defp routes do
    ["/", "/tools", "/docker-images", "/labs", "/roadmap", "/blog", "/about", "/sitemap.xml"] ++
      Enum.map(KubeDaily.labs(), &"/labs/#{&1["id"]}") ++
      Enum.map(KubeDaily.posts(), &"/blog/#{&1["id"]}")
  end

  defp write_page(output, path) do
    response =
      :get
      |> Plug.Test.conn(path)
      |> Map.put(:host, "kubedaily.com")
      |> Map.put(:scheme, :https)
      |> Endpoint.call([])

    if response.status != 200 do
      Mix.raise("Could not export #{path}: received HTTP #{response.status}")
    end

    destination =
      case path do
        "/" -> Path.join(output, "index.html")
        "/sitemap.xml" -> Path.join(output, "sitemap.xml")
        _ -> Path.join([output, String.trim_leading(path, "/"), "index.html"])
      end

    destination |> Path.dirname() |> File.mkdir_p!()
    File.write!(destination, static_html(response.resp_body))
  end

  defp static_html(html) do
    String.replace(
      html,
      ~r/\s*<script defer phx-track-static src="[^"]*\/assets\/app\.js"><\/script>/,
      ""
    )
  end

  defp robots_txt do
    """
    User-agent: *
    Allow: /

    Sitemap: https://kubedaily.com/sitemap.xml
    """
  end
end
