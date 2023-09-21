import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useGLTF, Outlines } from "@react-three/drei";
import { GLB_ASSET_URLS } from "@/js/core/constants";
import { useControls, folder } from "leva";
import { useStore } from "@/js/lib/store";

import Box from "./Box";
import {
    CareersModel,
    CdmModel,
    ContactModel,
    CultureModel,
    EpbModel,
    EyeModel,
    GyroModel,
    KeyModel,
    MethodsModel,
    NorthfaceModel,
    ShowreelModel,
    SkullModel,
    SosModel,
    StoriesModel,
    WorkModel,
} from "../../3D/Models";

function Model(props) {
    const { nodes /*, materials */ } = useGLTF(GLB_ASSET_URLS.Locations);
    const setTriptychModelUuid = useStore(
        (state) => state.setTriptychModelUuid,
    );
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const tripTychRef = useRef(null);
    const grainShaderMaterialRef = useRef();
    const {
        uNoiseScale,
        uNoiseContrast,
        uNoiseScalarDistanceFactor,
        uGradientStop,
        outlineColor,
        outlineThickness,
        uMatcapEnabled,
        uNoiseEnabled,
        uGradientEnabled,
    } = useControls({
        Outlines: folder({
            outlineColor: "#343434",
            outlineThickness: {
                value: 0.02,
                step: 0.01,
                min: 0.01,
                max: 0.1,
            },
        }),
        "Triptych Shader": folder({
            Matcap: folder({
                uMatcapEnabled: true,
            }),
            Noise: folder({
                uNoiseEnabled: true,
                uNoiseScale: {
                    value: 850,
                    min: 10,
                    max: 2000,
                    step: 10,
                },
                uNoiseScalarDistanceFactor: {
                    value: 0.3,
                    min: 0,
                    max: 10,
                    step: 0.1,
                },
                uNoiseContrast: {
                    value: 1.1,
                    min: 0,
                    max: 10,
                    step: 0.1,
                },
            }),
            Gradient: folder({
                uGradientEnabled: true,
                uGradientStop: {
                    value: 0.02,
                    min: 0.0,
                    max: 0.5,
                    step: 0.01,
                },
                uGradientColorA: {
                    value: {
                        r: 255,
                        g: 255,
                        b: 255,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        grainShaderMaterialRef.current.uniforms.uGradientColorA.value =
                            color;
                    },
                },
                uGradientColorB: {
                    value: {
                        r: 119,
                        g: 119,
                        b: 119,
                    },
                    onChange: (v) => {
                        const color = new THREE.Vector3(
                            v.r,
                            v.g,
                            v.b,
                        ).divideScalar(255);
                        grainShaderMaterialRef.current.uniforms.uGradientColorB.value =
                            color;
                    },
                },
            }),
        }),
    });
    useEffect(() => {
        nodes.triptych.geometry.computeBoundingBox();
        setBoundingBox(nodes.triptych.geometry.boundingBox);
    }, [setBoundingBox, nodes.triptych.geometry]);

    useEffect(() => {
        // Sync store
        setTriptychModelUuid(tripTychRef.current.uuid);
    }, []);

    return (
        <group {...props} dispose={null} scale={0.1}>
            <mesh
                name="Triptych"
                castShadow
                receiveShadow
                geometry={nodes.triptych.geometry}
                // material={nodes.triptych.material}
                ref={tripTychRef}
            >
                <grainShaderMaterial
                    uNoiseEnabled={uNoiseEnabled}
                    uNoiseScale={uNoiseScale}
                    uNoiseScalarDistanceFactor={uNoiseScalarDistanceFactor}
                    uNoiseContrast={uNoiseContrast}
                    uBoundingBoxMin={boundingBox.min}
                    uBoundingBoxMax={boundingBox.max}
                    uGradientStop={uGradientStop}
                    uMatcapEnabled={uMatcapEnabled}
                    uGradientEnabled={uGradientEnabled}
                    ref={grainShaderMaterialRef}
                />
                <Outlines thickness={outlineThickness} color={outlineColor} />
            </mesh>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.water.geometry}
                material={nodes.water.material}
            /> */}
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_015.geometry}
                material={nodes.location_015.material}
                position={[1, 1, -3]}
            /> */}
            <Box position={[1, 1, -3]}>
                <CareersModel />
            </Box>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_001.geometry}
                material={nodes.location_001.material}
                position={[1, 3, -3]}
                scale={0.5}
            /> */}
            <Box position={[1, 3, -3]}>
                <EpbModel />
            </Box>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_002.geometry}
                material={nodes.location_002.material}
                position={[-3, -1, -3]}
            /> */}
            <Box position={[-3, -1, -3]}>
                <GyroModel />
            </Box>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_003.geometry}
                material={nodes.location_003.material}
                position={[-3, 3, 1]}
            /> */}
            <Box position={[-3, 3, 1]}>
                <CultureModel />
            </Box>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_004.geometry}
                material={nodes.location_004.material}
                position={[-1, -1, 1]}
                scale={0.5}
            /> */}
            <Box position={[-1, -1, 1]}>
                <ShowreelModel />
            </Box>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_005.geometry}
                material={nodes.location_005.material}
                position={[3, -1, 3]}
            /> */}
            <Box position={[3, -1, 3]}>
                <WorkModel />
            </Box>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_006.geometry}
                material={nodes.location_006.material}
                position={[-1, -3, 1]}
            /> */}
            <Box position={[-1, -3, 1]}>
                <StoriesModel />
            </Box>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_007.geometry}
                material={nodes.location_007.material}
                position={[1, -1, -1]}
                scale={0.5}
            />
            <Box position={[1, -1, -1]}>
                <ContactModel />
            </Box>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_008.geometry}
                material={nodes.location_008.material}
                position={[-1, 3, 3]}
                scale={0.5}
            /> */}
            <Box position={[-1, 3, 3]}>
                <MethodsModel />
            </Box>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_009.geometry}
                material={nodes.location_009.material}
                position={[-3, -3, -3]}
            /> */}
            <Box position={[-3, -3, -3]}>
                <CdmModel />
            </Box>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_010.geometry}
                material={nodes.location_010.material}
                position={[3, 3, -1]}
            /> */}
            <Box position={[3, 3, -1]}>
                <SosModel />
            </Box>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_011.geometry}
                material={nodes.location_011.material}
                position={[3, -3, -1]}
                scale={0.5}
            /> */}
            <Box position={[3, -3, -1]}>
                <NorthfaceModel />
            </Box>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_012.geometry}
                material={nodes.location_012.material}
                position={[1, -3, 1]}
            /> */}
            <Box position={[1, -3, 1]}>
                <SkullModel />
            </Box>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_013.geometry}
                material={nodes.location_013.material}
                position={[-1, 1, 1]}
            /> */}
            <Box position={[-1, 1, 1]}>
                <EyeModel />
            </Box>
            {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.location_014.geometry}
                material={nodes.location_014.material}
                position={[3, 1, 3]}
            /> */}
            <Box position={[3, 1, 3]}>
                <KeyModel />
            </Box>
        </group>
    );
}

export default Model;

useGLTF.preload(GLB_ASSET_URLS.Locations);
