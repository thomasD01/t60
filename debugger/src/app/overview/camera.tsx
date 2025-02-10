'use client';

import { useThree } from '@react-three/fiber';
import React from 'react';

export default function Camera() {
  const { camera } = useThree();

  window.addEventListener('keydown', (e) => {
    if (e.key === 'w') {
      camera.position.z -= 0.1;
    } else if (e.key === 's') {
      camera.position.z += 0.1;
    } else if (e.key === 'a') {
      camera.position.x -= 0.1;
    } else if (e.key === 'd') {
      camera.position.x += 0.1;
    } else if (e.key === 'q') {
      camera.position.y -= 0.1;
    } else if (e.key === 'e') {
      camera.position.y += 0.1;
    }

    camera.updateProjectionMatrix();
  });

  window.addEventListener('wheel', (e) => {
    camera.position.z += e.deltaY * 0.01;
    camera.updateProjectionMatrix();
    console.log('camera:', camera.position);
  });

  return <></>;
}