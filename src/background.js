import { onInstalled } from './background/on-installed.js';
onInstalled();

import { onAlarm } from './background/on-alarm.js';
onAlarm();

import { activateMonetizing } from './background/activate-monetizing.js';
activateMonetizing();

import { deactivateMonetizing } from './background/deactivate-monetizing.js';
deactivateMonetizing();

import { recognizeOtherAffiliates } from './background/recognize-other-affiliates.js';
recognizeOtherAffiliates();