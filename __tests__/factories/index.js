const { factory } = require('factory-girl')
const {
  FileType,
  Lead,
  LeadFile,
  PushSend,
  User,
  Cnae,
  LeadCnae,
} = require('@/models')

const FakeFileType = require('~/factories/fakes/FakeFileType')
const FakeLead = require('~/factories/fakes/FakeLead')
const FakeLeadFile = require('~/factories/fakes/FakeLeadFile')
const FakePushSend = require('~/factories/fakes/FakePushSend')
const FakeUser = require('~/factories/fakes/FakeUser')
const FakeCnae = require('~/factories/fakes/FakeCnae')
const FakeLeadCnae = require('~/factories/fakes/FakeLeadCnae')

factory.define('FileType', FileType, FakeFileType)
factory.define('Lead', Lead, FakeLead)
factory.define('LeadFile', LeadFile, FakeLeadFile)
factory.define('PushSend', PushSend, FakePushSend)
factory.define('User', User, FakeUser)
factory.define('Cnae', Cnae, FakeCnae)
factory.define('LeadCnae', LeadCnae, FakeLeadCnae)

module.exports = factory
