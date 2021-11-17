export const encodeb64 = (string) => {
  const binaryBuff = Buffer.from(string, "utf8");
  const base64encoded = binaryBuff.toString("base64");
  return base64encoded;
};

export const decodeb64 = (base64) => {
  const binaryBuff = Buffer.from(base64, "base64");
  const string = binaryBuff.toString("utf8");
  return string;
};
