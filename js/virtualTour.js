
var vrView;

var cont = 0;

// All the scenes for the experience
var scenes = {
  street1: {
    image: 'img/street1-iloveimg-resized.jpg',
    hotspots: {
      street2: {
        pitch: 0,
        yaw: 0,
        radius: 0.05,
        distance: 1
      }
    }
  },
  street2: {
    image: 'img/street2-iloveimg-resized.jpg',
    hotspots: {
      street1: {
        pitch: 0,
        yaw: 180,
        radius: 0.05,
        distance: 1
      }
    }
  }
};

function onLoad() {
  vrView = new VRView.Player('#vrview', {
    image: 'img/blank.jpg',
    is_stereo: false,
    width: '100%',
    height: 350
  });

  vrView.on('ready', onVRViewReady);
  vrView.on('modechange', onModeChange);
  vrView.on('click', onHotspotClick);
  vrView.on('error', onVRViewError);
}

function onVRViewReady(e) {
  console.log('onVRViewReady');
  loadScene('street1');
}

function onModeChange(e) {
  console.log('onModeChange', e.mode);
}

function onHotspotClick(e) {
  console.log('onHotspotClick', e.id);
  
  if (e.id) {
     cont++;
     if(cont==5){
      cont=0;
      loadScene(e.id);
   }
  }
}

function loadScene(id) {
  console.log('loadScene', id);

  // Set the image
  vrView.setContent({
    image: scenes[id].image,
    is_stereo: false
  });

  // Add all the hotspots for the scene
  var newScene = scenes[id];
  var sceneHotspots = Object.keys(newScene.hotspots);
  for (var i = 0; i < sceneHotspots.length; i++) {
    var hotspotKey = sceneHotspots[i];
    var hotspot = newScene.hotspots[hotspotKey];

    vrView.addHotspot(hotspotKey, {
      pitch: hotspot.pitch,
      yaw: hotspot.yaw,
      radius: hotspot.radius,
      distance: hotspot.distance
    });
  }
}

function onVRViewError(e) {
  console.log('Error! %s', e.message);
}

window.addEventListener('load', onLoad);