'use strict';

/*           ___         ___           ___
 *          /\  \       /\  \         /\  \          ___
 *          \:\  \     /::\  \       /::\  \        /\  \
 *      ___ /::\__\   /:/\:\  \     /:/\:\  \       \:\  \
 *     /\  /:/\/__/  /::\~\:\  \   /:/  \:\__\      /::\__\
 *     \:\/:/  /    /:/\:\ \:\__\ /:/__/ \:|__|  __/:/\/__/
 *      \::/  /     \/__\:\ \/__/ \:\  \ /:/  / /\/:/  /
 *       \/__/           \:\__\    \:\  /:/  /  \::/__/
 *                        \/__/     \:\/:/  /    \:\__\
 *                                   \::/__/      \/__/
 *
 *              https:/github.com/v0lkan/JFDI
 *
 * This program is distributed under the terms of the MIT license.
 * Please see the LICENSE.md file for details.
 */

/*jshint maxlen:180*/

var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    fs = require('fs'),
    program = require('commander');

var JFDI = require('../lib/JFDI'),
    runtime = require('../lib/runtime'),
    command = require('../lib/command'),
    helper = require('./helper');

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -e 0').addBatch({
    'Parsing>>>': {
        'when "jfdi -e 0" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-e' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -e 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -e 0" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleExpedite');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                runtime.execute();

                expectation = command.privates.handleExpedite.calledOnce;

                // Teardown.
                helper.teardown(function() {command.privates.handleExpedite.restore();});

                return expectation;
            },
            'it should expedite the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -e 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi -e 0 today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-e' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -e 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -e 0 today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleExpediteIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                runtime.execute();

                expectation = command.privates.handleExpediteIncorrectRealm.calledOnce;

                // Teardown.
                helper.teardown(function() {command.privates.handleExpediteIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --expedite 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --expedite 0 today" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--expedite' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -e 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --expedite 0 today" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleExpediteIncorrectRealm');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                runtime.execute();

                expectation = command.privates.handleExpediteIncorrectRealm.calledOnce;

                // Teardown.
                helper.teardown(function() {command.privates.handleExpediteIncorrectRealm.restore();});

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -e 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -e 0 tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-e' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi -e 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -e 0 tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleExpedite');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                runtime.execute();

                expectation = command.privates.handleExpedite.calledOnce;

                // Teardown.
                helper.teardown(function() {command.privates.handleExpedite.restore();});

                return expectation;
            },
            'it should expedite the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --expedite 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --expedite 0 tomorrow" is called': {
            topic: function() {
                var args, expectation;

                helper.setup();

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--expedite' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                helper.teardown();

                return expectation;
            },
            'it should translate to "jfdi --expedite 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --expedite 0 tomorrow" is called': {
            topic: function() {
                var expectation;

                helper.setup(function() {sinon.stub(command.privates, 'handleExpedite');});

                // Create the command.
                process.argv = helper.getArgv(this);

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleExpedite.calledOnce;

                helper.teardown(function() {command.privates.handleExpedite.restore();});

                return expectation;
            },
            'it should expedite the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);
