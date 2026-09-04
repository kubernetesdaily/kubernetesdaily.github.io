defmodule SchoolHouse.KubeDaily do
  @moduledoc "KubeDaily content loaded from the preserved upstream static files."

  def labs, do: json_collection("labs.json", "labs")
  def posts, do: json_collection("blog.json", "blogs")

  def lab(id), do: Enum.find(labs(), &(&1["id"] == id))
  def post(id), do: Enum.find(posts(), &(&1["id"] == id))

  def lab_html(%{"path" => path}), do: markdown_html(path)
  def post_html(%{"file" => path}), do: markdown_html(path)

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

  defp markdown_html("/" <> path) do
    root()
    |> Path.join(path)
    |> File.read!()
    |> Earmark.as_html!()
  end

  defp root, do: Application.app_dir(:school_house, "priv/static/kubedaily")
end
