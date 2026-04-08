![vivaldi_kLBqKUjHA5](https://github.com/MrFastZombie/OpenInSteamUserScript/assets/18253497/fd5504ba-7a0c-4f8d-b10a-7876cfec0c6c)
# OpenInSteamUserScript
Simple userscript that adds a button to open Steam pages in the client.

Note: Steam now has a similar button that appears on game pages when you are not signed in. This new feature works great but if you are often signed in on your browser, you wont see it so you may still want to use this userscript. As of 5/15/2024, this userscript still works with the current version of the Steam website.

### New! (4/8/2026)
Quickviews on the Steam workshop beta now have a button to open the viewed mod in your client. Can be disabled in the new settings menu if undesired.

<img width="1100" height="619" alt="vivaldi_I9eNB4THX3" src="https://github.com/user-attachments/assets/9ee20162-f629-4ab5-96fb-d1f87ef05d50" />

(Example mod credit: https://steamcommunity.com/sharedfiles/filedetails/?id=3695447591)

# Installation
Open the .js file and view as raw. Your Userscript manager should show a page to install. If this does not work, check if your userscript manager requires a different method to install userscripts.

You can also [click here](https://github.com/MrFastZombie/OpenInSteamUserScript/raw/refs/heads/main/OpenInSteam.user.js).

# Settings
Starting with version 6 there are now settings for the userscript, which can be accessed through the userscript commands menu in your userscript manager. The image below shows how to do so in ViolentMonkey.

The new settings menu is courtesy of [MonkeyConfig](https://github.com/odyniec/MonkeyConfig). 

<img width="313" height="160" alt="vivaldi_BEX2eu08xp" src="https://github.com/user-attachments/assets/7d72cd88-7790-4f16-ae26-b26973cc046e" />

Below is the settings menu with its default settigns:

<img width="333" height="185" alt="image" src="https://github.com/user-attachments/assets/1d342b4a-a2fe-411c-8c2b-749c165e0111" />

The settings are as follows:
* Initial Delay - The time the script will wait before first attempting to inject the button into the Steam page. Increase this if the button disappears and comes back often when you first load the page.
* Quickview Delay - The amount of time before the script will inject the button on a quickview. Increase this if the button in that menu fails to show up.
* Inject quickview - If enabled, the button in the quickview menus will be added.

**Settings will only apply on a refresh!**
