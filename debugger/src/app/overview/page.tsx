'use client';
import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import Model from '@/components/model';
import Box from '@/components/box';
import Camera from './camera';

export default function OverviewPage() {
  const files = ['helmet.stl'];

  return (
    <div className='w-screen h-screen'>
      <Canvas camera={{ position: [0, 0, 600] }}>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[400, 900, 900]} angle={0.2} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <React.Suspense fallback={null}>
          {files.map(file => (
            <Model key={file} file={`stl/${file}`} />
          ))}
        </React.Suspense>
        <Camera />
      </Canvas>
    </div>
  );
}
