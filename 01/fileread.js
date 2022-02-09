var fs= require('fs');
fs.readFile('sample.txt', 'uft8',function(err, data){
  console.log(data);
});
