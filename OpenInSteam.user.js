// ==UserScript==
// @name         OpenInSteam
// @version      0.6
// @description  Adds a button next to the installation button to open the current Steam page in the client.
// @author       MrFastZombie
// @match        https://*.steampowered.com/*
// @match        https://steamcommunity.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @run-at document-end
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://raw.github.com/odyniec/MonkeyConfig/master/monkeyconfig.js
// ==/UserScript==

(function() {
    'use strict';
    //---------------------------------------- CONFIG ----------------------------------------
    // If you wish to configure these settings, use the configuration command for this userscript in your userscript manager.
    var cfg = new MonkeyConfig({
      title: 'OpenInSteam Configuration',
      menuCommand: true,
      params: {
        initial_Delay: {
          type: 'number',
          default: 1000
        },
        quickview_Delay: {
          type: 'number',
          default: 250
        },
        inject_quickview: {
          type: 'checkbox',
          default: true
        }
      }
    });

    var initialDelay = cfg.get('initial_Delay'); //Delay in milliseconds before attempting to inject the button. 1 second = 1000 ms. Increase this if you notice the button disappearing and reappearing when opening a page!
    var quickviewDelay = cfg.get('quickview_Delay'); //Delay before injecting quickview button. Tends to not have issues with quicker times.
    var injectQuickViewButton = cfg.get('inject_quickview'); //Will add a quick view button if true.
  //---------------------------------------- END OF CONFIG ----------------------------------------
  //---------------------------------------- NEW INJECTION ----------------------------------------
    function attemptNewInject(delay, pdiv, indom, iurl) {
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
        newDiv.onmouseenter = function() { //Change the href when the user is about to press the button.
          document.querySelector("#OpenInSteamButtonDiv").shadowRoot.querySelector("a").href = "steam://openurl/" + window.location.href;
        };
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
  //---------------------------------------- END OF NEW INJECTION ----------------------------------------

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

    } else { //Normal page injection
      newbutton.prependTo("#global_action_menu");
      newbuttonContent.appendTo(newbutton);
    }

    // ---------------------------------------- Quick View Injection ----------------------------------------
    document.body.addEventListener('click', function(e) { //Potentially run when a click is detected.
      var checkDiv = document.querySelector("#OpenInSteamButtonDivModView");
      if(inbutton[0] == undefined && checkDiv == null && injectQuickViewButton == true) { //Do not run if on a non-beta page, the button already exists, or if quickview button is disabled.
        setTimeout(function() {
          var modHeader = document.querySelector('h2:has(a)'); //Find the mod header by searching for an h2 that has a <a> in it.
          if(modHeader != null) { //Only run if Quickview is open.
            var modA = document.querySelector('h2:has(a) > a'); //Find the mod header, then select its <a>.
            var subButton = dom.query("button:contains(Subscribe)")[0]; //Select the subscribe button
            var buttonDiv = subButton.parentNode.parentNode.parentNode; //Go three nodes up to get the proper div to inject.
            var nDiv = document.createElement("div");
            nDiv.setAttribute('style', 'display: inline-block;');
            nDiv.setAttribute("id", "OpenInSteamButtonDivModView");
            var nbutton2 = subButton.cloneNode(true); //Clone the sub button to be turned into the new button.
            nbutton2.textContent = ""; //Remove its text
            nbutton2.setAttribute('style', '--min-width: fit-content; padding: 0px; max-height: stretch')
            var linka = document.createElement("a");
            linka.href = "steam://openurl/" + modA.href;
            linka.text = "Open in client";
            linka.setAttribute('style', 'width: auto; height: auto; text-decoration: none; padding-right: 7px; padding-left: 29px; padding-top: 7px; height: stretch; text-wrap-mode: nowrap; background-image: url(https://raw.githubusercontent.com/MrFastZombie/OpenInSteamUserScript/main/OpenInSteamIcon.png); background-repeat: no-repeat; background-position-y: center; background-position-x: 8px');
            buttonDiv.prepend(nDiv);
            nbutton2.prepend(linka);
            nDiv.prepend(nbutton2);
          }
        }, 250)
      }
    });
    //---------------------------------------- Quick View Injection end ----------------------------------------
})();
