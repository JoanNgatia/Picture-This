// // // This is called with the results from from FB.getLoginStatus().
// //   function statusChangeCallback(response) {
// //     console.log('statusChangeCallback');
// //     console.log(response);
// //     // The response object is returned with a status field that lets the
// //     // app know the current login status of the person.
// //     // Full docs on the response object can be found in the documentation
// //     // for FB.getLoginStatus().
// //     if (response.status === 'connected') {
// //       // Logged into your app and Facebook.
// //       testAPI();
// //     } else if (response.status === 'not_authorized') {
// //       // The person is logged into Facebook, but not your app.
// //       document.getElementById('status').innerHTML = 'Please log ' +
// //         'into this app.';
// //     } else {
// //       // The person is not logged into Facebook, so we're not sure if
// //       // they are logged into this app or not.
// //       document.getElementById('status').innerHTML = 'Please log ' +
// //         'into Facebook.';
// //     }
// //   }

// //   // This function is called when someone finishes with the Login
// //   // Button.  See the onlogin handler attached to it in the sample
// //   // code below.
// //   function checkLoginState() {
// //     FB.getLoginStatus(function(response) {
// //       statusChangeCallback(response);
// //     });
// //   }

// //   window.fbAsyncInit = function() {
// //   FB.init({
// //     appId      : '1745393229039845',
// //     cookie     : true,  // enable cookies to allow the server to access
// //                         // the session
// //     xfbml      : true,  // parse social plugins on this page
// //     version    : 'v2.5' // use graph api version 2.5
// //   });

// //   // Now that we've initialized the JavaScript SDK, we call
// //   // FB.getLoginStatus().  This function gets the state of the
// //   // person visiting this page and can return one of three states to
// //   // the callback you provide.  They can be:
// //   //
// //   // 1. Logged into your app ('connected')
// //   // 2. Logged into Facebook, but not your app ('not_authorized')
// //   // 3. Not logged into Facebook and can't tell if they are logged into
// //   //    your app or not.
// //   //
// //   // These three cases are handled in the callback function.

// //   FB.getLoginStatus(function(response) {
// //     statusChangeCallback(response);
// //   });

// //   };

// //   // Load the SDK asynchronously
// //   (function(d, s, id) {
// //   var js, fjs = d.getElementsByTagName(s)[0];
// //   if (d.getElementById(id)) return;
// //   js = d.createElement(s); js.id = id;
// //   js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=1745393229039845";
// //   fjs.parentNode.insertBefore(js, fjs);
// //   }(document, 'script', 'facebook-jssdk'));

// //   // Here we run a very simple test of the Graph API after login is
// //   // successful.  See statusChangeCallback() for when this call is made.
// //   function testAPI() {
// //     console.log('Welcome!  Fetching your information.... ');
// //     FB.api('/me', function(response) {
// //       console.log('Successful login for: ' + response.name);
// //       document.getElementById('status').innerHTML =
// //         'Thanks for logging in, ' + response.name + '!';
// //     });
// //   }
// /* global FB: true, $:true */
// $.ajaxSetup({
//   headers: {
//     'X-CSRFToken': $('meta[name="csrf-token"]').attr('content')
//   }
// });

// /**
//  * Sends the user instance to django backend for registeration or login.
//  * @param {object} user The response object.
//  */
// // function socialLogin(user) {
// //   $('#status-msg').text('Hi ' + user.first_name + ' Loggin you in...');
// //   var ajaxInfo = {
// //     url: '/login',
// //     type: 'POST',
// //     data: user,
// //     success: function(data) {
// //       if (data.status === 'success') {
// //         window.location.href = '/dashboard';
// //       }
// //     },
// //     error: function(error) {
// //       $('#status-msg').text('hi' + user.firstname +
// //         ' An error occured' + error.responseText);
// //     }
// //   };
// //   $.ajax(ajaxInfo);
// // }
// // config: {
// //     login: '#facebook-login',
// //     fbId: '1472709103038197'
// //   },
// //   init: function init(config) {
// //     $(facebookLogin.config.login).attr('disabled', true);
// //     if (config && typeof(config) === 'object') {
// //       $.extend(facebookLogin.config, config);
// //     }
// //     $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
// //       FB.init({
// //         appId: facebookLogin.config.fbId,
// //         version: 'v2.6'
// //       });
// //       $(facebookLogin.config.login).attr('disabled', false);
// //     });
// //     $(facebookLogin.config.login).click(function (e) {
// //       e.preventDefault();
// //       facebookLogin.login();
// //     });
// //   },
// //   login: function () {
// //     FB.login(function (response) {
// //       if (response.authResponse) {
// //         FB.api('/me?fields=email,first_name,last_name,picture', socialLogin);
// //       }
// //     }, {
// //       scope: 'email,user_likes'
// //     });
// //   }
// var facebookLogin = {
//     // the configurable input for the facebook login literal
//   config: {
//     login: '#facebook_login_button'
//     // fbId: '1745393229039845'
//   },
//   /**
//  * Extends user settings and add event listener for the facebook login button
//  * @param {object} config The extensible configuration info from the user.
//  */
//   init: function(config) {
//     $(facebookLogin.config.login).attr('disabled', true);
//     if (config && typeof (config) === 'object') {
//       $.extend(facebookLogin.config, config);
//     }
//     $.getScript('//connect.facebook.net/en_US/sdk.js', function() {
//       FB.init({
//         appId: '1745393229039845',
//         version: 'v2.6'
//       });
//       $(config.login).attr('disabled', false);
//       FB.Event.subscribe('auth.login', function () {
//           window.location = "http://localhost:8000/#/home";
//       });
//     });
//     $(config.login).click(function(e) {
//       e.preventDefault();
//       facebookLogin.login();
//     });
//   },
//   // recieve the user information from the facebook and sends it to our socialLogin(user)
//   login: function() {
//     FB.login(function(response) {
//       if (response.authResponse) {
//         console.log('Welcome!  Fetching your information.... ');
//         FB.api('/me?fields=email,first_name,last_name,picture');
//       } else {
//         $('#status-msg').text('an error occured');
//       }
//       console.log('Welcome!  Fetching your information. you there ');
//     }, {
//       scope: 'email,user_likes'
//     });
//   }
// };

// $(document).ready(function() {
//   facebookLogin.init({
//     fbId: $('meta[name="fb-id"]').attr('content'),
//     login: '#facebook_login_button'
//   });
// });