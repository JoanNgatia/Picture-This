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
    FB.ui({
      method: 'share',
      name: 'Picture-This',
      display: 'popup',
      href: window.location.origin,
      caption: 'Picture-This, work those filters!!!',
      picture: source,
      description: 'Work those Filters.'
    }, res => {
      console.log(res);
    });
  }
};
export default FaceBookApi;
