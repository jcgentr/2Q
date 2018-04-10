var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parse } from 'parse';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DataProvider = /** @class */ (function () {
    function DataProvider(http) {
        this.http = http;
        this.parseAppId = 'NpH5AmRvNkoQuZBOS5EE3BB0LfXotZPOJ5PXQLye';
        this.parseJSKey = 'WXlviqIK07kp9khmfyNYLoxpDM0DsKuFYIKdEbXv';
        this.parseServerUrl = 'https://parseapi.back4app.com/';
        this.items = [];
        console.log('Hello DataProvider Provider');
        Parse.initialize(this.parseAppId, this.parseJSKey);
        Parse.serverURL = this.parseServerUrl;
        console.log('Initiated Parse');
        var Questions = Parse.Object.extend('Questions');
        var query = new Parse.Query(Questions);
        query.limit(1000);
        query.find().then(function (questions) {
            // resolve(menus);
            console.log(questions.length);
        }, function (error) {
            //reject(error);
            console.log("error");
        });
        // subscribe to my query
        var client = new Parse.LiveQueryClient({
            applicationId: 'NpH5AmRvNkoQuZBOS5EE3BB0LfXotZPOJ5PXQLye',
            serverURL: 'wss://' + 'livedatingapp.back4app.io',
            javascriptKey: 'WXlviqIK07kp9khmfyNYLoxpDM0DsKuFYIKdEbXv',
            masterKey: 'SQ99SHS01n5NNX0XztCkr3zbGFFNzpzUFAwr0h8x'
        });
        client.open();
    }
    DataProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], DataProvider);
    return DataProvider;
}());
export { DataProvider };
//# sourceMappingURL=data.js.map