export class StringFormatter {
  public static EFormattingType = {
    RemoveWhitespace: 1 << 0,
    RemoveSQL: 1 << 1,
    ToLower: 1 << 2
  }
  public static modifyString(str: string, formattingFlags: number): string {
    if (str == '') return str

    let formattedStr: string = str
    if (formattingFlags & this.EFormattingType.RemoveWhitespace) {
      formattedStr = this.removeWhitespace(formattedStr)
    }
    if (formattingFlags & this.EFormattingType.RemoveSQL) {
      formattedStr = this.removeSQL(formattedStr)
    }
    if (formattingFlags & this.EFormattingType.ToLower) {
      formattedStr = formattedStr.toLowerCase()
    }
    return formattedStr
  }

  private static removeWhitespace(str: string): string {
    return str.trim().replace(/\s+/g, ' ')
  }

  private static removeSQL(str: string): string {
    // TODO
    // There might be a dependency just for this...
    const sqlKeywords = [
      'SELECT',
      'INSERT',
      'UPDATE',
      'DELETE',
      'DROP',
      'WHERE',
      'FROM',
      'INTO',
      'VALUES',
      'JOIN',
      'ALTER',
      'TABLE',
      'DATABASE'
    ]

    const regex = new RegExp(`\\b(${sqlKeywords.join('|')})\\b`, 'gi')
    return str.replace(regex, '')
  }
}
