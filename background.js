chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'saveVideo') {
    
    chrome.storage.local.get('links', function(data) {
      var links = data.links || [];
      links.push({url: message.url, name: message.name, title: message.title, thumb: message.thumb});
      chrome.storage.local.set({ 'links': links });
    });
  }
});
