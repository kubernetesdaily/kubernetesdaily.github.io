defmodule SchoolHouse.Markdown do
  @moduledoc "CommonMark/GFM rendering for reviewed repository content (not user-submitted HTML)."

  def to_html(markdown) do
    MDExNative.Comrak.markdown_to_html(markdown,
      extension: [table: true, autolink: true, strikethrough: true, tasklist: true, footnotes: true],
      render: [unsafe: true]
    )
  end
end
