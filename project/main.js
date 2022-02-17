//사용자가 main과 같은위치에 있는 폴더중 하나를 분류하려고 할때.. 라고 가정
let fs = require("fs");
let args = process.argv;
let dirname = args[2];
console.log(dirname);

fs.readdir(dirname, function (err, list) {
  let i = 0;
  while (i < list.length) {
    let filename = list[i];
    i += 1;
    let target = filename.split(".");
    let name = target[0];
    let extension = target[1];
    let ival = name.indexOf("_E");
    if (ival != -1) {
      console.log("has been modified");
      let newdir = "edited";
      if (!fs.existsSync(`${dirname}/${newdir}`)) {
        fs.mkdirSync(`${dirname}/${newdir}`);
      }

      fs.rename(
        `${dirname}/${filename}`,
        `${dirname}/${newdir}/${filename}`,
        function (err) {}
      );
    } else {
      console.log("not modified !");
      if (extension == "mp4" || extension == "mov") {
        let newdir = "video";
        if (!fs.existsSync(`${dirname}/${newdir}`)) {
          console.log("pass");
          fs.mkdirSync(`${dirname}/${newdir}`);
        }
        console.log("pass2");
        fs.rename(
          `${dirname}/${filename}`,
          `${dirname}/${newdir}/${filename}`,
          function (err) {}
        );
      } else if (extension == "jpg") {
        let newdir = "photo";
        if (!fs.existsSync(`${dirname}/${newdir}`)) {
          fs.mkdirSync(`${dirname}/${newdir}`);
        }
        fs.rename(
          `${dirname}/${filename}`,
          `${dirname}/${newdir}/${filename}`,
          function (err) {}
        );
      } else if (extension == "png" || extension == "aae") {
        let newdir = "captured";
        if (!fs.existsSync(`${dirname}/${newdir}`)) {
          fs.mkdirSync(`${dirname}/${newdir}`);
        }
        fs.rename(
          `${dirname}/${filename}`,
          `${dirname}/${newdir}/${filename}`,
          function (err) {}
        );
      }
    }
  }
});
//
