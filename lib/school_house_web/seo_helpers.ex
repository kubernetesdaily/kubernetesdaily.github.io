defmodule SchoolHouseWeb.SeoHelpers do
  @moduledoc false

  @default_description "KubeDaily helps developers learn Kubernetes, containers, cloud-native tools, Docker, Helm, and DevOps practices."

  def canonical_url(conn) do
    path = if conn.request_path == "/", do: "", else: String.trim_trailing(conn.request_path, "/")
    site_url() <> path
  end

  def seo_description(assigns), do: get_in(assigns, [:seo, :description]) || @default_description

  def seo_image(assigns) do
    image = get_in(assigns, [:seo, :image]) || "/kubedaily/logos/KubeDaily-3.png"
    if String.starts_with?(image, "http"), do: image, else: site_url() <> image
  end

  def seo_type(assigns) do
    get_in(assigns, [:seo, :type]) ||
      if(get_in(assigns, [:seo, :schema_type]) == "Article", do: "article", else: "website")
  end

  def seo_keywords(assigns) do
    get_in(assigns, [:seo, :keywords]) ||
      "Kubernetes, containers, Docker, cloud native, DevOps, Helm, orchestration"
  end

  def structured_data(conn, assigns) do
    seo = assigns[:seo] || %{}

    data =
      case seo[:schema_type] do
        "Article" ->
          article = %{
            "@context" => "https://schema.org",
            "@type" => "Article",
            "headline" => assigns[:page_title],
            "description" => seo_description(assigns),
            "mainEntityOfPage" => canonical_url(conn),
            "image" => seo_image(assigns),
            "author" => %{"@type" => "Person", "name" => seo[:author] || "KubeDaily"},
            "publisher" => publisher()
          }

          case iso_date(seo[:published]) do
            nil -> article
            date -> Map.put(article, "datePublished", date)
          end

        "LearningResource" ->
          %{
            "@context" => "https://schema.org",
            "@type" => "LearningResource",
            "name" => assigns[:page_title],
            "description" => seo_description(assigns),
            "url" => canonical_url(conn),
            "provider" => publisher()
          }

        "WebSite" ->
          %{
            "@context" => "https://schema.org",
            "@type" => "WebSite",
            "name" => "KubeDaily",
            "alternateName" => "Kubernetes Daily",
            "url" => site_url(),
            "description" => seo_description(assigns)
          }

        _ ->
          %{
            "@context" => "https://schema.org",
            "@type" => "WebPage",
            "name" => assigns[:page_title],
            "description" => seo_description(assigns),
            "url" => canonical_url(conn),
            "isPartOf" => publisher()
          }
      end

    data
    |> Jason.encode!()
    |> String.replace("<", "\\u003c")
  end

  def site_url, do: Application.get_env(:school_house, :site_url, "https://kubedaily.com")

  defp iso_date(date) when is_binary(date) do
    case Date.from_iso8601(date) do
      {:ok, _} -> date
      _ -> nil
    end
  end

  defp iso_date(_), do: nil

  defp publisher do
    %{
      "@type" => "Organization",
      "name" => "KubeDaily",
      "url" => site_url(),
      "logo" => site_url() <> "/kubedaily/logos/KubeDaily-3.png"
    }
  end
end
