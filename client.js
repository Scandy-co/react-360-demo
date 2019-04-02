// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Location } from 'react-360-web';
// import * as THREE from 'three'

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  scene = r360.scene

  // scene.add(new THREE.AmbientLight(0x404040, 5)) // Add soft white light to the scene.

  // Create a location two meters in front of the user
  const location = new Location([0, 0, -0.25]);

  // Render your app content to the default cylinder surface
  r360.renderToLocation(
    r360.createRoot('React360Demo', { scene: r360.scene }),
    location
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
}

window.React360 = { init };
