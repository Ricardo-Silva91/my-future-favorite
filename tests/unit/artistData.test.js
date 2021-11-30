import artistArray from '../../src/assets/artists';

test('artist array is valid and not empty', () => {
  expect(artistArray).toBeTruthy();
  expect(artistArray.length).toBeTruthy();
})