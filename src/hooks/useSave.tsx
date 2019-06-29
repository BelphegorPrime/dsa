// @ts-ignore
// tslint:disable-next-line:no-implicit-dependencies
import * as Node from "node";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { isJSON } from "../helperFunctions";
import { Electron } from "../types";

const checkDirectorySync = (fs: Node.fs, directory: string) => {
  try {
    fs.statSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
};

const saveFile = (electron: Electron, fileName: string, data: any) => {
  if (electron) {
    const { fs, tempDirectory } = electron;
    const appDataDir = `${tempDirectory}/topas`;
    checkDirectorySync(fs, appDataDir);
    const filePath = `${appDataDir}/${fileName}.json`;
    if (typeof data === "object" || Array.isArray(data)) {
      fs.writeFileSync(filePath, JSON.stringify(data));
    }
  }
};

const getFile = (electron: Electron, fileName: string) => {
  if (electron) {
    const { fs, tempDirectory } = electron;
    const appDataDir = `${tempDirectory}/topas`;
    checkDirectorySync(fs, appDataDir);
    const filePath = `${appDataDir}/${fileName}.json`;
    if (fs.existsSync(filePath)) {
      const dataString = fs.readFileSync(filePath, "utf-8");
      return isJSON(dataString) ? JSON.parse(dataString) : null;
    }
    return null;
  }
  return null;
};

const useSave = (
  electron: Electron,
  key: string,
  initialValue = null,
  raw = false
) => {
  const fileInitValue = getFile(electron, key);
  const [value, setValue] = useLocalStorage(
    key,
    fileInitValue || initialValue,
    raw
  );
  saveFile(electron, key, value);
  return [value, setValue];
};

export default useSave;
