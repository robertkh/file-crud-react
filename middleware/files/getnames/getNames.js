//?
import Path from "path";
import Fs from "fs";
import { yl } from "../../../util/logger.js";

// todo
export default async (req, res) => {
  if (!req?.session?.user?.id) {
    res.json("no");
    return;
  }
  //
  let testFolder;
  if (process.env.NODE_ENV === "production") {
    testFolder = Path.join(Path.resolve(), "client/build/images");
  } else {
    testFolder = Path.join((Path.resolve(), "client/public/images"));
  }

  yl.log(testFolder);

  Fs.readdir(testFolder, (err, files) => {
    let newnames = files?.filter(
      (file) => file.indexOf(req.session.user.id) != -1
    );

    let names = newnames?.map((file) => {
      let i = file.indexOf("_");
      return file.slice(i + 1);
    });

    yl.log(names);
    res.json(names);
  });
};
