import StringCSV from '../utils/StringCSV';

describe('Validate parse csv', () => {
  let data = "date,amount,spent\\\n1/01/19,10,100\\\n2/01/19,20,200"
  test('Validate Headers', () => {
      let res = StringCSV(data)
      const headersLength = res[0].length;
      expect(headersLength).toEqual(3);
    });
    test('Validate Rows', () => {
      let res = StringCSV(data)
      const rowsLength = res.length - 1;
      expect(rowsLength).toEqual(2);
    });
});