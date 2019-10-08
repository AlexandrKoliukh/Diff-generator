import commander from 'commander';
import gendiff from '.';

export default () => {
  commander
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format')
    .action((firstConfig, secondConfig, argv) => {
      const diff = gendiff(firstConfig, secondConfig, argv.format);
      console.log(diff);
    })
    .parse(process.argv);
};
