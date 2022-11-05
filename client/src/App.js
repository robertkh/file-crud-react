//?
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import { LngContextProvider } from "./new-user/context/LngContext";
import { NameContextProvider } from "./new-user/context/NameContext";

import FileUpload from "./files/fileupload/FileUpload.js";
import UserButton from "./new-user/UserButton";
import GetFileNames from "./files/getfilenames/GetFilesName.js";
import DeleteFile from "./files/deletefile/DeleteFile.js";
import RenameFile from "./files/renamefile/RenameFile.js";

// todo
function App() {
  return (
    <div>
      <LngContextProvider>
        {
          <NameContextProvider>
            <UserButton />
          </NameContextProvider>
        }
        <FileUpload className="w-50 mx-auto mt-5 border border-warning p-2 rounded" />
        <GetFileNames className="w-50 mx-auto mt-5 border border-warning p-2 rounded" />
        <DeleteFile className="w-50 mx-auto mt-5 border border-warning p-2 rounded" />
        <RenameFile className="w-50 mx-auto mt-5 border border-warning p-2 rounded" />
      </LngContextProvider>
    </div>
  );
}

export default App;
