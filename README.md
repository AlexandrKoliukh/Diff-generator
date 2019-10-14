<a href="https://codeclimate.com/github/AlexandrKoliukh/project-lvl2-s475/maintainability"><img src="https://api.codeclimate.com/v1/badges/f16b941d1ec06909440f/maintainability" /></a>

<a href="https://codeclimate.com/github/AlexandrKoliukh/project-lvl2-s475/test_coverage"><img src="https://api.codeclimate.com/v1/badges/f16b941d1ec06909440f/test_coverage" /></a>

[![Build Status](https://travis-ci.org/AlexandrKoliukh/project-lvl2-s475.svg?branch=master)](https://travis-ci.org/AlexandrKoliukh/project-lvl2-s475)


File`s formats: json, ini, yml.

Outputs: plain, tree, json.

<h2>Install</h2>

    npm i diff-calculator-kolalexo [-g]

<h2>Usage</h2>

    gendiff [--format plain] before.json after.ini
  
or

    import gendiff from 'diff-calculator-kolalexo';
  
    gendiff(file1, file2);
    
<h2>Example</h2>

<h4>before.json</h4>

    {
      "common": {
        "setting1": "Value 1",
        "setting2": "200",
        "setting3": true,
        "setting6": {
          "key": "value"
        }
      },
      "group1": {
        "baz": "bas",
        "foo": "bar",
        "nest": {
          "key": "value"
        }
      },
      "group2": {
        "abc": "12345"
      }
    }
    
<h4>after.json</h4>

    {
      "common": {
        "follow": false,
        "setting1": "Value 1",
        "setting3": {
          "key": "value"
        },
        "setting4": "blah blah",
        "setting5": {
          "key5": "value5"
        },
        "setting6": {
          "key": "value",
          "ops": "vops"
        }
      },
    
      "group1": {
        "foo": "bar",
        "baz": "bars",
        "nest": "str"
      },
    
      "group3": {
        "fee": "100500"
      }
    }
    
<h4>Output</h4>

Plain format:

    gendiff --format plain before.json after.json
    
    Property 'common.setting2' was removed
    Property 'common.setting3' was updated. From true to [complex value]
    Property 'common.setting6.ops' was added with value: 'vops'
    Property 'common.follow' was added with value: false
    Property 'common.setting4' was added with value: 'blah blah'
    Property 'common.setting5' was added with value: [complex value]
    Property 'group1.baz' was updated. From 'bas' to 'bars'
    Property 'group1.nest' was updated. From [complex value] to 'str'
    Property 'group2' was removed
    Property 'group3' was added with value: [complex value]

Tree like format:

    gendiff before.json after.json
    
    {
       common: {
           setting1: Value 1
          -setting2: 200
          -setting3: true
          +setting3: {
               key: value
           }
           setting6: {
               key: value
              +ops: vops
           }
          +follow: false
          +setting4: blah blah
          +setting5: {
               key5: value5
           }
       }
       group1: {
          -baz: bas
          +baz: bars
           foo: bar
          -nest: {
               key: value
           }
          +nest: str
       }
      -group2: {
           abc: 12345
       }
      +group3: {
           fee: 100500
       }
    }




