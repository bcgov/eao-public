import { StringHelper } from './string-helper';

describe('StringHelper', () => {
  describe('given an empty string', () => {
    it('returns an empty string', () => {
      expect(StringHelper.toProperCase('')).toBe('');
    });
  });

  describe('given an invalid string', () => {
    it('returns null', () => {
      expect(StringHelper.toProperCase(null)).toBe(null);
    });

    it('returns undefined', () => {
      expect(StringHelper.toProperCase(undefined)).toBe(undefined);
    });
  });

  describe('given a valid string', () => {
    it('converts a short word', () => {
      expect(StringHelper.toProperCase('a')).toBe('A');
    });

    it('converts a long word', () => {
      expect(StringHelper.toProperCase('thisisareallylongrunonword')).toBe('Thisisareallylongrunonword');
    });

    it('converts all words', () => {
      expect(StringHelper.toProperCase('these Are some words-with-hyphens and Capitals')).toBe(
        'These Are Some Words-With-Hyphens And Capitals'
      );
    });

    it('converts strings containing symbols', () => {
      expect(
        StringHelper.toProperCase('these! Are some (words-with-hyphens) and_sym!@# $%^ &*() _+=Bols and Capitals!')
      ).toEqual('These! Are Some (Words-With-Hyphens) And_sym!@# $%^ &*() _+=Bols And Capitals!');
    });
  });
});
