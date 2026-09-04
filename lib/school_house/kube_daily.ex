defmodule SchoolHouse.KubeDaily do
  @moduledoc "KubeDaily content loaded from the preserved upstream static files."

  def labs, do: json_collection("labs.json", "labs")
  def posts, do: json_collection("blog.json", "blogs")

  def lab(id), do: Enum.find(labs(), &(&1["id"] == id))
  def post(id), do: Enum.find(posts(), &(&1["id"] == id))

  def lab_html(%{"path" => path, "description" => description}), do: markdown_html(path, description)
  def post_html(%{"file" => path, "excerpt" => excerpt}), do: markdown_html(path, excerpt)

  def docker_images do
    root()
    |> Path.join("data/most-popular-dockerhub-images.csv")
    |> File.stream!()
    |> Stream.take(41)
    |> Enum.map(&(&1 |> String.trim() |> String.split(",")))
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
end
