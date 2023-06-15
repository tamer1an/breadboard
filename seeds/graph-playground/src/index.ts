/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { intro, outro, text, log } from "@clack/prompts";

import { GraphDescriptor, NodeHandlers, follow } from "./graph.js";

const graph: GraphDescriptor = {
  edges: [
    {
      entry: true,
      from: { node: "user-input-1", output: "text" },
      to: { node: "text-completion-1", input: "text" },
    },
    {
      from: { node: "text-completion-1", output: "completion" },
      to: { node: "console-output-1", input: "text" },
    },
  ],
  nodes: [
    { id: "user-input-1", type: "user-input" },
    { id: "text-completion-1", type: "text-completion" },
    { id: "console-output-1", type: "console-output" },
  ],
};

const handlers: NodeHandlers = {
  "user-input": async () => {
    const input = await text({
      message: "Enter some text",
    });
    return {
      text: input,
    };
  },
  "text-completion": async (inputs) => {
    console.log("Text completion handler invoked with inputs:", inputs);
    return {
      completion: "this is a real text completion",
    };
  },
  "console-output": async (inputs) => {
    if (!inputs) return {};
    log.info(inputs["text"] as string);
    return {};
  },
};

intro("Let's follow a graph!");
await follow(graph, handlers);
outro("Awesome work! Let's do this again sometime");
