let roles = {
  programmer: "egoing",
  designer: "abc",
  manager: "kkk",
};
for (let name in roles) {
  console.log("object=>", name, "value => ", roles[name]);
}

var f = function () {
  console.log("function");
};
var a = [f];
a[0]();
var b = {
  func: f,
};
b.func();
