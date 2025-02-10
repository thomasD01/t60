'use client';
import React, { useRef } from 'react';
import { ThreeElements, useFrame, useLoader, useThree } from '@react-three/fiber'
import type { BufferGeometry, Mesh } from 'three';
import { STLLoader } from 'three/examples/jsm/Addons.js';
import type * as THREE from 'three';

declare global {
  namespace React {
    namespace JSX {
        interface IntrinsicElements extends ThreeElements {
        }
    }
  }
}

type IProps = {
  file: string;
}

export default function Model(props: IProps) {
  const [geometry, setGeometry] = React.useState<BufferGeometry>()
  const ref = useRef<THREE.Mesh>(null)
  let direction: 'left'|'right' = 'left'

  React.useEffect(() => {
    const stlLoader = new STLLoader()
    stlLoader.load(props.file, geo => {
      setGeometry(geo)
    })
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) {
      return
    }
    if(direction === 'left') {
      ref.current.rotation.y += delta * (1 - Math.abs(ref.current.rotation.y)) * 0.1
      if(ref.current.rotation.y > Math.PI / 4) {
        direction = 'right'
      }
    } else {
      ref.current.rotation.y -= delta * (1 - Math.abs(ref.current.rotation.y)) * 0.1
      if(ref.current.rotation.y < -Math.PI / 4) {
        direction = 'left'
      }
    }

  })

  if (!geometry) {
    return null
  }

  return (
    <>
      <mesh ref={ref}>
        <primitive object={geometry} attach="geometry"/>
        <meshStandardMaterial color={"orange"}/>
      </mesh>
    </>
  )
}