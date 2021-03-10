var strings_to_search; // search is case insensitive, but strings must be specified in lowercase here
var num_of_occurences;
var counter;
var will_write_this;
var last_ignored_index;
var checking_interval_ms = 1000;
 
function ifMessageIncludesAnyOfStrings(message) {
    message = message.toLowerCase();
    for (var i=0; i<strings_to_search.length; i++) {
        var string_to_search = strings_to_search[i];
        if (message.includes(string_to_search)) return true;
    }
    return false;
}
 
function postMessage() {
    var textareas = document.querySelectorAll("textarea");
    var textarea = textareas[textareas.length-1];
    textarea.value = will_write_this;
    var button = document.querySelector("div[role='button'][data-tooltip='Send message'][aria-label='Send a message to everyone']");
    button.ariaDisabled = null;
    button.click();
}
 
function checkAndLoadMessages() {
    var message_divs = document.querySelectorAll("div[data-message-text]");
    for (var i = last_ignored_index+1; i<message_divs.length; i++) {
        var message = message_divs[i].innerText;
        if (ifMessageIncludesAnyOfStrings(message)) {
            counter++;
            if (counter>=num_of_occurences) {
                postMessage();
                break;
            }
        }
    }
    last_ignored_index = message_divs.length-1;
    if (counter<num_of_occurences) {
        setTimeout(checkAndLoadMessages, checking_interval_ms);
    }
}
 

function activatePotpisiMe(){
    alert("Sve spremno! NE ZATVARAJTE CHAT!");
    last_ignored_index = -1;
    setTimeout(checkAndLoadMessages, checking_interval_ms);
}

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage (message, sender, sendResponse) {
  strings_to_search = message.stringsToSearch;
  num_of_occurences = message.noOfOcc;
  will_write_this = message.toWrite;
  counter = 0;
  openChatTab();
  activatePotpisiMe();
}

function openChatTab()
{
    let button_chat = document.querySelector("div[role='button'][aria-label='Chat with everyone']"); 
    button_chat.ariaDisabled = null; 
    button_chat.click();
}