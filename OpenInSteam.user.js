// ==UserScript==
// @name         OpenInSteam
// @version      0.9
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

    var dom = {};
    dom.query = jQuery.noConflict( true );
    setTimeout(function() {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML += `
        button#openClient:hover {
          background-color: #6aa9f3;
          transition: background-color .25s;
        }
        button#openClient {
          background-color: #3691fa;
        }
      `;

      document.head.appendChild(style);

      var pageurl = location.href;
      var inbuttonOld = dom.query(".header_installsteam_btn_gray");
      var inbutton = [... document.querySelectorAll("a")].filter(item => item.innerText == 'Install Steam')[0];

      var parentDiv = inbutton.parentNode;

      var newbutton = document.createElement("BUTTON")
      newbutton.setAttribute("id", "openClient");
      newbutton.textContent = "Open in client"

      newbutton.setAttribute('style', 'display: inline-block; height: 24px; margin-right: 7px; padding-left: 33px; padding-right: 10px; border: none; cursor: pointer; background-image: url(https://raw.githubusercontent.com/MrFastZombie/OpenInSteamUserScript/main/OpenInSteamIcon.png); background-repeat: no-repeat; background-position-y: center; background-position-x: 10px; text-decoration: none; font-weight: 400; font-size: 11px; font-family: "Motiva Sans", Sans-serif; color: #e5e4dc');

      newbutton.onclick = function() {
        window.location.href = "steam://openurl/" + location.href;
      }

      parentDiv.prepend(newbutton);
    }, initialDelay)

    // ---------------------------------------- Quick View Injection ----------------------------------------
    function injectQuickview(delay) {
      if(injectQuickViewButton == true) { //Do not run if injecting quick view is disabled.
        setTimeout(function() {
          var modHeader = document.querySelector('h2:has(a)'); //Find the mod header by searching for an h2 that has a <a> in it.
          if(modHeader != null) { //Only run if Quickview is open.
            var modA = document.querySelector('h2:has(a) > a'); //Find the mod header, then select its <a>.
            var subButton = dom.query("button:contains(Subscribe)")[0]; //Select the subscribe button
            var favButton = dom.query("button:contains(Favorite)")[0];
            var buttonDiv = subButton.parentNode.parentNode.parentNode; //Go three nodes up to get the proper div to inject.
            var nDiv = document.createElement("div");
            nDiv.setAttribute('style', 'display: inline-block;');
            nDiv.setAttribute("id", "OpenInSteamButtonDivModView");
            var nbutton2 = favButton.cloneNode(true); //Clone the fav button to be turned into the new button.
            nbutton2.textContent = "Open in client"; //Remove its text
            nbutton2.setAttribute('style', '--min-width: fit-content; padding: 0px; max-height: stretch')
            nbutton2.setAttribute('style', '--min-width: fit-content; width: auto; height: auto; text-decoration: none; padding-right: 7px; padding-left: 29px; padding-top: 0px; height: stretch; text-wrap-mode: nowrap; background-image: url(https://raw.githubusercontent.com/MrFastZombie/OpenInSteamUserScript/main/OpenInSteamIcon.png); background-repeat: no-repeat; background-position-y: center; background-position-x: 8px')

            if(document.querySelectorAll("#OpenInSteamButtonDivModView").length >= 1) return; //Skip adding the button if it already exists.

            nbutton2.onclick = function() { //Use the button to open the link stead of an <a>.
              window.location.href = "steam://openurl/" + modA.href;
            }

            buttonDiv.prepend(nDiv);
            //nbutton2.prepend(linka);
            nDiv.prepend(nbutton2);
          }
        }, delay)
      }
    }

    document.body.addEventListener('click', function(e) { //Potentially run when a click is detected.
      var checkDiv = document.querySelector("#OpenInSteamButtonDivModView");
      var onWorkshop = location.href.includes('workshop');

      if(onWorkshop == true && checkDiv == null) { //Do not run if not on workshop, the button already exists, or if quickview button is disabled.
        injectQuickview(quickviewDelay);
      }

      if(checkDiv != null) {
        var observer = new MutationObserver(function (e) { //Checks when the target node is changed. Tries another injection if it is.
          checkDiv = document.querySelector("#OpenInSteamButtonDivModView");
          if(checkDiv == null) injectQuickview(quickviewDelay);
        });

        observer.observe(document.getElementById("OpenInSteamButtonDivModView").parentNode.parentNode.parentNode.parentNode, {childList: true}); //Basically it checks when the quick view is destroyed (like when switching to the next one)
      }
    });
    //---------------------------------------- Quick View Injection end ----------------------------------------
})();
