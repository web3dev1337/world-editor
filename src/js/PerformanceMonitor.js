import React, { useEffect, useState } from 'react';
import Stats from 'stats.js';

export function PerformanceMonitor() {
  useEffect(() => {
    // Create performance monitors
    const fps = new Stats();
    const ms = new Stats();
    const mem = new Stats();
    
    // Configure panels
    fps.showPanel(0); // FPS
    ms.showPanel(1);  // MS
    mem.showPanel(2); // MB
    
    // Style containers
    const containers = [fps.dom, ms.dom, mem.dom];
    containers.forEach((dom, i) => {
      dom.style.cssText = `position:fixed;top:${i * 50}px;left:0;cursor:pointer;opacity:0.9;z-index:10000`;
      document.body.appendChild(dom);
    });

    // Animation loop
    function loop() {
      fps.begin();
      ms.begin();
      mem.begin();

      fps.end();
      ms.end();
      mem.end();
      
      requestAnimationFrame(loop);
    }
    
    requestAnimationFrame(loop);

    // Cleanup
    return () => {
      containers.forEach(dom => {
        document.body.removeChild(dom);
      });
    };
  }, []);

  return null;
} 