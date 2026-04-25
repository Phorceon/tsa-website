const fs = require('fs');

// We know the curve is overshooting. 
// A CatmullRomCurve3 is 'centripetal' by default which can overshoot or go too wide.
// But another problem: maybe looking directly AT a point that is moving fast through CatmullRom causes the camera to turn weirdly.
// If the user says "zoom into each building is still bad", maybe the camera gets too CLOSE to the buildings (too wide).
// We should check the original points and adjust them or switch back to interpolateWaypoints with a smoother curve inside it or using `curveType = "chordal"` or `"catmullrom" with tension 0.5`.
