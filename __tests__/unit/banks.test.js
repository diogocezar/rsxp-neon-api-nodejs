const factory = require('../factories')
const truncate = require('../helpers/TruncateHelper')

describe('Banks', () => {
  let defaultBank
  beforeEach(async () => {
    await truncate()

    defaultBank = await factory.create('Bank')
  })

  it('should get all banks', async () => {
  })
})
