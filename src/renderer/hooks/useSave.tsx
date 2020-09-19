import { useLocalStorage } from "react-use";
import { Electron } from "../types";
import { useEffect, useState } from "react";

const useSave = (
  electron: Electron,
  key: string,
  initialValue: any = null,
  raw = false
): [any, (val: any) => void] => {
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

  console.log(key, value);
  return [value, setValue];
};

export default useSave;
