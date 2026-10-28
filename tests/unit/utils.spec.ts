/*
 * @adonisjs/mail
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { normalizeRecipients } from '../../src/utils.ts'

test.group('Utils normalizeRecipients', () => {
  test('return empty array when recipients is undefined', ({ assert }) => {
    assert.deepEqual(normalizeRecipients(undefined), [])
  })

  test('normalize a single string recipient', ({ assert }) => {
    assert.deepEqual(normalizeRecipients('user@example.com'), ['user@example.com'])
  })

  test('normalize a single object recipient', ({ assert }) => {
    const recipient = { name: 'User', address: 'user@example.com' }
    assert.deepEqual(normalizeRecipients(recipient), [recipient])
  })

  test('normalize a flat array of recipients', ({ assert }) => {
    const recipients = ['user1@example.com', { name: 'User 2', address: 'user2@example.com' }]
    assert.deepEqual(normalizeRecipients(recipients), recipients)
  })

  test('recursively flatten nested arrays while preserving order', ({ assert }) => {
    const input = ['a@example.com', ['b@example.com', 'c@example.com'], 'd@example.com']

    assert.deepEqual(normalizeRecipients(input), [
      'a@example.com',
      'b@example.com',
      'c@example.com',
      'd@example.com',
    ])
  })

  test('recursively flatten nested arrays of recipients', ({ assert }) => {
    const input = [['user1@example.com', 'user2@example.com'], ['user3@example.com']]

    assert.deepEqual(normalizeRecipients(input), [
      'user1@example.com',
      'user2@example.com',
      'user3@example.com',
    ])
  })

  test('recursively flatten deeply nested mixed arrays', ({ assert }) => {
    const addressObj = { name: 'Deep User', address: 'deep@example.com' }
    const input = ['user1@example.com', [['user2@example.com'], [[addressObj]]]]

    assert.deepEqual(normalizeRecipients(input), [
      'user1@example.com',
      'user2@example.com',
      addressObj,
    ])
  })

  test('filter out empty and falsy elements within nested arrays', ({ assert }) => {
    const input = ['user1@example.com', ['', null as any, undefined as any], ['user2@example.com']]

    assert.deepEqual(normalizeRecipients(input), ['user1@example.com', 'user2@example.com'])
  })
})
