/*
 *           ___         ___           ___
 *          /\  \       /\  \         /\  \          ___
 *          \:\  \     /::\  \       /::\  \        /\  \
 *      ___ /::\__\   /:/\:\  \     /:/\:\  \       \:\  \
 *     /\  /:/\/__/  /::\~\:\  \   /:/  \:\__\      /::\__\
 *     \:\/:/  /    /:/\:\ \:\__\ /:/__/ \:|__|  __/:/\/__/
 *      \::/  /     \/__\:\ \/__/ \:\  \ /:/  / /\/:/  /
 *       \/__/           \:\__\    \:\  /:/  /  \::/__/
 *                        \/__/     \:\/:/  /    \:\__\
 *                                   \::/__/      \/__/
 */

'use strict';

/*jshint maxlen:180*/

var vows = require('vows');
var assert = require('assert');
var sinon = require('sinon');
var fs = require('fs');
var program = require('commander');

var JFDI = require('../lib/JFDI');
var runtime = require('../lib/runtime');
var command = require('../lib/command');

// To prevent overwriting data/.root.
sinon.stub(fs, 'writeFileSync');

// To prevent "resource not found " errors.
sinon.stub(fs, 'readFileSync', function(path) {
    return path;
});

// To prevent corrupting real data.
JFDI.setDataRoot('');

function resetProgramState() {
    delete program.add;
    delete program.find;
    delete program.defer;
    delete program.expedite;
    delete program.prioritize;
    delete program['do'];
}

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -h').addBatch(dummyBatch).export(module);
// vows.describe('jfdi --help').addBatch(dummyBatch).export(module);
// vows.describe('jfdi -V').addBatch(dummyBatch).export(module);
// vows.describe('jfdi --version').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// Global teardown.
fs.writeFileSync.restore();
fs.readFileSync.restore();

