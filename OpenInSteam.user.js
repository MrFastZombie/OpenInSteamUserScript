// ==UserScript==
// @name         OpenInSteam
// @version      0.1
// @description  Adds a button next to the installation button to open the current Steam page in the client.
// @author       MrFastZombie
// @match        https://*.steampowered.com/*
// @match        https://steamcommunity.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steampowered.com
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    var $ = window.jQuery;
    var pageurl = $(location).attr('href');
    var inbutton = $(".header_installsteam_btn_gray");
    var newbutton = inbutton.clone();
    newbutton.attr("class", "openClient header_installsteam_btn header_installsteam_btn_gray");
    newbutton.find(".header_installsteam_btn_content").text("Open in client");
    newbutton.find(".header_installsteam_btn_content").attr("href","steam://openurl/" + pageurl);
    newbutton.prependTo("#global_action_menu");
})();
