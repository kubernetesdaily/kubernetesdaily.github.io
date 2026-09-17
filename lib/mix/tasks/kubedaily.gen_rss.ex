defmodule Mix.Tasks.Kubedaily.GenRss do
  @moduledoc "Generates RSS from the same catalog as the blog and sitemap."
  use Mix.Task
  alias SchoolHouse.{ContentDate, KubeDaily}
  alias SchoolHouseWeb.SeoHelpers

  @shortdoc "Generate the KubeDaily RSS feed"
  @impl Mix.Task
  def run(args) do
    Mix.Task.run("app.start")
    {options, _, _} = OptionParser.parse(args, strict: [output: :string])
    write!(options[:output] || "_site/rss.xml")
  end

  def write!(path) do
    items = Enum.map_join(KubeDaily.posts(), "\n", &item_xml/1)
    url = escape(SeoHelpers.site_url())

    document = """
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>KubeDaily</title>
        <link>#{url}/</link>
        <description>Practical Kubernetes, containers, and cloud-native guides.</description>
        <language>en-us</language>
        <atom:link href="#{url}/rss.xml" rel="self" type="application/rss+xml" />
        #{items}
      </channel>
    </rss>
    """

    path |> Path.dirname() |> File.mkdir_p!()
    File.write!(path, document)
  end

  defp item_xml(post) do
    url = escape("#{SeoHelpers.site_url()}/blog/#{post["id"]}/")
    {:ok, date} = ContentDate.parse(post["date"])
    published = Calendar.strftime(date, "%a, %d %b %Y") <> " 00:00:00 GMT"

    """
    <item>
      <title>#{escape(post["title"])}</title>
      <link>#{url}</link>
      <guid isPermaLink="true">#{url}</guid>
      <pubDate>#{published}</pubDate>
      <description>#{escape(post["excerpt"])}</description>
      <category>#{escape(post["category"])}</category>
    </item>
    """
  end

  defp escape(value) do
    value |> Phoenix.HTML.html_escape() |> Phoenix.HTML.safe_to_string()
  end
end
