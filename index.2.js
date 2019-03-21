var cmd = require('node-cmd');

// cmd.get(
//   'ipconfig',
//   function (err, data, stderr) {
//     if (!err) {
//       console.log('data', data)
//     } else {
//       console.log('error', err)
//     }
//   }
// );
cmd.get(
  'C:\\Users\\FanWang\\Desktop\\dataSource.exe',
  function (err, data, stderr) {
    if (!err) {
      console.log('data', data)
    } else {
      console.log('error', err)
    }
  }
);
cmd.run('touch example.created.file');