import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
});

export default imagekit;

export const getImageUrl = (path: string, transformations: object = {}) => {
  if (path.startsWith('http')) return path;
  
  return imagekit.url({
    path: path,
    transformation: [transformations]
  });
};
