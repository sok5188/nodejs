function slowfunc(callback) {
  console.log("tmp");
  callback();
  console.log("C");
}
slowfunc(a);
function a() {
  console.log("A");
}
a();
var b = function () {
  console.log("B");
};

b();
