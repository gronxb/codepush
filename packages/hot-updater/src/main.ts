import { type DeployOptions, deploy } from "@/commands/deploy";
import { version } from "@/package.json";
import { printLogo } from "@/utils/printLogo";
import { log } from "@hot-updater/internal";
import { Command, Option } from "commander";
import { generateSecretKey } from "./commands/generateSecretKey";
import { cwd } from "./cwd";
import { getPlatform } from "./prompts/getPlatform";
import { getDefaultTargetVersion } from "./utils/getDefaultTargetVersion";

printLogo();

const program = new Command();
program
  .name("hot-updater")
  .description("CLI to React Native OTA solution for self-hosted")
  .version(version);

program
  .command("deploy")
  .description("deploy a new version")
  .addOption(
    new Option("-p, --platform <platform>", "specify the platform").choices([
      "ios",
      "android",
    ]),
  )
  .addOption(
    new Option(
      "-t, --target-app-version <targetVersion>",
      "specify the platform",
    ),
  )
  .addOption(
    new Option("-f, --force-update", "force update the app").default(false),
  )
  .action(async (options: DeployOptions) => {
    if (!options.platform) {
      options.platform = await getPlatform();
    }
    deploy(options);
  });

program
  .command("generate-secret-key")
  .description("generate a new secret key")
  .action(generateSecretKey);

program
  .command("app-version")
  .description("get the current app version")

  .action(async () => {
    const path = cwd();
    const androidVersion = await getDefaultTargetVersion(path, "android");
    const iosVersion = await getDefaultTargetVersion(path, "ios");

    log.info(`Android version: ${androidVersion}`);
    log.info(`iOS version: ${iosVersion}`);
  });

program.parse();
