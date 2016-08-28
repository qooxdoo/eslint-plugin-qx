/**
 * @fileoverview Prevent references within members property initialization
 * @author rsternagel
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-illegal-private-usage"),
    RuleTester = require("../../../../eslint/lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-illegal-private-usage", rule, {

  valid: [
    {
      code: 'qx.Bootstrap.define("qx.foo.Bar", { members: { __known: null, foo: function(){ this.__known = true; } } });'
    },
    {
      code: 'qx.Bootstrap.define("qx.foo.Bar", { members: { __known: null, foo: function(){ qx.foo.Bar.__known = true; } } });'
    },
    {
      code: 'qx.Bootstrap.define("qx.foo.Bar", { constructor: function(){ this.__known = true }, members: { __known: null } });'
    },
  ],

  invalid: [
    {
      code: 'qx.Bootstrap.define("qx.foo.Bar", { members: { foo: function(){ this.__notDeclared = false } } });',
      errors: [ { message: "Do not use private \'__notDeclared\' of foreign class" } ]
    },
    {
      code: 'qx.Bootstrap.define("qx.foo.Bar", { members: { foo: function(){ Foo.__notDeclared = false } } });',
      errors: [ { message: "Do not use private \'__notDeclared\' of foreign class" } ]
    },
    {
      code: 'qx.Bootstrap.define("qx.foo.Bar", { members: { foo: function(){ qx.foo.Bar.__notDeclared = false } } });',
      errors: [ { message: "Do not use private \'__notDeclared\' of foreign class" } ]
    }
  ]

});
