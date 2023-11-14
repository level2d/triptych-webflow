import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLB_ASSET_URLS } from "@/js/core/constants";
import { useStore } from "@/js/lib/store";

import Box from "./Box";
import {
    CareersModel,
    ContactModel,
    CultureModel,
    MethodsModel,
    ShowreelModel,
    StoriesModel,
    WorkModel,
} from "@/js/components/3D/Models";
import { TriptychOutlines } from "@/js/components/3D/Common";
import { TriptychMaterial } from "../../3D/Materials";
import ReflectionModelMobile from "./ReflectionModelMobile";
import WaterModelMobile from "./WaterModelMobile";
import StarsModelMobile from "./StarsModelMobile";

function ModelMobile(props) {
    const { nodes /*, materials */ } = useGLTF(GLB_ASSET_URLS.Locations_Mobile);
    const setTriptychModelUuid = useStore(
        (state) => state.setTriptychModelUuid,
    );
    const opacity = useStore((state) => state.homeSceneOpacity);
    const [boundingBox, setBoundingBox] = useState({
        min: new THREE.Vector3(0, 0, 0),
        max: new THREE.Vector3(1, 1, 1),
    });
    const tripTychRef = useRef(null);

    const visible = useMemo(() => {
        return opacity > 0;
    }, [opacity]);

    useEffect(() => {
        nodes.triptych_mobile.geometry.computeBoundingBox();
        setBoundingBox(nodes.triptych_mobile.geometry.boundingBox);
    }, [setBoundingBox, nodes.triptych_mobile.geometry]);

    useEffect(() => {
        // Sync store
        setTriptychModelUuid(tripTychRef.current.uuid);
    }, [setTriptychModelUuid]);

    return (
        <group {...props} dispose={null} scale={0.1}>
            <mesh
                name="TriptychModel"
                geometry={nodes.triptych_mobile.geometry}
                // material={nodes.triptych.material}
                ref={tripTychRef}
                visible={visible}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <TriptychMaterial boundingBox={boundingBox} opacity={opacity} />
                <TriptychOutlines opacity={opacity} visible={visible} />
            </mesh>
            <mesh
                geometry={nodes.water_objects_moblie.geometry}
                // material={nodes.water_objects.material}
            >
                <TriptychMaterial boundingBox={boundingBox} opacity={opacity} />
                <TriptychOutlines opacity={opacity} visible={visible} />
            </mesh>

            {/* <mesh
                geometry={nodes.water_mobile.geometry}
                material={nodes.water_mobile.material}
                position={[0, -11.044, 0]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={-1}
            /> */}
            <ReflectionModelMobile />

            {/* <mesh
                geometry={nodes.horizon_dome.geometry}
                material={nodes.horizon_dome.material}
            /> */}
            <WaterModelMobile />

            {/* <mesh
                geometry={nodes.stars.geometry}
                material={nodes.stars.material}
            /> */}
            <StarsModelMobile />

            {/* <mesh
                geometry={nodes.location_022.geometry}
                material={nodes.location_022.material}
                position={[-1, -3, -1]}
            /> */}
            <Box position={[-1, -3, -1]}>
                <StoriesModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_021.geometry}
                material={nodes.location_021.material}
                position={[1, -1, 1]}
            /> */}
            <Box position={[1, -1, 1]}>
                <ShowreelModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_020.geometry}
                material={nodes.location_020.material}
                position={[1, 1, -1]}
            /> */}
            <Box position={[1, 1, -1]}>
                <CareersModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_019.geometry}
                material={nodes.location_019.material}
                position={[-1, 2.826, 0.852]}
            /> */}
            <Box position={[-1, 2.826, 0.852]}>
                <MethodsModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_018.geometry}
                material={nodes.location_018.material}
                position={[-1, -1, 1]}
            /> */}
            <Box position={[-1, -1, 1]}>
                <WorkModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_017.geometry}
                material={nodes.location_017.material}
                position={[1, -1, -1]}
            /> */}
            <Box position={[1, -1, -1]}>
                <CultureModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_016.geometry}
                material={nodes.location_016.material}
                position={[1, 2.863, -0.824]}
            /> */}
            <Box position={[1, 2.863, -0.824]}>
                <ContactModel />
            </Box>
        </group>
    );
}

export default ModelMobile;

useGLTF.preload(GLB_ASSET_URLS.Locations_Mobile);
