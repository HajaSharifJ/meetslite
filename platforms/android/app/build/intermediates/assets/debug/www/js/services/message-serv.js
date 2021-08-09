'use strict';
angular.module('main')
.service('Message', function () {

  console.log('Hello from your Service: Message in module main');

  this.getAllChat = function () {
    var senderAvatar = 'img/images/avatar2.png';
    var reciverAvatar = 'img/images/avatar4.png';
    return [
      {
        message: 'Hello Jason, how are you, it\'s been a long time since we last met?',
        username: 'Sarah',
        sender: true,
        avatar: senderAvatar,
      },
      {
        message: 'Oh, hi Sarah I\'m have got a new job now and is going great. How about you?',
        username: 'Jason',
        sender: false,
        avatar: reciverAvatar,
      },
      {
        message: 'Not too bad.',
        username: 'Sarah',
        sender: true,
        avatar: senderAvatar,
      },
      {
        message: 'How often do you eat at that cafe?',
        username: 'Jason',
        sender: false,
        avatar: reciverAvatar,
      },
      {
        message: 'This is my first time my friends kept telling me the food was great, so tonight I decided to try it. What have you been up to?',
        username: 'Sarah',
        sender: true,
        avatar: senderAvatar,
      },
      {
        message: 'I have been so busy with my new job that I have not had the time to do much else, but otherwise, me and the family are all fine.',
        username: 'Jason',
        sender: false,
        avatar: reciverAvatar,
      },
      {
        message: 'Well, I hope you and your family have a lovely meal.',
        username: 'Sarah',
        sender: true,
        avatar: senderAvatar,
      },
      {
        message: 'Yes you too.',
        username: 'Jason',
        sender: false,
        avatar: reciverAvatar,
      }
    ];
  };

  this.getAll = function () {
    return [
      {
        message: 'Hi, Where are you?',
        avatar: 'img/images/avatar2.png',
        seen: true,
        datetime: '',
        username: 'Desh Atom',
      },
      {
        message: 'Ok, I will let you know',
        avatar: 'img/images/avatar2.png',
        seen: true,
        datetime: '',
        username: 'Desh Atom',
      },
      {
        message: 'How much is It?',
        avatar: 'img/images/avatar3.png',
        seen: false,
        datetime: '',
        username: 'Desh Atom',
      },
      {
        message: 'Yeah yeah, Sure I am awsome.',
        avatar: 'img/images/avatar1.png',
        seen: true,
        datetime: '',
        username: 'Desh Atom',
      },
      {
        message: 'Dammm...... ',
        avatar: 'img/images/avatar2.png',
        seen: false,
        datetime: '',
        username: 'Desh Atom',
      },
      {
        message: 'What happen to you bro?',
        avatar: 'img/images/avatar2.png',
        seen: true,
        datetime: '',
        username: 'Desh Atom',
      },
      {
        message: 'Are you Ok with her',
        avatar: 'img/images/avatar1.png',
        seen: true,
        datetime: '',
        username: 'Desh Atom',
      },
      {
        message: 'She is Ok mhn.',
        avatar: 'img/images/avatar1.png',
        seen: true,
        datetime: '',
        username: 'Desh Atom',
      },
    ];
  };

});
