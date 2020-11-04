const express = require('express');
const modeloEmpleado = require('./modeloEmpleado');
const modeloCliente = require('./modeloCliente');
const DBClass = require("./DBClass.js");

let DBClassInstance = DBClass.getInstance();
DBClassInstance.connect();
DBClassInstance.monitor();
