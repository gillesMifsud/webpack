import whatInput from 'what-input';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import './lib/foundation-explicit-pieces';

$(document).foundation();

import {test} from './custom/test';
let value = test('toto');