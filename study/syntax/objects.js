let f = {
  a: "value",
  b: "key",
  f1: function () {
    console.log(this.a);
  },
  f2: function () {
    console.log(this.b);
  },
};
f.f1();
f.f2();
