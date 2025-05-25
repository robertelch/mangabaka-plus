chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchData') {
    sendResponse("Succies")
    //fetch('https://example.com/data')
      //.then(res => res.json())
      //.then(data => sendResponse(data));
    return true; // keep the message channel open for async response
  }
});
