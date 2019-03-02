import { useLocalStorage } from 'react-use';
import { isJSON } from '../helperFunctions';

const checkDirectorySync = (fs, directory) => {
  try {
    fs.statSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
};

const saveFile = (electron, fileName, data) => {
  const { fs, tempDirectory } = electron;
  const appDataDir = `${tempDirectory}/topas`;
  checkDirectorySync(fs, appDataDir);
  const filePath = `${appDataDir}/${fileName}.json`;
  if (typeof data === 'object' || Array.isArray(data)) {
    fs.writeFileSync(filePath, JSON.stringify(data));
  }
};

const getFile = (electron, fileName) => {
  const { fs, tempDirectory } = electron;
  const appDataDir = `${tempDirectory}/topas`;
  checkDirectorySync(fs, appDataDir);
  const filePath = `${appDataDir}/${fileName}.json`;
  if (fs.existsSync(filePath)) {
    const dataString = fs.readFileSync(filePath, 'utf-8');
    return isJSON(dataString) ? JSON.parse(dataString) : null;
  }
  return null;
};

const useSave = (electron, key, initialValue = null, raw = false) => {
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
