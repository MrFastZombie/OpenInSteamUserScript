// ==UserScript==
// @name        Youtube Embed FullScreen Enabler
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @run-at      document-end
// @author      MrFastZombie
// @description This forces YouTube embeds to allow the fullscreen button to work.
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

(function() {

  var dom = {};
  dom.query = jQuery.noConflict( true ); //We use this to avoid messing with the jquery used by the website. For example, using jquery 3.7.1 without this on Nexus Mods would break writing comments.

  dom.query('iframe[src^="https://www.youtube.com/embed/"]').each(function(i,v) {
      let url = new URL(v.src);
      console.log("Found embed with URL " + url.href + " and will try to force it to allow fullscreen.");
      dom.query(v).attr('allowFullScreen', 'true') //Add the 'allowFullScreen' attribute to the iframe.
      url.searchParams.set("fs", 1); //Sets the fullscreen flag to 1 in the URL. This allows the button to be visible.
      v.src = url.href; //Apply the URL href to the iframe.
  })
})();
