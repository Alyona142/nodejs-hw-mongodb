import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';
import { ClOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(ClOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(ClOUDINARY.API_KEY),
  api_secret: getEnvVar(ClOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
