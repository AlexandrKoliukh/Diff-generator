<a href="https://codeclimate.com/github/AlexandrKoliukh/project-lvl2-s475/maintainability"><img src="https://api.codeclimate.com/v1/badges/f16b941d1ec06909440f/maintainability" /></a>

<a href="https://codeclimate.com/github/AlexandrKoliukh/project-lvl2-s475/test_coverage"><img src="https://api.codeclimate.com/v1/badges/f16b941d1ec06909440f/test_coverage" /></a>

[![Build Status](https://travis-ci.org/AlexandrKoliukh/project-lvl2-s475.svg?branch=master)](https://travis-ci.org/AlexandrKoliukh/project-lvl2-s475)

Вычислитель отличий показывает изменения в файлах конфигурации. Поддерживаемые форматы: json, ini, yml.
Вывод: plain, tree, json.

<h2>Install</h2>

  npm i diff-calculator-kolalexo [-g]

<h2>Usage</h2>

  gendiff [--format plain] before.json after.ini
  
  import gendiff from 'diff-calculator-kolalexo';
  
  gendiff(file1, file2);
