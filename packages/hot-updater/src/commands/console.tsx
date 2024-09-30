import proc from "child_process";
import electron from "electron";
import { Box, Text } from "ink";
import { useEffect } from "react";

const consoleSource = import.meta
  .resolve("@hot-updater/console")
  .replace("file://", "");

export default function Manage() {
  useEffect(() => {
    const child = proc.spawn(electron as any, [consoleSource], {
      stdio: "inherit",
      windowsHide: false,
    });
    child.on("close", (code, signal) => {
      if (code === null) {
        console.error("exited with signal", signal);
        process.exit(1);
      }
      process.exit(code);
    });

    const handleTerminationSignal = (signal: NodeJS.Signals) => {
      process.on(signal, function signalHandler() {
        if (!child.killed) {
          child.kill(signal);
        }
      });
    };

    handleTerminationSignal("SIGINT");
    handleTerminationSignal("SIGTERM");
  }, []);

  return (
    <Box>
      <Text>Console</Text>
    </Box>
  );
}
