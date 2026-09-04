# KubeDaily Phoenix

KubeDaily reimplemented as an Elixir/Phoenix application using the Elixir School School House codebase as its foundation.

## Included KubeDaily content

- Server-rendered home, labs, individual lab pages, blog index, individual posts, Docker images, and About pages.
- The original labs, blog markdown, image assets, gallery, datasets, RSS, sitemap, and tool catalogue in `priv/static/kubedaily/`.
- The full tool catalogue is loaded from KubeDaily's preserved `entries.js` and provides client-side search and category filtering.

## Run it

```sh
HEX_HOME="$PWD/.hex" MIX_HOME="$PWD/.mix" mix deps.get
cd assets && npm install --cache ../.npm-cache && cd ..
HEX_HOME="$PWD/.hex" MIX_HOME="$PWD/.mix" mix phx.server
```

Open `http://localhost:4000`.

For production assets:

```sh
HEX_HOME="$PWD/.hex" MIX_HOME="$PWD/.mix" mix assets.deploy
```

The original KubeDaily Apache 2.0 license is retained in `LICENSE`; the School House base is also Apache 2.0.
