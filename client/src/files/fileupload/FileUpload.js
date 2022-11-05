//?
import React, { useState } from "react";
import { message, Divider } from "antd";
import { useFileUpload } from "use-file-upload";
import { FaFolderOpen } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import { useLngContext } from "../../new-user/context/LngContext";
import handleUpload from "./handleUpload";
import "./fileUpload.css";

// todo
export default function FileUpload({ className }) {
  //
  const [myFile, selectFile] = useFileUpload();
  const [isValid, setIsValid] = useState(false);
  const strings = useLngContext();

  //
  return (
    <div className={className}>
      <Divider style={{ color: "red" }}>File Upload</Divider>
      <div className="d-flex justify-content-between">
        {isValid && (
          <div>
            <img
              alt=""
              src={myFile?.source}
              height="38px"
              data-tip
              data-for="custom-img"
            />

            <ReactTooltip
              id="custom-img"
              type="warning"
              effect="solid"
              place="bottom"
            >
              <img alt="" src={myFile?.source} width="300" />
            </ReactTooltip>
          </div>
        )}

        <div className=" mt-1">
          {myFile ? (
            <div>
              <span> Name: </span>
              <span className="text-primary"> {myFile.name} </span>
              <span className="ml-2">Size: </span>
              <span className="text-primary">
                {Math.ceil(myFile.size / 1000)} KB
              </span>
            </div>
          ) : (
            <span>
              {strings.fu_1} ( {strings.fu_2} 100KB )
            </span>
          )}
        </div>

        <div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ lineHeight: 0.6 }}
            onClick={(e) => {
              selectFile(
                { accept: "image/*" },
                ({ source, name, size, file }) => {
                  // file - is the raw File Object
                  if (
                    file.type !== "image/jpeg" &&
                    file.type !== "image/jpg" &&
                    file.type !== "image/png"
                  ) {
                    setIsValid(false);
                    message.error(strings.fu_6);
                    return;
                  }
                  if (size > 100000) {
                    message.error(strings.fu_7);
                    setIsValid(false);
                    return;
                  }

                  setIsValid(true);
                }
              );
            }}
          >
            <FaFolderOpen size={18} />
            {"\u00A0\u00A0"}
            {myFile ? strings.fu_4 : strings.fu_3}
          </button>
        </div>
      </div>

      <div className="d-grid pt-3">
        <button
          type="button"
          className="btn btn-success btn-block btn-sm "
          disabled={!isValid}
          onClick={() => handleUpload(myFile.file, setIsValid)}
        >
          {strings.fu_5}
        </button>
      </div>
    </div>
  );
}
