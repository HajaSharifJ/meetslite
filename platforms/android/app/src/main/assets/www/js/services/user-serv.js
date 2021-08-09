'use strict';
angular.module('main')
  .service('User', function () {

    console.log('Hello from your Service: User in module main');

    var user = {
      username: 'deshatom',
      name: 'Desh Atom',
      email: 'deshatom@gmail.com',
      avatar: 'img/images/profile-pic.jpg',
      github: 'https://github.com/deshatom',
      ionic: 'http://market.ionic.io/user/305270',
      description: 'Hi, I am a Software Engineer. I love to develop mobile ' +
        'applications. UI/UX makes my life beautiful',
    };

    this.currentUser = function () {
      return user;
    };

    this.getAll = function () {
      return [{
        name: 'Desh Atom',
        email: 'deshatom@gmail.com',
        image: 'img/images/profile-pic.jpg',
      }, {
        name: 'Kasun perera',
        email: 'kasun@gmail.com',
        image: 'img/images/avatar2.png',
      }, {
        name: 'Virant Ageno',
        email: 'deshatom@gmail.com',
        image: 'img/images/avatar3.png',
      }, {
        name: 'Michal Angelo',
        email: 'deshatom@gmail.com',
        image: 'img/images/avatar1.png',
      }, {
        name: 'Briyan Vandof',
        email: 'deshatom@gmail.com',
        image: 'img/images/avatar2.png',
      }];
    };

  });
