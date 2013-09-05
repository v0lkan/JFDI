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
var prompt = require('prompt');
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

vows.describe('jfdi.sanitize').addBatch({
    'when ./data/.root is empty': {
        topic: function() {
            var result, expectation;

            // So that we won't update the real .root file.
            sinon.stub(prompt, 'start');
            sinon.stub(prompt, 'get');

            result = JFDI.sanitize();

            expectation = !result && prompt.start.calledOnce;

            return expectation;
        },
        'user should be prompted': function(expectation) {
            assert.equal(expectation, true);
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo').addBatch({
    'Parsing>>>': {
        'when "jfdi foo" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', 'foo'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --add foo today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi foo" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', 'foo'];

                runtime.initialize();

                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo bar').addBatch({
    'Parsing>>>': {
        'when "jfdi foo bar" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi foo bar" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo bar baz').addBatch({
    'Parsing>>>': {
        'when "jfdi foo bar baz" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar', 'baz'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar baz' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar baz\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi foo bar" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar', 'baz'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -a foo').addBatch({
    'Parsing>>>': {
        'when "jfdi -a foo" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-a', 'foo'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-a' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -a \'foo\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -a foo" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', '-a', 'foo'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --add foo').addBatch({
    'Parsing>>>': {
        'when "jfdi --add foo" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--add', 'foo'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -add foo" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', '--add', 'foo'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo today').addBatch({
    'Parsing>>>': {
        'when "jfdi foo today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', 'foo', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi foo today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', 'foo', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo bar today').addBatch({
    'Parsing>>>': {
        'when "jfdi foo bar today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi foo today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo bar baz today').addBatch({
    'Parsing>>>': {
        'when "jfdi foo bar baz today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar', 'baz', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar baz' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar baz\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi foo today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', 'foo', 'bar', 'baz', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -a foo today').addBatch({
    'Parsing>>>': {
        'when "jfdi -a foo today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-a', 'foo', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-a' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -a \'foo\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -a foo today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', '-a', 'foo', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -a foo bar today').addBatch({
    'Parsing>>>': {
        'when "jfdi -a foo bar today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-a', 'foo', 'bar', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-a' &&
                    args[3] === 'foo bar' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -a \'foo bar\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -a foo bar today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', '-a', 'foo', 'bar', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -a foo bar baz today').addBatch({
    'Parsing>>>': {
        'when "jfdi -a foo bar baz today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-a', 'foo', 'bar', 'baz', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-a' &&
                    args[3] === 'foo bar baz' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -a \'foo bar baz\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -a foo bar baz today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', '-a', 'foo', 'bar', 'baz', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --add foo today').addBatch({
    'Parsing>>>': {
        'when "jfdi --add foo today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--add', 'foo', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --add foo today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', '--add', 'foo', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --add foo bar today').addBatch({
    'Parsing>>>': {
        'when "jfdi --add foo bar today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--add', 'foo', 'bar', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --add foo bar today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', '--add', 'foo', 'bar', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --add foo bar bz today').addBatch({
    'Parsing>>>': {
        'when "jfdi --add foo bar baz today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--add', 'foo', 'bar', 'baz','today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo bar baz' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo bar baz\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --add foo bar baz today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command, 'handleToday');

                // Create the command.
                process.argv = ['node', '.', '--add', 'foo', 'bar', 'baz', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.handleToday.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.handleToday.restore();
                resetProgramState();

                return expectation;
            },
            'it should add a new task to today': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi foo tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', 'foo', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo\' tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi foo tomorrow" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                // TODO: rename handleAdditionWrongRealm
                sinon.stub(command.privates, 'handleAdditionIncorrectRealm');

                // Create the command.
                process.argv = ['node', '.', 'foo', 'tomorrow'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAdditionIncorrectRealm.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleAdditionIncorrectRealm.restore();
                resetProgramState();

                return expectation;
            },
            'it should warn user about the incorrect behavior': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -a foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -a foo tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-a', 'foo', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-a' &&
                    args[3] === 'foo' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -a \'foo\' tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -a foo tomorrow" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleAdditionIncorrectRealm');

                // Create the command.
                process.argv = ['node', '.', '-a', 'foo', 'tomorrow'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAdditionIncorrectRealm.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleAdditionIncorrectRealm.restore();
                resetProgramState();

                return expectation;
            },
            'it should warn user about the incorrect behavior': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --add foo tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --add foo tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--add', 'foo', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--add' &&
                    args[3] === 'foo' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --add \'foo\' tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --add foo tomorrow" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleAdditionIncorrectRealm');

                // Create the command.
                process.argv = ['node', '.', '--add', 'foo', 'tomorrow'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleAdditionIncorrectRealm.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleAdditionIncorrectRealm.restore();
                resetProgramState();

                return expectation;
            },
            'it should warn user about the incorrect behavior': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi 0').addBatch({
    'Parsing>>>': {
        'when "jfdi 0" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '0'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi 0" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '0'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi 0 tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '0', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi 0 tomorrow" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleCompleteIncorrectRealm');

                // Create the command.
                process.argv = ['node', '.', '0', 'tomorrow'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleCompleteIncorrectRealm.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleCompleteIncorrectRealm.restore();
                resetProgramState();

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -x 0').addBatch({
    'Parsing>>>': {
        'when "jfdi -x 0" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-x', '0'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-x' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -x 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -x 0" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '-x', '0'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -x 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi -x 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-x', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-x' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -x 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -x 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '-x', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -x 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -x 0 tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-x', '0', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-x' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -x 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -x 0 tomorrow" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleCompleteIncorrectRealm');

                // Create the command.
                process.argv = ['node', '.', '-x', '0', 'tomorrow'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleCompleteIncorrectRealm.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleCompleteIncorrectRealm.restore();
                resetProgramState();

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --do 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 tomorrow"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 tomorrow" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleCompleteIncorrectRealm');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'tomorrow'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleCompleteIncorrectRealm.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleCompleteIncorrectRealm.restore();
                resetProgramState();

                return expectation;
            },
            'it should warn the user': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -d 0').addBatch({
    'Parsing>>>': {
        'when "jfdi -d 0" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-d', '0'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-d' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -d 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -d 0" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleDefer');

                // Create the command.
                process.argv = ['node', '.', '-d', '0'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefer.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleDefer.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi -d 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-d', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-d' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -d 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -d 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleDefer');

                // Create the command.
                process.argv = ['node', '.', '-d', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefer.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleDefer.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -d 0 tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --defer 0').addBatch(dummyBatch).export(module);
vows.describe('jfdi --defer 0').addBatch({
    'Parsing>>>': {
        'when "jfdi --defer 0" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--defer', '0'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--defer' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --defer 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --defer 0" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleDefer');

                // Create the command.
                process.argv = ['node', '.', '--defer', '0'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefer.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleDefer.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --defer 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --defer 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--defer', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--defer' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --defer 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --defer 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleDefer');

                // Create the command.
                process.argv = ['node', '.', '--defer', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleDefer.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleDefer.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --defer 0 tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -e 0').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -e 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -e 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi -e 0 tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-e', '0', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-e' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

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
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleExpedite');

                // Create the command.
                process.argv = ['node', '.', '-e', '0', 'tomorrow'];

                runtime.initialize();

                runtime.execute();

                expectation = command.privates.handleExpedite.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleExpedite.restore();
                resetProgramState();

                return expectation;
            },
            'it should expedite the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --expedite 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --expedite 0 tomorrow').addBatch({
    'Parsing>>>': {
        'when "jfdi --expedite 0 tomorrow" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--expedite', '0', 'tomorrow'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--expedite' &&
                    args[3] === '0' &&
                    args[4] === 'tomorrow' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

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
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleExpedite');

                // Create the command.
                process.argv = ['node', '.', '--expedite', '0', 'tomorrow'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleExpedite.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleExpedite.restore();
                resetProgramState();

                return expectation;
            },
            'it should expedite the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -f lorem').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -f lorem today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -f lorem" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -f lorem ipsum').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem ipsum" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -f \'lorem ipsum\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -f lorem ipsum" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi -f lorem ipsum dolor').addBatch({
    'Parsing>>>': {
        'when "jfdi -f lorem ipsum dolor" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum', 'dolor'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '-f' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi -f \'lorem ipsum dolor\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi -f lorem ipsum dolor" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '-f', 'lorem', 'ipsum', 'dolor'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --find lorem').addBatch({
    'Parsing>>>': {
        'when "jfdi --find lorem" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --find \'lorem\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --find lorem" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --find lorem ipsum').addBatch({
    'Parsing>>>': {
        'when "jfdi --find lorem ipsum" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --find \'lorem ipsum\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --find lorem ipsum" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

vows.describe('jfdi --find lorem ipsum dolor').addBatch({
    'Parsing>>>': {
        'when "jfdi --find lorem ipsum" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum', 'dolor'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--find' &&
                    args[3] === 'lorem ipsum dolor' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --find \'lorem ipsum dolor\' today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --find lorem ipsum dolor" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleQuery');

                // Create the command.
                process.argv = ['node', '.', '--find', 'lorem', 'ipsum', 'dolor'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleQuery.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleQuery.restore();
                resetProgramState();

                return expectation;
            },
            'it should do a search': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem ipsum today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem ipsum dolor today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem ipsum today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem ipsum dolor today').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem ipsum tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f lorem ipsum dolor tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem ipsum tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find lorem ipsum dolor tomorrow').addBatch(dummyBatch).export(module);
vows.describe('jfdi --do 0 today').addBatch({
    'Parsing>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, args, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();

                args = process.argv;

                expectation = args[2] === '--do' &&
                    args[3] === '0' &&
                    args[4] === 'today' &&
                    args.length === 5;

                // Teardown.
                process.argv = oldArgs;
                resetProgramState();

                return expectation;
            },
            'it should translate to "jfdi --do 0 today"': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    },
    'Execution>>>': {
        'when "jfdi --do 0 today" is called': {
            topic: function() {
                var oldArgs, expectation;

                // Setup.
                resetProgramState();
                oldArgs = process.argv;
                sinon.stub(command.privates, 'handleComplete');

                // Create the command.
                process.argv = ['node', '.', '--do', '0', 'today'];

                runtime.initialize();
                runtime.execute();

                expectation = command.privates.handleComplete.calledOnce;

                // Teardown.
                process.argv = oldArgs;
                command.privates.handleComplete.restore();
                resetProgramState();

                return expectation;
            },
            'it should complete the item': function(expectation) {
                assert.equal(expectation, true);
            }
        }
    }
}).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -p 0').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -p 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -p 0 tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prioritize 0').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prioritize 0 today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --prioritize 0 tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -t').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -t today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --tomorrow today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -t tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --tomorrow tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// jfdi -l

/*----------------------------------------------------------------------------*/

// jfdi --list

/*----------------------------------------------------------------------------*/

// jfdi -l today

/*----------------------------------------------------------------------------*/

// jfdi --list today

/*----------------------------------------------------------------------------*/

// jfdi -l tomorrow

/*----------------------------------------------------------------------------*/

// jfdi --list tomorrow

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -bogus').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --bogus').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -h').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --help').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -V').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --version').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -a').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --add').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -a today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -a tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --add today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --add tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -f tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi --find tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -p').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -prioritize').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -p today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -prioritize today').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -p tomorrow').addBatch(dummyBatch).export(module);

/*----------------------------------------------------------------------------*/

// vows.describe('jfdi -prioritize tomorrow').addBatch(dummyBatch).export(module);



