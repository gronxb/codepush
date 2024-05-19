import { Platform } from "react-native";
import { checkForUpdate } from "./checkForUpdate";
import { HotUpdaterError } from "./error";
import { reload, updateBundle } from "./native";
import type { UpdatePayloadArg } from "./types";

export type HotUpdaterStatus = "INSTALLING_UPDATE" | "UP_TO_DATE";

export interface HotUpdaterInitConfig {
  payload: UpdatePayloadArg;
  onSuccess?: (status: HotUpdaterStatus) => void;
  onError?: (error: HotUpdaterError) => void;
}

export const init = async (config: HotUpdaterInitConfig) => {
  if (!["ios", "android"].includes(Platform.OS)) {
    const error = new HotUpdaterError(
      "HotUpdater is only supported on iOS and Android",
    );

    config?.onError?.(error);
    throw error;
  }

  const update = await checkForUpdate(config.payload);
  if (!update) {
    config?.onSuccess?.("UP_TO_DATE");
    return;
  }

  try {
    const allDownloadFiles = await updateBundle([], "");
    if (allDownloadFiles) {
      if (update.forceUpdate) {
        reload();
        config?.onSuccess?.("INSTALLING_UPDATE");
      }
    }
  } catch (error) {
    if (error instanceof HotUpdaterError) {
      config?.onError?.(error);
    }
    throw error;
  }
};