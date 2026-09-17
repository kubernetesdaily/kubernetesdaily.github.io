defmodule SchoolHouse.PublicPages do
  @moduledoc "One route inventory shared by the Pages exporter and sitemap."
  alias SchoolHouse.KubeDaily

  def paths,
    do:
      ["/", "/tools", "/docker-images", "/labs", "/roadmap", "/blog", "/about"] ++
        Enum.map(KubeDaily.labs(), &"/labs/#{&1["id"]}") ++
        Enum.map(KubeDaily.posts(), &"/blog/#{&1["id"]}")
end
