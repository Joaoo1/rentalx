import fs from 'fs/promises';

export const deleteFile = async (filename: string) => {
  try {
    await fs.stat(filename);
  } catch {
    return;
  }

  await fs.unlink(filename);
};
