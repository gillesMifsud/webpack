import whatInput from 'what-input';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
//import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';

$(document).foundation();

import {test} from './custom/test';
let value = test('toto');