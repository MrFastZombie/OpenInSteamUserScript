// ==UserScript==
// @name         OpenInSteam
// @version      0.2
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
    var newbutton = $('<div>', {
        id: 'openClient'
    });

    var newbuttonContent = $('<a>', {
        class:"openClientContent",
        href: "steam://openurl/" + pageurl,
        text: "Open in client"
    });

    newbutton.css({"display":"inline-block","height":"21px","line-height":"24px","margin-right":"3px"});
    newbuttonContent.css({"display":"inline-block","padding-left":"35px","padding-right":"9px","background-position":"10px 5px","background-image":"url( 'https://raw.githubusercontent.com/MrFastZombie/OpenInSteamUserScript/main/OpenInSteamIcon.png' )","background-repeat":"no-repeat","text-decoration":"none","color":"#e5e4dc","font-weight":"normal","background-color":"#3691fa"})
    newbutton.prependTo("#global_action_menu");
    newbuttonContent.appendTo(newbutton);
})();
