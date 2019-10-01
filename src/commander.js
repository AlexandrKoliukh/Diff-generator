import commander from 'commander';
import gendiff from './index';

export default () => {
  commander
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format')
    .action((firstConfig, secondConfig) => {
      const diff = gendiff(firstConfig, secondConfig);
      console.log(diff);
    })
    .parse(process.argv);
};
