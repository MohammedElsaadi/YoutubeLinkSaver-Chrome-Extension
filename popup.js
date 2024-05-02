function displayLinks() {
    var ul = document.getElementById('linksList');
  
    chrome.storage.local.get('links', function(data) {
      var links = data.links || [];
  
      ul.innerHTML = '';
  
      links.forEach(function(link) {
        var li = document.createElement('li');
        var a_link = document.createElement('a');
        var a_img = document.createElement('a');
        var span = document.createElement('span');
        a_link.target="_blank";
        a_link.href = link.url;
        a_link.textContent = "";
        span.textContent = link.name + " - " + link.title;
        a_link.appendChild(span);
  
        a_img.target="_blank";
        a_img.href = link.url;
        a_img.textContent = "";
        
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            console.log("delete pressed");
          chrome.storage.local.get('links', function(data) {
            var links = data.links || [];
            console.log(links);
            console.log(link);
            var index = links.findIndex(function(obj){
                return obj.url === link.url;
            });
            console.log(index);
            if (index !== -1) {
              links.splice(index, 1);
              chrome.storage.local.set({ 'links': links }, function() {
                displayLinks();
              });
            }
          });
        });

        var thumbnailImage = document.createElement('img');
        thumbnailImage.src = link.thumb;
  
        var thumbContainer = document.createElement('div');
        thumbContainer.className = 'thumbContainer';
        a_img.appendChild(thumbnailImage);
        thumbContainer.appendChild(a_img);
        li.appendChild(thumbContainer);

        var infoContainer = document.createElement('div');
        infoContainer.className = 'infoContainer';
        infoContainer.appendChild(a_link);
        infoContainer.appendChild(deleteButton);
        li.appendChild(infoContainer);

        ul.appendChild(li);
      });
    });
  }
  
  displayLinks();
  