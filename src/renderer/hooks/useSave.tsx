import { useLocalStorage } from "react-use";
import { Electron } from "../types/types";
import { useEffect, useState } from "react";

const useIpcFileInit = (electron: Electron, key: string) => {
  const [fileInitValue, setFileInitValue] = useState<any | null>(null);
  useEffect(() => {
    const ipcFileInitValue = electron.ipcRenderer.sendSync(
      "synchronous-message",
      JSON.stringify({
        type: "getFile",
        data: {
          fileName: key,
        },
      })
    );
    if (ipcFileInitValue) {
      setFileInitValue(ipcFileInitValue);
    }
  }, [electron, key]);

  return fileInitValue;
};

const useIpcSaveFile = (electron: Electron, key: string, value: any) => {
  useEffect(() => {
    electron.ipcRenderer.sendSync(
      "synchronous-message",
      JSON.stringify({
        type: "saveFile",
        data: {
          fileName: key,
          data: value,
        },
      })
    );
  }, [electron, key, value]);
};

const useSave = <T extends any>(
  electron: Electron,
  key: string,
  initialValue: any = null,
  raw = false
): [T, (val: T) => void] => {
  const fileInitValue = useIpcFileInit(electron, key);

  const [value, setValue] = useLocalStorage<any>(
    key,
    fileInitValue || initialValue,
    raw
      ? { raw: true }
      : {
          raw: false,
          serializer: (data: any) => JSON.stringify({ data }),
          deserializer: (dataString: string) => JSON.parse(dataString).data,
        }
  );

  useIpcSaveFile(electron, key, value);
  return [value, setValue];
};

export default useSave;
