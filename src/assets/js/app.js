import 'what-input'
import $ from 'jquery'
import './lib/foundation-explicit-pieces'
import { test } from './custom/test'

window.jQuery = $
window.$ = $

$(document).foundation()

test('toto')
