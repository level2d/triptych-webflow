// import fragment from "./shader/fragment.glsl";
// import vertex from "./shader/vertex.glsl";
import { RippleMaterial } from "../../3D/Materials";
import { forwardRef } from "react";
// import {
//   // useTexture,
//   shaderMaterial,
// } from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
// import * as THREE from 'three';
// import imgUrl from '@/assets/img/Dustin.png'

const BgScene = forwardRef((props, ref) => {
    const { viewport } = useThree();
    // const texture = useTexture(imgUrl);

    // const BgShaderMaterial = shaderMaterial(
    //     // Uniform
    //     {
    //         time: { value: 0 },
    //         uDisplacement: { value: null },
    //         uTexture: { value: null },
    //         resolution: { value: new THREE.Vector4() },
    //     },
    //     vertex,
    //     fragment,
    // );

    // extend({ BgShaderMaterial });

    return (
        <>
            <mesh ref={ref}>
                <planeGeometry args={[viewport.width, viewport.height]} />
                <RippleMaterial opacity={1} uDisplacement={null} />
                {/* <bgShaderMaterial
                  time={0}
                  uDisplacement={null}
                  uTexture={texture}
                  resolution={
                      new THREE.Vector2(viewport.width, viewport.height)
                  }
              /> */}
            </mesh>
        </>
    );
});

BgScene.displayName = "BgScene";

export default BgScene;
