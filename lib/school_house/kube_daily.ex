defmodule SchoolHouse.KubeDaily do
  @moduledoc "KubeDaily content loaded from the preserved upstream static files."

  def labs, do: json_collection("labs.json", "labs")
  def posts, do: json_collection("blog.json", "blogs")

  def lab(id), do: Enum.find(labs(), &(&1["id"] == id))
  def post(id), do: Enum.find(posts(), &(&1["id"] == id))

  def lab_html(%{"path" => path, "description" => description}), do: markdown_html(path, description)
  def post_html(%{"file" => path, "excerpt" => excerpt}), do: markdown_html(path, excerpt)

  def docker_image_catalog do
    images = docker_image_rows()

    categories =
      images
      |> Enum.flat_map(& &1.categories)
      |> Enum.frequencies()
      |> Enum.sort_by(fn {_category, count} -> -count end)
      |> Enum.take(8)
      |> Enum.map(fn {category, count} ->
        %{id: category, label: category_label(category), count: count}
      end)

    groups =
      Enum.map(categories, fn category ->
        images =
          images
          |> Enum.filter(&(category.id in &1.categories))
          |> Enum.take(6)

        Map.put(category, :images, images)
      end)

    %{categories: categories, groups: groups, image_count: length(images)}
  end

  def category_label("machine-learning-and-ai"), do: "Machine Learning & AI"
  def category_label("content-management-system"), do: "Content Management"
  def category_label("integration-and-delivery"), do: "Integration & Delivery"
  def category_label("monitoring-and-observability"), do: "Monitoring & Observability"

  def category_label(category) do
    category
    |> String.split("-")
    |> Enum.map_join(" ", &String.capitalize/1)
  end

  defp json_collection(file, key) do
    root()
    |> Path.join("data/#{file}")
    |> File.read!()
    |> Jason.decode!()
    |> Map.fetch!(key)
  end

  defp markdown_html("/" <> path, fallback) do
    path = Path.join(root(), path)

    case File.read(path) do
      {:ok, markdown} -> Earmark.as_html!(markdown)
      {:error, :enoent} -> Earmark.as_html!(fallback)
      {:error, reason} -> raise File.Error, reason: reason, action: "read file", path: path
    end
  end

  defp root, do: Application.app_dir(:school_house, "priv/static/kubedaily")

  defp docker_image_rows do
    root()
    |> Path.join("data/most-popular-dockerhub-images.csv")
    |> File.stream!()
    |> Stream.drop(1)
    |> Stream.map(&parse_docker_image/1)
    |> Enum.to_list()
  end

  defp parse_docker_image(line) do
    [name, pulls, stars, categories] = line |> String.trim() |> String.split(",", parts: 4)

    %{
      name: name,
      pulls: pulls,
      stars: stars,
      categories: categories |> String.split(";") |> Enum.map(&String.trim/1)
    }
  end
end
