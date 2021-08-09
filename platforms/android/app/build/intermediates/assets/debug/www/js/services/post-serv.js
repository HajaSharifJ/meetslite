'use strict';
angular.module('main')
  .service('Post', function ($q) {

    console.log('Hello from your Service: Post in module main');

    this.getCategories = function () {
      let deferred = $q.defer()
      steem.api.getTrendingTags('', 20, function (err, result) {
        let categories = [];
        _.each(result, (tag) => {
          if (tag.name !== '') {
            categories.push(tag);
          }
        });
        deferred.resolve(categories);
      });
      return deferred.promise;
    };

    this.getAllComments = function () {
      return [
        {
          comment: 'I would like settle for for an incredibly interlaced cross promotion with Pizza Hut.',
          commentedBy: 'Ryan Amely',
          avatar: 'img/images/avatar2.png',
          time: '5 hours ago',
          replyCount: 3,
          like: true,
          replies: [
            {
              comment: 'Those movies were marketing gold for Pizza Hut. I forgot about that actually. Lots of nostalgia in this thread.',
              time: '4 hours ago',
              avatar: 'img/images/real-avatar1.jpg',
              commentedBy: 'Desmond Spagnolo',
              like: false,
            },
            {
              comment: 'I still remember that 20 minute long Pizza Hut commercial at the beginning of my VHS where this kid sucks at baseball but going to Pizza Hut afterwards makes it all better.',
              time: '3 hours ago',
              commentedBy: 'Yelena Preece',
              avatar: 'img/images/avatar1.png',
              like: false,
            },
            {
              comment: 'Wait, they let their kids play an official game of baseball with that spare tire just laying in the field.?',
              time: '2 hours ago',
              commentedBy: 'Desmond Spagnolo',
              avatar: 'img/images/real-avatar1.jpg',
              like: true,
            }
          ]
        },
        {
          comment: 'The ooze gives animals human like traits and in certain iterations where they ',
          commentedBy: 'Tula Kernan',
          time: '6 hours ago',
          avatar: 'img/images/avatar2.png',
          replyCount: 1,
          like: false,
          replies: [
            {
              comment: 'Wait, they let their kids play an official game of baseball with that spare tire just laying in the field.?',
              time: '2 hours ago',
              commentedBy: 'Desmond Spagnolo',
              avatar: 'img/images/profile-pic.jpg',
              like: true,
            }
          ]
        },
        {
          comment: 'Fun trivia. The same ooze that turned the turtles into human hybrids is the ooze that blinded Dare Devil in a different universe. In TMNT they fight the foot. In Dare Devil they fight the hand and so on.',
          commentedBy: 'Samantha Laughlin',
          time: '12 hours ago',
          avatar: 'img/images/avatar3.png',
          replyCount: 0,
          like: true,
        },
      ];
    };

    this.getById = function (id) {
      var posts = this.getAll();
      var post = posts[0]; //default post
      for (var i = 0; i < posts.length; i++) {
        if ((posts[i].id + '') === id) {
          post = posts[i];
          break;
        }
      }
      return post;
    };

    this.getAll = function () {
      return [{
        id: 1000,
        title: 'Released Teenage Mutant Ninja Turtles',
        shortContent: 'To help promote the film, a few days ago I landed an exclusive video interview with Megan Fox. She talked about how the film is the 90s cartoon come to life, what making the sequel was ...',
        content: 'So basically, this movie has something going for it that the previous film did not: a director who genuinely reveres the source material. According to <b>Fox</b>, they seem to have found that in the form of David Green.<br> <b style="color:blue">Megan Fox </b> most certainly has a point when it comes to the tone of what a Teenage Mutant Ninja Turtles movie should feel like. <h4 text-align="center">Teenage Mutant Ninja Turtles</h4> Studios in general seem to be catching on to this trend, handing off beloved properties to lifelong fans that will treat the material with the respect it deserves. For example, J.J. Abrams’ handling of the new Star Wars, or Joss Whedon’s take on The Avengers have both definitively proven that someone who has a prior relationship with the source material is generally the person with the best creative vision for big screen adaptations.Ever since Batman Begins hit theaters back in 2005, superhero adaptations have consistently attempted to do things in a "dark," and "gritty" fashion, regardless of the hero. With some characters this approach works – see: Daredevil – but all too often studios apply it to characters that inherently have much more of a sense of humor than the Dark Knight could ever hope for – see: The Amazing Spider-Man franchise.',
        avatar: 'img/images/real-avatar3.png',
        author: 'Stephen Amell ',
        datetime: '20 min ago',
        type: 'image',
        image: 'img/images/posts/post-meganfox.jpg',
        audio: '',
        video: '',
        like: true,
        bookmarked: false,
        commentCount: 5,
      },
      {
        id: 1001,
        title: ' Never Let Your Kids Eat McDonald’s',
        shortContent: 'Hold on to your hats, parents: A court-appointed psychiatrist recently called a Manhattan father an ‘unfit parent’ because he denied his son’s request to eat at McDonald’s. Yes, you’re reading that right.',
        content: 'The man is in the midst of a custody battle with his estranged wife, and the issue came up during a visit. The father and son planned to eat at their usual restaurant during their weekly Tuesday night visitation. Instead, the kid threw a temper tantrum and demanded McDonald’s. The dad stood firm, saying choose another restaurant or go without dinner (an age-old parenting tactic). The kid chose nothing. End of story, right? Wrong.',
        avatar: 'img/images/real-avatar1.jpg',
        author: 'Linda Babara ',
        datetime: '40 min ago',
        type: 'image',
        image: 'img/images/posts/post-macdonal.jpg',
        audio: '',
        video: '',
        like: false,
        bookmarked: true,
        commentCount: 8,
      },
      {
        id: 1002,
        title: 'Drawing Emma Watson by Don (Artist)',
        shortContent: 'With the range of drawing media available, artists can produce a wide variety of multicolored and monochromatic art drawings in a number of styles and categories including figure, portrait, and nature. If you enjoy drawing and would like to own original works to inspire you, or if …',
        content: 'The man is in the midst of a custody battle with his estranged wife, and the issue came up during a visit. The father and son planned to eat at their usual restaurant during their weekly Tuesday night visitation. Instead, the kid threw a temper tantrum and demanded McDonald’s. The dad stood firm, saying choose another restaurant or go without dinner (an age-old parenting tactic). The kid chose nothing. End of story, right? Wrong.',
        avatar: 'img/images/profile-pic.jpg',
        author: 'Desh Atom ',
        datetime: '1 hour ago',
        type: 'video',
        image: '',
        audio: '',
        video: 'https://www.youtube.com/embed/t7hD1d5Gp5k',
        like: false,
        bookmarked: true,
        commentCount: 2,
      }

      ];
    };

  });
