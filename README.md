# ML-lifecycle-visualization

Machine learning lifecycle visualization providing a checklist for steps necessary in a machine learning project.\

## Editing data

The content of the graph and table are managed in a Google Sheets document.
To edit the data, simply head to the mentioned [Google Sheets Document](https://docs.google.com/spreadsheets/d/1YkDQOfUrZ2mEoXTCQTYGkS2CsOXZ7XNnkelk8cTGICw/edit?usp=sharing).

The document is split into three sheets.

- [Lifecycle info](#lifecycle-info)
- [Nodes](#nodes)
- [Edges](#edges)

### Lifecycle info

This is the general lifecycle info for each step, edited data will be present in the table component of its assigned NodeID.

### Nodes

This sheet contains general information on the step nodes, each node must have a description and optionally have outcomes and additional notes.
Edited data will appear in the step node modals.

### Edges

The edge sheet, stores data on the transitions between two steps: start-step, end-step, description, it is important to note here that editing the edge data **does not edit the graph structure**, it merely edits the next steps as shown on the start-step's modal.

## Editing the graph

In case you would like to edit the graph such as adding or removing new nodes, repositioning entires or editing connections between nodes, head to the second page of the [graph editor document](https://app.diagrams.net/#G1bf3ZQti5tmn67OeS3bRZLtb-Qos-Bsn5). There you can edit the graph by adding, moving or removing nodes and edges, not the content itself. Note that the web-app does yet not support displaying edge data on the graph itself, so refrain from adding text associated to the edges, as seen on page 1 of the graph.

Once you have completed the edit, export the graph as an SVG file under ``File > Export > SVG...``, save it as ``ML_lifecycle.svg`` and replace the existing exist in the project's directory: ``ML-lifecycle-visualization > src > assets > ML_lifecycle.svg``.

In case your edit resulted in the deletion or addition of a node or edge, make sure to follow the steps mentioned in [Editing data](#editing-data), to update the graph's information accordingly.

## Project Setup

Make sure to have Node.js version 18 installed on your machine, and set it as the default version in your terminal.
We recommend using nvm if you have multiple versions of node installed, here is a [tutorial](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/).

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).