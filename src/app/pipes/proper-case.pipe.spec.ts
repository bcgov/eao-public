import { ProperCasePipe } from './proper-case.pipe';

describe('ProperCasePipe', () => {
  const pipe = new ProperCasePipe();

  describe('given an empty string', () => {
    it('returns an empty string', () => {
      expect(pipe.transform('')).toBe('');
    });
  });

  describe('given an invalid string', () => {
    it('returns null', () => {
      expect(pipe.transform(null)).toBe(null);
    });

    it('returns undefined', () => {
      expect(pipe.transform(undefined)).toBe(undefined);
    });
  });

  describe('given a valid string', () => {
    it('converts a short word', () => {
      expect(pipe.transform('a')).toBe('A');
    });

    it('converts a long word', () => {
      expect(pipe.transform('thisisareallylongrunonword')).toBe('Thisisareallylongrunonword');
    });

    it('converts all words', () => {
      expect(pipe.transform('these Are some words-with-hyphens and Capitals')).toBe(
        'These Are Some Words-With-Hyphens And Capitals'
      );
    });

    it('converts strings containing symbols', () => {
      expect(pipe.transform('these! Are some (words-with-hyphens) and_sym!@# $%^ &*() _+=Bols and Capitals!')).toEqual(
        'These! Are Some (Words-With-Hyphens) And_sym!@# $%^ &*() _+=Bols And Capitals!'
      );
    });
  });
});
