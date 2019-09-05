const isUrlValid = require('../src/helpers/isUrlValid');

describe('index', () => {
  describe('valid url function', () => {
    it('when no line is sent, then the url is not valid', () => {
      expect(isUrlValid()).toBe(false);
    });
    it('when only a number is sent, then the url is not valid', () => {
      expect(isUrlValid(1)).toBe(false);
    });
    it('when a correct url is sent, then the url is valid', () => {
      expect(isUrlValid('https://miku86.com')).toBe(true);
    });
  });
});
