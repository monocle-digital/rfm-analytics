import { UnsupportedMediaTypeException } from '@nestjs/common';
import { extname } from 'path';

export function fileMimetypeFilter(...mimetypes: string[]) {
  return (
    req,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      console.log('false');
      callback(
        new UnsupportedMediaTypeException(
          `File type is not matching: ${mimetypes.join(', ')}`,
        ),
        false,
      );
    }
  };
}

export function randomizeFilename(file) {
  // Generating a 32 random chars long string
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  //Calling the callback passing the random name generated with the original extension name
  return `${randomName}${extname(file.originalname)}`;
}
