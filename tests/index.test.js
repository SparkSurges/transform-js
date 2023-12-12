const { transform } = require('../src/transform');

test('transforms to JSON', async () => {
  const args = { key1: 'value1', key2: 'value2' };
  const result = await transform(args, 'json');
  expect(result).toBe('{"key1":"value1","key2":"value2"}');
});

test('transforms to base64', async () => {
  const args = { key1: 'value1', key2: 'value2' };
  const result = await transform(args, 'base64');
  expect(result).toBe('eyJrZXkxIjoidmFsdWUxIiwia2V5MiI6InZhbHVlMiJ9');
});

test('encrypts and decrypts successfully', async () => {
  const args = { key1: 'value1', key2: 'value2' };
  const secretKey = 'mysecretkey';

  const encryptedResult = await transform(args, 'encrypt', secretKey);
  expect(encryptedResult).not.toBe(JSON.stringify(args));

  const decryptedResult = await transform(encryptedResult, 'decrypt', secretKey);
  expect(decryptedResult).toEqual(JSON.stringify(args));
});

test('throws error for invalid transformation option', async () => {
  const args = { key1: 'value1', key2: 'value2' };

  await expect(transform(args, 'invalidOption')).rejects.toThrow('Invalid transformation option');
});

test('throws error for invalid type of arguments', async () => {
  const args = undefined;

  await expect(transform(args, 'json')).rejects.toThrow('Invalid type object, expected object');
});

test('throws error for decryption with invalid key', async () => {
  const args = { key1: 'value1', key2: 'value2' };
  const secretKey = 'mysecretkey';

  const encryptedResult = await transform(args, 'encrypt', secretKey);

  // Use a different key for decryption
  const invalidKey = 'invalidkey';
  await expect(transform(encryptedResult, 'decrypt', invalidKey)).rejects.toThrow('Decryption failed. Invalid key or data.');
});
