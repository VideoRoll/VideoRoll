function rotateVideo() {
  var videos = document.getElementsByTagName('video');
  if(0 == videos.length) {
    return;
  }

  var video = videos[0];
  for(var i=0; i < videos.length; i++) {
    if(videos[i].offsetHeight > 0) {
      video = videos[i];
      break;
    }
  }

  if(video.style.backupRatio === undefined) {
    video.style.backupRatio = video.offsetHeight / video.offsetWidth;
    video.style.backupLeft = video.offsetLeft;
    //console.log("video.style.backupHeight undefined");
  }

  var result = video.style.transform.match(/[0-9]+/);
  if(!result) {
    result = '0';
  }

  var degree = parseInt(result[0]) + 90;
  degree = degree % 360;

  video.style.transform = 'rotateZ(XXdeg)'.replace('XX', degree);

  var offsetWidth = video.offsetHeight / video.style.backupRatio;
  if(180 == degree || 0 == degree) {
    video.style.width = parseInt(offsetWidth) + "px";
    video.style.left = video.style.backupLeft;
  } else {
    video.style.width = video.offsetHeight + "px";
    video.style.left = parseInt((offsetWidth - video.offsetWidth) / 2) + "px"; 
  }

  /*console.log("video degree = ");
  console.log(degree);
  console.log("video.style.height = ");
  console.log(video.style.height);
  console.log("video.style.width = ");
  console.log(video.style.width);
  console.log("video.style.left = ");
  console.log(video.style.left);

  console.log("video.offsetHeight = ");
  console.log(video.offsetHeight);
  console.log("video.offsetWidth= ");
  console.log(video.offsetWidth);
  console.log("video.style.backupRatio = ");
  console.log(video.style.backupRatio);*/
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: rotateVideo 
  });
});
