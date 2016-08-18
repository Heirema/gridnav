/*
  Gridnav - a way to navigate lists with a keyboard in a
  2D fashion instea of item-by-item
  Copyright (c) 2016 Christian Heilmann
  Licensed under the MIT license:
  http://www.opensource.org/licenses/mit-license.php
  Version:  1.0.0
*/

var Gridnav = function (listelement) {
  var that = this;
  this.list = document.querySelector(listelement);

  if (!this.list) {
    throw Error('List item could not be found');
  }
  this.setcodes = function (amount) {
    that.codes = {
      39:1, 68:1,
      65:-1, 37:-1,
      87:-that.amount, 38:-that.amount,
      83: that.amount, 40:that.amount
    };
  }
  this.getamount = function () {
    that.amount = Math.floor(
      that.list.offsetWidth / that.list.firstElementChild.offsetWidth
    );
    that.setcodes(that.amount);
  }
  if (!this.list.getAttribute('data-element')) {
    this.element = this.list.firstElementChild.firstElementChild.tagName;
  } else {
    this.element = this.list.getAttribute('data-element').toUpperCase();
  }
  if (!this.list.getAttribute('data-amount')) {
    this.getamount();
    window.addEventListener('resize', that.getamount);
  } else {
    this.amount = +this.list.getAttribute('data-amount');
  }
  this.setcodes(this.amount);
  this.all = this.list.querySelectorAll(this.element);
  this.keynav = function(ev) {
    var t = ev.target;
    if (t.tagName === that.element) {
      for (var i = 0; i < that.all.length; i++) {
        if (that.all[i] === t) {
          c = i;
          break;
        }
      }
      if (that.codes[ev.keyCode]) {
        if (that.all[c + that.codes[ev.keyCode]]) {
          that.all[c + that.codes[ev.keyCode]].focus();
        }
      }
    }
  }
  this.list.addEventListener('keypress', this.keynav);
};