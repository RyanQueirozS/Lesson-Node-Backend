import { StringFormatter } from '@src/shared/utils/helpers/string-format'

describe('StringFormatter', () => {
  const testString = ' ab c   de  '

  it('should remove white spaces from the testString', async () => {
    expect(
      StringFormatter.modifyString(testString, StringFormatter.EFormattingType.RemoveWhitespace)
    ).toBe('ab c de')
  })
})
