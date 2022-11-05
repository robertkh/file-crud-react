//?
import { yl, gl, rl } from "../../../util/logger.js";
import Path from "path";

// todo
export default async function (req, res) {
  //
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json("No files were uploaded.");
  }

  //
  const image = req.files.upImage;
  let filePath;
  rl.log(typeof image.name);
  yl.log(Path.resolve());

  if (process.env.NODE_ENV === "production") {
    filePath =
      Path.join(Path.resolve(), "./client/build/images/") +
      req.session.user.id +
      "_" +
      image.name;
    yl.log(filePath);
  } else {
    filePath =
      Path.join(Path.resolve(), "./client/public/images/") +
      req.session.user.id +
      "_" +
      image.name;
    gl.log(filePath);
  }

  //
  if (image.size > 100 * 1024) {
    rl.log("Նկարի ծավալը գերազանցում է թույլատրելի սահմանը։");
    return res
      .status(400)
      .json("Նկարի ծավալը գերազանցում է թույլատրելի 100kb սահմանը։");
  }

  //
  try {
    await image.mv(`${filePath}`, (error) => {
      if (error) {
        rl.log(error);
        res.status(500).json({
          message: error,
        });
        return;
      }
      res.status(200).json("Նկարը հաջողությամբ վերբեռնվեց։");
    });
  } catch (err) {
    rl.log(err.message);
  }
}
