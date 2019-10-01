import commander from 'commander';



export default () => {
  commander
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format')
    .action((firstConfig, secondConfig) => {
      console.log(firstConfig);
      console.log(secondConfig);
    })
    .parse(process.argv);
};
