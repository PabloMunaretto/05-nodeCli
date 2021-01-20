let commands = require('./commands');

function done (result){
  process.stdout.write(result + "\n")
  process.stdout.write('\nprompt > ');
}

process.stdout.write('prompt > ');
process.stdin.on('data', function (data) {
  let params = data.toString().trim().split(" ");
  let cmd = params[0];
  let args = params.slice(1);
  commands[cmd](args, done)
  //process.stdout.write('\nprompt > ');
})