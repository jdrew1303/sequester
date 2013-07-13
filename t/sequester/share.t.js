#!/usr/bin/env node

require('proof')(4, function (equal) {
    var Sequester = require('../..')

    var order = 0
    var sequester = new Sequester
    sequester.share(function () {
        equal(order++, 0, 'first shared')
    })
    sequester.share(function () {
        sequester.exclude(function () {
            equal(order++, 2, 'exclusive')
        })
        equal(order++, 1, 'second shared')
        sequester.unlock()
        sequester.unlock()
        sequester.share(function () {
            equal(order++, 3, 'third shared')
        })
        sequester.unlock()
    })
})