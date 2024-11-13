import { NativeModules } from "react-native";
import { HotUpdaterError } from "./error";

const { HotUpdater } = NativeModules;

/**
 * Fetches the current bundle version id.
 *
 * @async
 * @returns {Promise<number>} Resolves with the current version id or null if not available.
 */
export const getBundleTimestamp = async (): Promise<number> => {
  return new Promise((resolve) => {
    HotUpdater.getBundleTimestamp((version: number | null) => {
      resolve(version ?? -1);
    });
  });
};

/**
 * Downloads files from given URLs.
 *
 * @async
 * @param {string} bundleTimestamp - identifier for the bundle version.
 * @param {string | null} zipUrl - zip file URL.
 * @returns {Promise<boolean>} Resolves with true if download was successful, otherwise rejects with an error.
 */
export const updateBundle = (
  bundleTimestamp: number,
  zipUrl: string | null,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    HotUpdater.updateBundle(
      String(bundleTimestamp),
      zipUrl,
      (success: boolean) => {
        if (success) {
          resolve(success);
        } else {
          reject(
            new HotUpdaterError("Failed to download and install the update"),
          );
        }
      },
    );
  });
};

/**
 * Fetches the current app version.
 */
export const getAppVersion = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    HotUpdater.getAppVersion((version: string | null) => {
      resolve(version);
    });
  });
};

/**
 * Reloads the app.
 */
export const reload = () => {
  HotUpdater.reload();
};

/**
 * Initializes the HotUpdater.
 */
export const initializeOnAppUpdate = () => {
  HotUpdater.initializeOnAppUpdate();
};
