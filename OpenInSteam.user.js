// ==UserScript==
// @name         OpenInSteam
// @version      0.4
// @description  Adds a button next to the installation button to open the current Steam page in the client.
// @author       MrFastZombie
// @match        https://*.steampowered.com/*
// @match        https://steamcommunity.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @grant        none
// @run-at document-end
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    var initialDelay = 750; //Delay in milliseconds before attempting to inject the button. 1 second = 1000 ms. Increase this if you notice the button disappearing and reappearing when opening a page!

    function attemptNewInject(delay, pdiv, indom, iurl) {
      var nbutton = indom.query('<div>', {
          id: 'openClient'
      });

      var nbuttoncontent = indom.query('<a>', {
          class:"openClientContent",
          href: "steam://openurl/" + iurl,
          text: "Open in client"
      });

      nbuttoncontent.css({"display":"inline-block","padding-left":"35px","padding-right":"9px","background-position":"10px 5px","background-image":"url( 'https://raw.githubusercontent.com/MrFastZombie/OpenInSteamUserScript/main/OpenInSteamIcon.png' )","background-repeat":"no-repeat","text-decoration":"none","color":"#e5e4dc","font-weight":"normal","background-color":"#3691fa"})

      setTimeout(function() {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "OpenInSteamButtonDiv");
        newDiv.setAttribute('style', 'display: inline-block; height: 24px; line-height: 24px; margin-right: 7px');
        //newDiv.css({"display":"inline-block","height":"21px","line-height":"24px","margin-right":"3px"});
        var shadow = newDiv.attachShadow({ mode: "open" });
        pdiv.prepend(newDiv);
        shadow.appendChild(nbuttoncontent[0]);
        setTimeout(function() {
          var openButtonDiv = document.querySelector("#OpenInSteamButtonDiv");
          if(openButtonDiv == null && delay <= 60000) { //Set a max delay of 60 seconds to avoid infinite recursion.
            console.log("Couldn't find button! Retrying with delay of "+eval(delay+250))
            var iButton = indom.query("a:contains(Install Steam)")[0];
            var parDiv = iButton.parentNode;
            return attemptNewInject(delay+250, parDiv, indom, iurl);
          }
        }, 1000)
        return;
      }, delay)
    }

    var dom = {};
    dom.query = jQuery.noConflict( true );

    var pageurl = dom.query(location).attr('href');
    var inbutton = dom.query(".header_installsteam_btn_gray");

    var installButton = dom.query("a:contains(Install Steam)")[0];
    var parentDiv = installButton.parentNode;

    var newbutton = dom.query('<div>', {
        id: 'openClient'
    });

    var newbuttonContent = dom.query('<a>', {
        class:"openClientContent",
        href: "steam://openurl/" + pageurl,
        text: "Open in client"
    });

    newbutton.css({"display":"inline-block","height":"21px","line-height":"24px","margin-right":"3px"});
    newbuttonContent.css({"display":"inline-block","padding-left":"35px","padding-right":"9px","background-position":"10px 5px","background-image":"url( 'https://raw.githubusercontent.com/MrFastZombie/OpenInSteamUserScript/main/OpenInSteamIcon.png' )","background-repeat":"no-repeat","text-decoration":"none","color":"#e5e4dc","font-weight":"normal","background-color":"#3691fa"})



    if(inbutton[0] == undefined) { //If the inbutton is undefined, we are on the new workshop layout
      attemptNewInject(initialDelay, parentDiv, dom, pageurl);

    } else {
      newbutton.prependTo("#global_action_menu");
      newbuttonContent.appendTo(newbutton);
    }


})();
