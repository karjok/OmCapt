

var newDiv;
if (!document.getElementById("myContainer")) {
    newDiv = document.createElement("div");
    newDiv.id = "myContainer";
    newDiv.style.cssText = "background-color:#E4E4E4;height:auto;overflow:auto;display:flex;flex-flow:row wrap;border-radius:30px;align-items:center;justify-content:center;";
    
    
} else {
    newDiv = document.getElementById("myContainer");
}


var buttonList = [];


function initButtonList() {
    buttonList = localStorage.getItem("list_text") ? JSON.parse(localStorage.getItem("list_text")) : ["ADD"];
    localStorage.setItem("list_text", JSON.stringify(buttonList));
}


function addTextContent() {
    const addNewButton = document.getElementById("addBtn");
    addNewButton.style.display = 'none';
    const inputField = document.createElement("div");
    inputField.id = "inputField";
    inputField.style.cssText = "display:flex;flex-flow:column;margin-bottom:3px;margin-top:3px;";

    const textArea = document.createElement("textarea");
    textArea.style.cssText = "resize:none;padding:5px;margin-bottom:5px;border:1px solid #ccc;border-radius:10px;font-size:14px;";
    textArea.placeholder = "Enter for new lines"

    const addButton = document.createElement("button");
    addButton.innerText = "ADD";
    addButton.style.cssText = "background-color:#59B892;color:white;font-weight:bold;padding:10px 20px;border:none;border-radius:10px;cursor:pointer;font-size:14px;";

    inputField.appendChild(textArea);
    inputField.appendChild(addButton);
    const isHasInputField = document.getElementById("inputField");
    if (!isHasInputField) {
        newDiv.insertBefore(inputField, newDiv.firstChild);
    }

    addButton.onclick = function () {
        const lines = textArea.value.split('\n');
        lines.forEach(function (line) {
            const trimmedLine = line.trim();
            if (trimmedLine !== "") {
                buttonList.push(trimmedLine);
            }
        });
        addNewButton.style.display = 'block';
        add_text();
        textArea.value = "";

    }
}


function hideElements() {
    const classesToHide = ['.caption__logo', '.online.visible', '.caption__buttons', '.remote-video__watermark', '.social-button','.caption.remote-video__info'];
    classesToHide.forEach(function (className) {
        document.querySelectorAll(className).forEach(function (element) {
            element.setAttribute('hidden', '');
        });
    });
}


function createButton(text, container) {
    const buttonContainer = document.createElement("div");
    const button = document.createElement("button");
    const closeButton = document.createElement("span");

    
    buttonContainer.style.cssText = "margin: 5px; display: inline-block;";

    
    button.textContent = text;
    button.style.cssText = "padding: 10px 20px; border: none; border-radius: 25px; color: black; font-size: 14px; cursor: pointer; outline: none; box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);";
    
    
    const color_list = "#FFD2D2,#FFC2D2,#FFD2FF,#C2D2FF,#D2FFFF,#D2FFD2,#D2FFC2,#FFFFD2,#FFD2A0,#FFD2C2,#FFC2A0,#FFC2C2,#A0D2FF,#A0C2FF,#C2D2FF,#C2C2FF,#A0FFC2,#C2FFA0,#D2A0FF,#C2A0FF,#FFA0D2,#FFA0C2,#A0FFD2,#C2FFC2,#D2A0C2,#C2A0D2,#A0D2C2,#C2D2A0,#A0C2D2,#C2C2A0".split(",");
    const color = color_list[Math.floor(Math.random() * color_list.length)];
    button.style.backgroundColor = color;

    
    closeButton.textContent = "×";
    closeButton.style.cssText = "background-color: #ccc; color: white; border-radius: 50%; width: 20px; height: 20px; display: inline-block; text-align: center; line-height: 20px; cursor: pointer;";

    
    buttonContainer.appendChild(button);
    if (text !== "ADD") {
        buttonContainer.appendChild(closeButton);
    }else{
        button.textContent = "+ New Caption";
        button.style.backgroundColor = "#59B892";
        button.style.width = "150px";
        button.style.color = "white";
        button.style.fontWeight = "bold";
        button.id = "addBtn";
    }

    
    closeButton.onclick = function () {
        const index = buttonList.indexOf(text);
        buttonList.splice(index, 1);
        add_text();
    };

    
    button.onclick = function () {
        if (text == 'ADD') {
            addTextContent();
        } else {
            fill(text);
            localStorage.setItem("autosend_key",btoa(text))
        }
    };

    container.appendChild(buttonContainer);
}




function fill(text) {
    const formInput = document.getElementById("chat-text");
    formInput.focus();
    formInput.value = text;
    const enterKeyEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true,
    });
    formInput.dispatchEvent(enterKeyEvent);
}
initButtonList();
hideElements();


