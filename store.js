(function (window) {
  'use strict';


  /**
   *
   *
   *
   */
  function Store() {
    this._storageLocation = 'active-showcase'

    if(!localStorage.getItem(this._storageLocation)) {
      var event = null;

      localStorage.setItem(this._storageLocation, JSON.stringify(event));
    }

    return (this, JSON.parse(localStorage.getItem(this._storageLocation)));
  }
});
