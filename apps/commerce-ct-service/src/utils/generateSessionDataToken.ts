import jwt from 'jsonwebtoken';

export const generateSessionToken = (sessionData: any) => {
  // Create a copy of sessionData and remove `exp` and `iat` if they exist
  const sanitizedData = { ...sessionData };
  delete sanitizedData.exp;
  delete sanitizedData.iat;

  return jwt.sign(sanitizedData, process.env.JWT_SECRET || 'defaultSecret', {
    expiresIn: '1h',
  });
};
