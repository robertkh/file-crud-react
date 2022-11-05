//?
import _ from "lodash";
import { message } from "antd";

// todo
export default async function handleUpload(file, set) {
  try {
    const formData = new FormData();
    let newFileName = file.name.split(".");
    newFileName =
      _.capitalize(_.snakeCase(newFileName[0])) + "." + newFileName[1];

    formData.append("upImage", file, newFileName);

    //
    let response = await fetch("/files/upload", {
      method: "POST",
      body: formData,
    });

    let result = await response.json();
    console.log(result);

    if (response.ok) {
      message.success(result);
    } else {
      message.error(result);
    }

    set(false);
  } catch (err) {
    console.error(err);
  }
}
