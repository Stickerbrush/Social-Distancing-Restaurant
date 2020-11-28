const express = require('express');
const DBClass = require("./DBClass");

let DBClassInstance = DBClass.getInstance();
DBClassInstance.connect();
DBClassInstance.monitor();
