import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { GLB_ASSET_URLS } from "@/js/core/constants";
import { useStore } from "@/js/lib/store";
import gsap from "gsap";
// import styles from "./styles/Model.module.scss";

import Box from "./Box";
import Label from "./Label";
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
} from "@/js/components/3D/Models";
import { TriptychOutlines } from "@/js/components/3D/Common";
import { TriptychMaterial } from "../../3D/Materials";
import ReflectionModel from "./ReflectionModel";
import WaterModel from "./WaterModel";
import StarsModel from "./StarsModel";

function Model(props) {
    const { nodes /*, materials */ } = useGLTF(GLB_ASSET_URLS.Locations);
    const setTriptychModelUuid = useStore(
        (state) => state.setTriptychModelUuid,
    );

    const currentItemUiVisible = useStore(
        (state) => state.currentItemUiVisible,
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
        nodes.triptych.geometry.computeBoundingBox();
        setBoundingBox(nodes.triptych.geometry.boundingBox);
    }, [setBoundingBox, nodes.triptych.geometry]);

    useEffect(() => {
        // Sync store
        setTriptychModelUuid(tripTychRef.current.uuid);
    }, [setTriptychModelUuid]);

    const careerLabelRef = useRef(null);
    const cultureLabelRef = useRef(null);
    const workLabelRef = useRef(null);

    const onModelEnter = (ref) => {
        if (ref.current) {
            gsap.to(ref.current, {
                opacity: 1,
                duration: 0.5,
                ease: "ease.inOut",
                onStart: () => {
                    ref.current.style.display = "block";
                    ref.current.style.opacity = 0;
                },
            });
        }
    };

    const onModelLeave = (ref) => {
        if (ref.current) {
            gsap.to(ref.current, {
                opacity: 0,
                duration: 0.5,
                ease: "ease.inOut",
                onComplete: () => {
                    ref.current.style.display = "none";
                },
            });
        }
    };

    return (
        <group {...props} dispose={null} scale={0.1}>
            <mesh
                name="TriptychModel"
                geometry={nodes.triptych.geometry}
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
                geometry={nodes.water_objects.geometry}
                // material={nodes.water_objects.material}
            >
                <TriptychMaterial boundingBox={boundingBox} opacity={opacity} />
                <TriptychOutlines opacity={opacity} visible={visible} />
            </mesh>

            <group>
                <Box
                    position={[1, 1, -3]}
                    onModelEnter={() => onModelEnter(careerLabelRef)}
                    onModelLeave={() => onModelLeave(careerLabelRef)}
                >
                    <>
                        <CareersModel />
                    </>
                </Box>
            </group>
            {!currentItemUiVisible && (
                <Html
                    // occlude
                    ref={careerLabelRef}
                    key={"careersLabel"}
                    position={[1.9, 1, -3]}
                    // style={{ display: "none" }}
                >
                    <Label labelType="right" title={"CAREERS"} />
                </Html>
            )}
            {/* <mesh
                geometry={nodes.location_014.geometry}
                material={nodes.location_014.material}
                position={[3, 1, 3]}
            /> */}
            <Box position={[3, 1, 3]}>
                <KeyModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_013.geometry}
                material={nodes.location_013.material}
                position={[-1, 1, 1]}
            /> */}
            <Box position={[-1, 1, 1]}>
                <EyeModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_012.geometry}
                material={nodes.location_012.material}
                position={[1, -3, 1]}
            /> */}
            <Box position={[1, -3, 1]}>
                <SkullModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_011.geometry}
                material={nodes.location_011.material}
                position={[3, -3, -1]}
            /> */}
            <Box position={[3, -3, -1]}>
                <NorthfaceModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_010.geometry}
                material={nodes.location_010.material}
                position={[3, 2.767, -0.849]}
            /> */}
            <Box position={[3, 2.767, -0.849]}>
                <SosModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_009.geometry}
                material={nodes.location_009.material}
                position={[-3, -3, -3]}
            /> */}
            <Box position={[-3, -3, -3]}>
                <CdmModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_008.geometry}
                material={nodes.location_008.material}
                position={[-1, 2.828, 3.158]}
            /> */}
            <Box position={[-1, 2.828, 3.158]}>
                <MethodsModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_007.geometry}
                material={nodes.location_007.material}
                position={[-3, 2.872, 0.821]}
            /> */}
            <Box position={[-3, 2.872, 0.821]}>
                <ContactModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_006.geometry}
                material={nodes.location_006.material}
                position={[-1, -3, 1]}
            /> */}
            <Box position={[-1, -3, 1]}>
                <StoriesModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_005.geometry}
                material={nodes.location_005.material}
                position={[3, -1, 3]}
            /> */}
            <Box
                position={[3, -1, 3]}
                onModelEnter={() => onModelEnter(workLabelRef)}
                onModelLeave={() => onModelLeave(workLabelRef)}
            >
                <WorkModel />
            </Box>
            {!currentItemUiVisible && (
                <Html
                    // occlude
                    ref={workLabelRef}
                    key={"workLabel"}
                    position={[1, -1, 5]}
                    // style={{ display: "none" }}
                >
                    <Label labelType="left" title="WORK" />
                </Html>
            )}
            {/* <mesh
                geometry={nodes.location_004.geometry}
                material={nodes.location_004.material}
                position={[-1, -1, 1]}
            /> */}
            <Box position={[-1, -1, 1]}>
                <ShowreelModel />
            </Box>
            {/* <mesh
                geometry={nodes.location_003.geometry}
                material={nodes.location_003.material}
                position={[1, -1, -1]}
            /> */}
            <Box
                position={[1, -1, -1]}
                onModelEnter={() => onModelEnter(cultureLabelRef)}
                onModelLeave={() => onModelLeave(cultureLabelRef)}
            >
                <CultureModel />
            </Box>
            {!currentItemUiVisible && (
                <Html
                    // occlude
                    ref={cultureLabelRef}
                    key={"cultureLabel"}
                    position={[1.9, -1, -1]}
                    // style={{ display: "none" }}
                >
                    <Label labelType="inner-right" title="CULTURE" />
                </Html>
            )}

            {/* <mesh
                geometry={nodes.location_002.geometry}
                material={nodes.location_002.material}
                position={[-2.882, -1, -2.792]}
            /> */}
            <Box position={[-2.882, -1, -2.792]}>
                <GyroModel />
            </Box>

            {/* <mesh
                geometry={nodes.location_001.geometry}
                material={nodes.location_001.material}
                position={[1, 2.964, -3.531]}
            /> */}
            <Box position={[1, 2.964, -3.531]}>
                <EpbModel />
            </Box>

            <WaterModel />

            <StarsModel />

            <ReflectionModel />
        </group>
    );
}

export default Model;

useGLTF.preload(GLB_ASSET_URLS.Locations);
