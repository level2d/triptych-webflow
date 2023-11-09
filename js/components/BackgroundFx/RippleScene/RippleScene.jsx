import { OrthographicCamera, useFBO } from "@react-three/drei";
import { useFrame, useThree} from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import RipplePlane from "./RipplePlane";
import BgScene from './BgScene';

export default function RippleScene(props) {
    const { trailLength, trailSize, opacity, delay} = useControls("Ripple Params", {
        trailLength: {
            value: 30,
            step: 1,
            min: 1,
            max: 100,
        },
        trailSize: {
            value: 0.2,
            step: 0.1,
            min: 0.1,
            max: 2.0,
        },
        opacity: {
            value: 0.08,
            step: 0.01,
            min: 0,
            max: 1,
        },
        delay:{
            value: 120,
            step: 10,
            min: 0, 
            max: 150
        }
    });
    const { frequency = 0.01 } = props;
    const ripplesRef = useRef([]);
    const rippleIndex = useRef(0);

    const [bgScene] = useState(() => new THREE.Scene());
    bgScene.background = new THREE.Color("black");

    const bgSceneRef = useRef(null);

    const { viewport } = useThree();

    const prevMouse = useRef({ x: 0, y: 0 });

    useFrame(({ pointer, viewport, gl, scene, camera, clock }) => {
        const currentPointer = { x: pointer.x, y: pointer.y };

        const clientX = (pointer.x * viewport.width) / 2;
        const clientY = (pointer.y * viewport.height) / 2;

        const distance = pointer.distanceTo(prevMouse.current);

        if (frequency < distance) {
            createRipple(clientX, clientY);
            rippleIndex.current = (rippleIndex.current + 1) % trailLength;
        }

        ripplesRef.current.forEach((ripple) => {
            if (!ripple || !ripple?.visible) return;
            ripple.rotation.z += 0.02;
            ripple.material.opacity *= 0.98;
            ripple.scale.x = ripple.scale.y = 0.925 * ripple.scale.x + 0.1;
            if (ripple.material.opacity < 0.002) {
                ripple.visible = false;
            }
        });

        prevMouse.current = currentPointer;

        gl.setRenderTarget(rippleFBOTexture);
        gl.render(scene, camera);
        bgSceneRef.current.material.uniforms.time.value =
            clock.getElapsedTime();
        bgSceneRef.current.material.uniforms.uDisplacement.value =
            rippleFBOTexture.texture;
        gl.setRenderTarget(null);
        gl.render(bgScene, camera);
    });

    const rippleFBOTexture = useFBO(viewport.width, viewport.height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
    });

    const createRipple = (x, y) => {
       const timer = setTimeout(()=>{

            const mesh = ripplesRef?.current?.[rippleIndex.current];
            if (!mesh) return;
            mesh.visible = true;
            mesh.position.set(x, y, 0);
            mesh.scale.x = mesh.scale.y = trailSize;
            mesh.material.opacity = opacity;
        },delay)

        return ()=> clearTimeout(timer);
    };

    return (
        <>
            <OrthographicCamera
                makeDefault
                position={[0, 0, 2]}
                args={[-1, 1, 1, -1, 1, 1000]}
                aspect={viewport.width / viewport.height}
            />
            {new Array(trailLength).fill(null).map((_, i) => (
                <RipplePlane
                    ref={(el) => (ripplesRef.current[i] = el)}
                    key={i}
                />
            ))}
            <BgScene ref={bgSceneRef} />
        </>
    );
}
