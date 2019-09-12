import commander from 'commander';

export default () => {
  commander
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .action(() => {
      console.log(commander.on('--help'))
    })
    .parse(process.argv);
};
