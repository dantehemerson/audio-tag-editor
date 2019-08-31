const { isValidFile } = require('../lib/utils')

describe('Validate File (just validate about extension)', () => {
  it('Should return false for undefined file.', () => {
    expect(isValidFile(undefined)).toBe(false)
  })

  it('Should return false for emtpy file.', () => {
    expect(isValidFile({})).toBe(false)
  })

  it('Should return false for invalidFile for non exiting extension', () => {
    const correctFile = {
      name: 'filename.mp3',
      type: 'audio/mp3'
    }
    expect(isValidFile(correctFile)).toBe(true)
  })

  it('Should return false for invalid extension and correct type', () => {
    const correctFile = {
      name: 'filename',
      type: 'audio/mp3'
    }
    expect(isValidFile(correctFile)).toBe(false)
  })

  it('Should return false for invalid type and correct extension', () => {
    const correctFile = {
      name: 'filename.mp3',
      type: 'audi'
    }
    expect(isValidFile(correctFile)).toBe(false)
  })
})
