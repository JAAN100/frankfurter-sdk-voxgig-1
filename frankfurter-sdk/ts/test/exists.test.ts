
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FrankfurterSdkSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FrankfurterSdkSDK.test()
    equal(testsdk instanceof FrankfurterSdkSDK, true,
      'FrankfurterSdkSDK.test() must return a client synchronously')
  })

})
