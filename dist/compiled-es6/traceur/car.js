"use strict";
var Car = function() {
  function Car(engine) {
    this.engine = engine;
  }
  return ($traceurRuntime.createClass)(Car, {}, {});
}();
