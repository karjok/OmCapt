
async function executeContentScript() {
  
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
}


executeContentScript();


document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  document.getElementById('now').textContent = year;
});
