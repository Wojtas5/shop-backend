export interface UserPass {
  username: string;
  password: string;
}

export const decodeAuthHeader = (header: string): UserPass | undefined => {
  const b64auth = header.split(' ')[1];
  if (!b64auth) return undefined;
  const decoded = Buffer.from(b64auth, 'base64').toString().split(':');
  if (decoded.length != 2) return undefined;
  return {
    username: decoded[0],
    password: decoded[1],
  };
};
