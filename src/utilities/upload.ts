import { join } from "path";
import { v4 as uuid4 } from "uuid";

export const cinemaImageName = (req, file, callback) => {
  const fileName = `${uuid4()}-${file.originalname}`;
  callback(null, fileName);
};

export const userImageName = (req, file, callback) => {
  const filename = `${uuid4()}-${file.originalname}`;
  callback(null, filename);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

export const uploadDestination: string = join(__dirname, "..", "..", "public");
