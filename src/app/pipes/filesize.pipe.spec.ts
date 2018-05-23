import { FileSizePipe } from './filesize.pipe';

describe('FilesizePipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new FileSizePipe();
  });

  it('correctly transforms a single value using the default settings', () => {
    const byteSize = 15435483;
    const result = pipe.transform(byteSize);
    expect(result).toBe('14.72 MB');
  });

  it('correctly transforms multiple values using the default settings', () => {
    const byteSizes = [15435483, 3564];
    const result = pipe.transform(byteSizes);
    console.log(result);
    expect(result).toEqual(['14.72 MB', '3.48 KB']);
  });

  it('correctly transforms a single value using the provided options', () => {
    const byteSize = 15435483;
    const result = pipe.transform(byteSize, { bits : true});
    expect(result).toBe('117.76 Mb');
  });

  it('correctly transforms multiple values using the provided options', () => {
    const byteSizes = [15435483, 3564];
    const result = pipe.transform(byteSizes, { bits : true});
    console.log(result);
    expect(result).toEqual(['117.76 Mb', '27.84 Kb']);
  });
});
