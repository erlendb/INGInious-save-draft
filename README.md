# Automatically save draft in INGInious

You can install this extension from the Chrome Web Store: (link to be inserted)

This is a Chrome extension that automatically saves your replies to INGInious. The next time you log in to complete the exercise, you continue where you left off. The answers are not stored on your INGInious user, but locally on the browser. That means you have to use the same computer with the same browser to find your answers again.

## How does the extension work?

Each time you change an input into the exercise, the extension stores the new answer in Chrome's "local storage".

When you open an exercise, the extension checks to see if all the inputs are empty. If everything is empty, then it assumes that you want to pick up the draft to continue where you left off &mdash; so then it retrieves the answers it last saved.

## Bugs and todo

* Only considering checkboxes and radio buttons
* Convert from local storage to sync

## How to install from source code

The easiest thing is to install the extension from the Chrome Web Store.

To load the extension from the source code, do the following: Open *chrome://extensions* in Chrome. Enable "Developer mode". Press "Load unpacked". Navigate to *INGInious-save-draft/src/* and load from there.

### Easy extraction of crx/zip file from source

Run `./create`. Then the content of *src/* is zipped and the zip file is saved as *crx/extension_name-version.zip*. The version number is taken from *src/manifest.json*. You will be asked before the script overwrites anything.
