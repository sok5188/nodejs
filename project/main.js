let fs = require("fs");
let args = process.argv;
let dirname = args[2];

// modified process
// 마지막 언더바 뒤에 E가 추가된다고 가정.
//refactoring not yet.

fs.readdir(dirname, function (err, list) {
  if (err) console.log("cannot read directory");
  function is_modified(filename) {
    let tmp_file = filename.split("_");

    let tmp_size = tmp_file.length;

    let target = tmp_file[tmp_size - 1].charAt(0);
    let i = 0;
    if (target == "E") {
      //maybe modified
      tmp_file[tmp_size - 1] = tmp_file[tmp_size - 1].replace("E", "");

      let sub = tmp_file[0];

      if (tmp_size > 1) {
        for (let j = 1; j < tmp_size; j++) {
          sub += "_" + tmp_file[j];
        }
      }

      while (i < list.length) {
        let compare_sub = list[i];
        i += 1;

        if (compare_sub == sub) {
          //modified!
          return true;
        }
      }
    }

    return false;
  }
  let i = 0;
  while (i < list.length) {
    let filename = list[i];
    i += 1;
    let target = filename.split(".");
    let name = target[0];
    let extension = target[1];
    let ival = name.indexOf("_E");
    if (ival != -1) {
      if (is_modified(filename)) {
        let newdir = "edited";
        if (!fs.existsSync(`${dirname}/${newdir}`)) {
          fs.mkdirSync(`${dirname}/${newdir}`);
        }
        fs.renameSync(
          `${dirname}/${filename}`,
          `${dirname}/${newdir}/${filename}`
        );
        continue;
      }
    }

    if (extension == "mp4" || extension == "mov") {
      let newdir = "video";
      if (!fs.existsSync(`${dirname}/${newdir}`)) {
        fs.mkdirSync(`${dirname}/${newdir}`);
      }

      fs.renameSync(
        `${dirname}/${filename}`,
        `${dirname}/${newdir}/${filename}`
      );
    } else if (extension == "jpg") {
      let newdir = "photo";
      if (!fs.existsSync(`${dirname}/${newdir}`)) {
        fs.mkdirSync(`${dirname}/${newdir}`);
      }
      fs.renameSync(
        `${dirname}/${filename}`,
        `${dirname}/${newdir}/${filename}`
      );
    } else if (extension == "png" || extension == "aae") {
      let newdir = "captured";
      if (!fs.existsSync(`${dirname}/${newdir}`)) {
        fs.mkdirSync(`${dirname}/${newdir}`);
      }
      fs.renameSync(
        `${dirname}/${filename}`,
        `${dirname}/${newdir}/${filename}`
      );
    }
  }
});
