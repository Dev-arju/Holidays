import multer from "multer";
import path from "path";
import fs from "fs";

const propertyStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/public/images/property");
  },
  filename: function (req, file, cb) {
    let { propertyName, propertyLocation } = req.body;
    propertyName = propertyName.replace(/\s+/g, "");
    propertyLocation = propertyLocation.replace(/\s+/g, "");
    const filename = `${propertyName}${propertyLocation}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});

const logoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/public/logo");
  },
  filename: function (req, file, cb) {
    let { brandName, id } = req.body;
    brandName = brandName.replace(/\s+/g, "");
    const filename = `${brandName}-${id}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const packageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.providerId;
    const folderPath = `server/public/images/packages/${folderName}`;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});

export const propertyImgUpload = multer({ storage: propertyStorage });
export const logoUpload = multer({ storage: logoStorage });
export const packageUpload = multer({ storage: packageStorage });
