/**
 * The entrypoint for the action. This file simply imports and runs the action's
 * main logic.
 */
// eslint-disable-next-line simple-import-sort/imports
import "source-map-support/register";
import "reflect-metadata";

import { run } from "./main.js";

/* istanbul ignore next */
void run();
