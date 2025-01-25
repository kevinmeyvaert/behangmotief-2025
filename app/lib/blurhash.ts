export const validatedBlurhash = (incomingBlurhash: string) => {
  const isValid = incomingBlurhash?.length >= 6;
  return isValid ? incomingBlurhash : 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
};

export const aspectRatio = (width: number, height: number) => {
  return (height / width) * 100;
};
