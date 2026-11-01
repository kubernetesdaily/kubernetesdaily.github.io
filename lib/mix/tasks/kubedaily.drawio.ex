defmodule Mix.Tasks.Kubedaily.Drawio do
  @moduledoc """
  Compiles Draw.io (.drawio) diagrams into production-ready standalone SVG and high-DPI PNG assets.

  ## Examples

      mix kubedaily.drawio
      mix kubedaily.drawio priv/static/kubedaily/diagrams/kubernetes-threat-model.drawio
      mix kubedaily.drawio --scale 2 --out-dir priv/static/kubedaily/images

  ## Options

    * `--input`, `-i` - Path to `.drawio` file (default: `priv/static/kubedaily/diagrams/kubernetes-threat-model.drawio`)
    * `--out-dir`, `-o` - Output directory for generated images (default: `priv/static/kubedaily/images`)
    * `--scale`, `-s` - Screenshot scale factor for high-DPI PNGs (default: `2`)
    * `--prefix`, `-p` - Output filename prefix (default: `k8s-threat-model-`)

  """

  use Mix.Task

  @shortdoc "Compiles .drawio files into high-resolution SVG and PNG images"

  @default_input "priv/static/kubedaily/diagrams/kubernetes-threat-model.drawio"
  @default_out_dir "priv/static/kubedaily/images"

  @impl Mix.Task
  def run(args) do
    {options, positional, _} =
      OptionParser.parse(args,
        switches: [
          input: :string,
          out_dir: :string,
          scale: :integer,
          prefix: :string
        ],
        aliases: [
          i: :input,
          o: :out_dir,
          s: :scale,
          p: :prefix
        ]
      )

    input_path =
      options[:input] || List.first(positional) || @default_input

    out_dir = options[:out_dir] || @default_out_dir
    scale = options[:scale] || 2
    prefix = options[:prefix] || "k8s-threat-model-"

    compile(input_path, out_dir: out_dir, scale: scale, prefix: prefix)
  end

  @doc """
  Compiles a `.drawio` file into SVGs and PNGs.
  """
  def compile(input_path, opts \\ []) do
    out_dir = Keyword.get(opts, :out_dir, @default_out_dir)
    scale = Keyword.get(opts, :scale, 2)
    prefix = Keyword.get(opts, :prefix, "k8s-threat-model-")

    script_path = Path.expand("scripts/compile_drawio.js")

    unless File.exists?(script_path) do
      Mix.raise("Compile script not found at #{script_path}")
    end

    unless File.exists?(input_path) do
      Mix.raise("Draw.io source file not found at #{input_path}")
    end

    Mix.shell().info([
      :cyan,
      "==> Compiling Draw.io diagram: ",
      :bright,
      input_path,
      :reset
    ])

    args = [
      script_path,
      "--input",
      input_path,
      "--out-dir",
      out_dir,
      "--scale",
      to_string(scale),
      "--prefix",
      prefix
    ]

    case System.cmd("node", args, stderr_to_stdout: true) do
      {output, 0} ->
        case Jason.decode(output) do
          {:ok, %{"status" => "ok", "diagrams" => diagrams}} ->
            Enum.each(diagrams, &print_diagram_result(&1, scale))

            Mix.shell().info([
              :green,
              "✓ Successfully compiled #{length(diagrams)} diagram sheet(s) into #{out_dir}!\n",
              :reset
            ])

            {:ok, diagrams}

          _ ->
            Mix.shell().info(output)
            {:ok, []}
        end

      {error_output, code} ->
        Mix.raise("Draw.io compiler failed with exit code #{code}:\n#{error_output}")
    end
  end

  defp print_diagram_result(diag, scale) do
    svg_kb = Float.round(diag["svgSize"] / 1024, 1)
    png_mb = Float.round(diag["pngSize"] / (1024 * 1024), 2)

    Mix.shell().info([
      :green,
      "  ✓ [Sheet #{diag["index"] + 1}] ",
      :bright,
      diag["name"],
      :reset,
      :light_black,
      " (#{diag["width"]}×#{diag["height"]}px)\n",
      :reset,
      "     Vector SVG: ",
      :cyan,
      diag["svg"],
      :reset,
      " (#{svg_kb} KB)\n",
      "     Raster PNG: ",
      :cyan,
      diag["png"],
      :reset,
      " (#{png_mb} MB @ #{scale}x Retina DPI)\n"
    ])
  end
end
