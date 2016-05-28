// const fbId = document.querySelector('meta[name="fb-id"]')
//                         .getAttribute('content');

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
  * initializes facebook API
  * @param {object} image the image object passed from the calling function
  * @param {string} source the image ref source
  */
  share: (source) => {
    console.log(source);
    FB.ui({
      method: 'feed',
      name: 'I just edited on image editor',
      display: 'popup',
      link: window.location.origin || window.location.origin + source ,
      caption: 'Image editor is your instagram on web',
      picture: source,
      description: 'I just updated my image'
    }, res => {
      console.log(res);
    });
  }
};
export default FaceBookApi;
