import { log } from "@hot-updater/internal";
import pc from "picocolors";

export const logoString = [
  "    __  __      __     __  __          __      __           ",
  "   / / / /___  / /_   / / / /___  ____/ /___ _/ /____  _____",
  "  / /_/ / __ \\/ __/  / / / / __ \\/ __  / __ `/ __/ _ \\/ ___/",
  " / __  / /_/ / /_   / /_/ / /_/ / /_/ / /_/ / /_/  __/ /    ",
  "/_/ /_/\\____/\\__/   \\____/ .___/\\__,_/\\__,_/\\__/\\___/_/     ",
  "                        /_/                                 ",
].join("\n");

export const printLogo = () => {
  log.info(logoString);
};