function main() {
    checkEstabilished();
    initSkip();
    const wrapper = document.querySelector(".chat-container");
    if (!wrapper) return;
    
    buttonList.forEach(function (text) {
        createButton(text, newDiv);
    });
    const newWrapper = document.createElement("div");
    newWrapper.insertBefore(newDiv, newWrapper.firstChild);
    newWrapper.style.cssText = "background-color:#E4E4E4;max-width:250px;height:auto;overflow-y:scroll;overflow-x:hidden;display:flex;flex-flow:row wrap;border:1px solid grey;border-radius:30px;align-items:center;justify-content:center;padding:5px;margin:10px; min-width:230px;";
    newWrapper.style.scrollbarWidth = "thin";
    newWrapper.style.scrollbarColor = "#888 #f0f0f0";
    const label = document.createElement('label');
    label.className = 'toggle-btn';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'toggle';
    const span = document.createElement('span');
    span.className = 'slider';
    input.style.display = 'none'; 
    label.style.display = 'inline-block';
    label.style.width = '40px';
    label.style.height = '23px';
    label.style.position = 'relative';
    span.style.position = 'absolute';
    span.style.cursor = 'pointer';
    span.style.top = '0';
    span.style.left = '0';
    span.style.right = '0';
    span.style.bottom = '0';
    span.style.backgroundColor = '#ccc';
    span.style.transition = '.4s';
    span.style.borderRadius = '34px';

    
    const sliderBefore = document.createElement('span');
    sliderBefore.style.position = 'absolute';
    sliderBefore.style.content = '""';
    sliderBefore.style.height = '15px';
    sliderBefore.style.width = '15px';
    sliderBefore.style.left = '4px';
    sliderBefore.style.bottom = '4px';
    sliderBefore.style.backgroundColor = 'white';
    sliderBefore.style.transition = '.4s';
    sliderBefore.style.borderRadius = '50%';
    
    span.appendChild(sliderBefore);
    input.addEventListener('change', function() {
      if (input.checked) {
        span.style.backgroundColor = '#2196F3';
        sliderBefore.style.transform = 'translateX(17px)';
      } else {
        span.style.backgroundColor = '#ccc';
        sliderBefore.style.transform = 'translateX(0)';
      }
      localStorage.setItem('autoSend', input.checked);
    });
    
    label.appendChild(input);
    label.appendChild(span);
    const labelTxt = document.createTextNode('AutoSend');
    const labelText = document.createElement('span');
    labelText.style.cssText = "font-size:12px;font-weight:bold;"
    labelText.appendChild(labelTxt);
    newWrapper.insertBefore(labelText,newWrapper.firstChild);
    newWrapper.insertBefore(label,newWrapper.firstChild);
    wrapper.insertBefore(newWrapper, wrapper.firstChild);

    
    document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Control') {
            const next = document.querySelector('.start-button');
            if (next) next.click();
        }

        if (event.key === 'Escape') {
            window.location = "https://www.google.com/search?q=deepseek+ai"
        }else{
            console.log(event);
        }
    });
}

function add_text() {
    newDiv.innerHTML = "";
    buttonList.forEach(function (text) {
        createButton(text, newDiv);
    });
    localStorage.setItem("list_text", JSON.stringify(buttonList));
}


function initSkip() {
    
    function checkForPopup() {
        const popUp = document.getElementById("ShowFacePopup");
        if (popUp) {
            
            const skip = document.querySelector(".ok");
            if (!skip) {
                console.log("Skip button not found");
                return;
            }
            if (skip.classList.contains("disabled")) {
                    skip.classList.remove("disabled");
                    skip.classList.add("enabled");
                    skip.click();
                    console.log("wait time skipped");
            }
        }
    }
    checkForPopup();
    const intervalId = setInterval(checkForPopup, 1000); 
    window.addEventListener('beforeunload',function() {
        clearInterval(intervalId);
    });
}

function keyisgenerated(key){
    if(localStorage.getItem("autosend_key") != null){
        if (localStorage.getItem("autosend_key") == key){
            return false;
        }else{
            localStorage.setItem("autosend_key",key);
            return true;
        }
    }else{
        localStorage.setItem("autosend_key",key);
        return true;
    }
}
var sent = false;
function autoSend(){
    var txt = localStorage.getItem("autosend_key") != null ? atob(localStorage.getItem("autosend_key")) : '';
    var buble = document.querySelector(".message-bubble");
    var estabilished = "";
    if (buble){
        estabilished = buble.textContent || buble.innertext;
    }
    if (estabilished.includes("Connection established.")){
        if (keyisgenerated(btoa(txt)) == false){
            if (localStorage.getItem("autoSend") == 'true'){
                if (!sent){
                    fill(txt);
                    sent = true;
                }
            }
        }
        
    }else{
        sent = false;
    }
}

function checkEstabilished(){
    console.log("estabilished called");
    const intervalId = setInterval(autoSend, 1000); 
    window.addEventListener('beforeunload',function() {
        clearInterval(intervalId);
    });
}


if (!document.getElementById("myContainer")){
            main();
}

