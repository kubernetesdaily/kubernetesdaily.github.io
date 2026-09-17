defmodule SchoolHouse.KubeDailyContentTest do
  use ExUnit.Case, async: true
  alias SchoolHouse.{ContentDate, KubeDaily, PublicPages}

  test "dates preserve historical years and reject invalid dates" do
    assert ContentDate.parse("May 10, 2023") == {:ok, ~D[2023-05-10]}
    assert ContentDate.parse("2026-09-18") == {:ok, ~D[2026-09-18]}
    assert {:error, _} = ContentDate.parse("February 31, 2026")
    assert {:error, _} = ContentDate.parse("Never 1, 2026")
    assert {:error, _} = ContentDate.parse(nil)
  end

  test "every catalog source exists, matches its ID and renders" do
    for {entries, field, folder} <- [{KubeDaily.posts(), "file", "blog"}, {KubeDaily.labs(), "path", "labs"}] do
      ids = Enum.map(entries, & &1["id"])
      assert ids == Enum.uniq(ids)

      for entry <- entries do
        assert entry[field] == "/#{folder}/#{entry["id"]}.md"
        assert Regex.match?(~r/^[A-Za-z0-9-]+$/, entry["id"])
        assert String.trim(entry["title"]) != ""
        html = if folder == "blog", do: KubeDaily.post_html(entry), else: KubeDaily.lab_html(entry)
        assert byte_size(html) > 100
        if folder == "blog", do: assert(match?({:ok, _}, ContentDate.parse(entry["date"])))
      end
    end
  end

  test "shared route inventory contains new content but no removed collection" do
    paths = PublicPages.paths()
    assert length(paths) == length(Enum.uniq(paths))
    assert "/blog/docker-image-build-guide" in paths
    assert "/blog/kubernetes-requests-limits" in paths
    assert "/blog/kubernetes-probes-guide" in paths
    assert "/labs/Learn-kubectl" in paths
    refute Enum.any?(paths, &String.starts_with?(&1, "/elixir"))
  end

  test "article outlines point to rendered headings and omit duplicate document H1" do
    post = KubeDaily.post("kubernetes-requests-limits")
    content = KubeDaily.post_content(post)
    refute content.html =~ "<h1"
    assert length(content.outline) > 3
    for heading <- content.outline, do: assert(content.html =~ "id=\"#{heading.id}\"")
    assert KubeDaily.edit_url(post) =~ "/edit/main/priv/static/kubedaily/blog/kubernetes-requests-limits.md"
  end

  test "missing Markdown fails instead of publishing an excerpt as a complete guide" do
    assert_raise File.Error, fn ->
      KubeDaily.post_html(%{"file" => "/blog/nonexistent-test-guide.md", "excerpt" => "Fallback"})
    end
  end

  test "feed generation is repeatable and uses current catalog URLs" do
    path = Path.join(System.tmp_dir!(), "kubedaily-rss-#{System.unique_integer([:positive])}.xml")
    on_exit(fn -> File.rm(path) end)
    Mix.Tasks.Kubedaily.GenRss.write!(path)
    feed = File.read!(path)
    Mix.Tasks.Kubedaily.GenRss.write!(path)
    assert feed == File.read!(path)
    assert length(Regex.scan(~r/<item>/, feed)) == length(KubeDaily.posts())
    assert feed =~ "https://kubedaily.com/blog/docker-image-build-guide/"
    assert feed =~ "2023 00:00:00 GMT"
    refute feed =~ "undefined"
    refute feed =~ "/blog/blog/"
  end
end
