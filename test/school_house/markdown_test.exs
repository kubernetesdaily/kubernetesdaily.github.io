defmodule SchoolHouse.MarkdownTest do
  use ExUnit.Case, async: true

  alias SchoolHouse.Markdown

  test "Helm archive preserves prose headings and YAML code boundaries" do
    html =
      :school_house
      |> Application.app_dir("priv/static/kubedaily/labs/Learn-Helm.md")
      |> File.read!()
      |> Markdown.to_html()

    document = Floki.parse_document!(html)
    headings = document |> Floki.find("h1, h2, h3, h4") |> Enum.map(&Floki.text/1)
    assert "view the chart" in headings
    assert "50 Helm Template Cheatsheets" in headings
    assert "Working with Multiple Values" in headings

    code = document |> Floki.find("pre code") |> Enum.map(&Floki.text/1)
    assert Enum.any?(code, &String.contains?(&1, "apiVersion: v2"))
    assert Enum.any?(code, &String.contains?(&1, "kubectl get deploy,svc"))
    refute Enum.any?(code, &String.contains?(&1, "# 50 Helm Template Cheatsheets"))
    refute "A chart can be either an 'application' or a 'library' chart." in headings
  end

  test "GFM tables, fenced code and footnotes render as HTML" do
    html =
      Markdown.to_html("| Name |\n| --- |\n| Pod |\n\n```sh\nkubectl get pods\n```\n\nA note[^1].\n\n[^1]: Details.\n")

    document = Floki.parse_document!(html)
    assert length(Floki.find(document, "table")) == 1

    code =
      document
      |> Floki.find("pre code.language-sh")
      |> Floki.text()

    assert code =~ "kubectl"
    assert html =~ "Details."
    refute html =~ "[^1]"
  end
end
