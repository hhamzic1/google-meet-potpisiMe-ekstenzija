var onOffButton = document.getElementById("myonoffswitch");
onOffButton.addEventListener('click', switchActivate);

function switchActivate()
{
    if(!checkInputFields())
    {
        document.getElementById("errorMsg").style.display="inline";
        onOffButton.checked = false;
        return;
    }

    var hotwordsContext = document.getElementById("polje3").value.toLowerCase();
    var strings_to_search = hotwordsContext.split(",");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(!tabs[0].url.includes('https://meet.google.com')) {
          alert('Molimo vas idite na https://meet.google.com')
          return
        }
        const data = {
            toWrite: document.getElementById("polje1").value.toLowerCase(),
            noOfOcc: document.getElementById("polje2").value.toLowerCase(),
            stringsToSearch: strings_to_search
          }
        chrome.tabs.sendMessage(tabs[0].id, data);
      }); 
}


function setValues()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(!tabs[0].url.includes('https://meet.google.com')) {
          alert('Molimo vas idite na https://meet.google.com')
          return
        }
        const inptValues = {
            txt, tme, rid
          }
        chrome.tabs.sendMessage(tabs[0].id, inptValues);
      });
}


function checkInputFields()
{
    let polje1 = document.getElementById("polje1");
    let polje2 = document.getElementById("polje2");
    let polje3 = document.getElementById("polje3");
    if(polje1.value.length!=0 && polje2.value.length!=0  && polje3.value.length!=0) return true;
    return false;
}