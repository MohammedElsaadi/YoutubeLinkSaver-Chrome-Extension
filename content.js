var addButton = function() {
    var player = document.querySelector('.video-stream');
    if (!player) return;
    
    var button = document.createElement('img');
    button.src = chrome.runtime.getURL("assets/save-white.png");
    button.className = "ytp-button " + "save-btn";

    
    button.addEventListener('click', function() {
      var url = window.location.href;
      var name = document.querySelector('h3#title').textContent;
      var title = document.querySelector('.ytp-title-link').textContent;
      var thumb = "https://i.ytimg.com/vi/" + url.split("v=")[1].split('&')[0] + "/maxresdefault.jpg"
      chrome.runtime.sendMessage({ action: 'saveVideo', url: url, name: name, title: title, thumb: thumb });
    });
    
    var container = document.querySelector('.ytp-right-controls');
    container.appendChild(button);
  };
  
  addButton();
  