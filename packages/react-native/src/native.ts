import { URL } from "react-native-url-polyfill";

import { NativeModules } from "react-native";
import { HotUpdaterError } from "./error";

const { HotUpdater } = NativeModules;

/**
 * Fetches the current bundle version id.
 *
 * @async
 * @returns {Promise<number|null>} Resolves with the current version id or null if not available.
 */
export const getBundleVersion = async (): Promise<number | null> => {
  return new Promise((resolve) => {
    HotUpdater.getBundleVersion((version: number | null) => {
      resolve(version);
    });
  });
};

/**
 * Downloads files from given URLs.
 *
 * @async
 * @param {string[]} urls - An array of URL strings to download files from.
 * @param {string} prefix - The prefix to be added to each file name.
 * @returns {Promise<boolean>} Resolves with true if download was successful, otherwise rejects with an error.
 */
export const updateBundle = (
  urls: string[],
  prefix: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const encodedURLs = urls.map((urlString) => {
      const url = new URL(urlString);
      return [
        url.origin,
        url.pathname
          .split("/")
          .map((pathname) => encodeURIComponent(pathname))
          .join("/"),
      ].join("");
    });

    HotUpdater.updateBundle(encodedURLs, prefix, (success: boolean) => {
      if (success) {
        resolve(success);
      } else {
        reject(
          new HotUpdaterError("Failed to download and install the update"),
        );
      }
    });
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