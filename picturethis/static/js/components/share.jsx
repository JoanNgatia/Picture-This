const FaceBookApi = {
  /**
  * initializes facebook API
  */
  init: () => {
    window.fbAsyncInit = function() {
      FB.init({
        appId: '1745393229039845',
        xfbml: true,
        version: 'v2.5'
      });
      $(document).trigger('fbload');
    };
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  },
  /**
  * Utilize the Facebook SDK share function
  * param(Source)- Image url
  */
  share: (source) => {
    console.log(source);
    FB.ui({
      method: 'feed',
      name: 'Picture-This',
      display: 'popup',
      link: window.location.origin,
      caption: 'Picture-This, work those filters!!!',
      picture: source,
      description: 'I just edited my image.'
    }, res => {
      console.log(res);
    });
  }
};
export default FaceBookApi;
