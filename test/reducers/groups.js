import test from 'ava'
import groups, { initial } from '../../app/assets/scripts/reducers/groups'
import { toggleOpenGroup, resetState } from '../../app/assets/scripts/actions'

test('group reducer test', t => {
  const open = ['A Group']

  t.deepEqual(groups(undefined, {}), initial,
    'reducer returns initial state when no state is given')

  t.deepEqual(groups({ open }, resetState('groups')), initial,
    'reducer returns to initial state when reset')

  t.is(groups(Object.assign({}, initial, { open }),
    toggleOpenGroup('A Group')).open.length, 0,
    'close an already open group')

  t.is(groups(initial, toggleOpenGroup('A Group')).open[0], 'Socioeconomics',
    'open a closed group')
})
