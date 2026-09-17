defmodule SchoolHouse.ContentDate do
  @moduledoc "Parses ISO dates and the legacy Month D, YYYY catalog format."
  @months ~w(January February March April May June July August September October November December)

  def parse(value) when is_binary(value) do
    case Date.from_iso8601(value) do
      {:ok, date} -> {:ok, date}
      _ -> parse_legacy(value)
    end
  end

  def parse(_), do: {:error, :invalid_date}

  defp parse_legacy(value) do
    with [_, month, day, year] <- Regex.run(~r/^(\w+) (\d{1,2}), (\d{4})$/, value),
         index when is_integer(index) <- Enum.find_index(@months, &(&1 == month)) do
      Date.new(String.to_integer(year), index + 1, String.to_integer(day))
    else
      _ -> {:error, :invalid_date}
    end
  end
end
