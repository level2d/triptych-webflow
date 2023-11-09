import brushUrl from "@/assets/img/brush.png";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { forwardRef } from "react";

const RipplePlane = forwardRef((props, ref) => {
  const { opacity, rippleSize } = useControls("Ripple Params", {
      opacity: {
          value: 0.08,
          step: 0.01,
          min: 0,
          max: 1,
      },
      rippleSize: {
          value: 200,
          step: 50,
          min: 100,
          max: 500,
      },
  });
  const texture = useTexture(brushUrl);
  return (
      <mesh
          ref={ref}
          position={[0, 0, 0]}
          rotation={[0, 0, 2 * Math.PI * Math.random()]}
          visible={false}
      >
          <planeGeometry args={[rippleSize, rippleSize]} />
          <meshBasicMaterial
              map={texture}
              transparent
              // blending={THREE.AdditiveBlending}
              depthTest={false}
              depthWrite={false}
              needsUpdate
              opacity={opacity}
              // color={'#bdbfc7'}
          />
      </mesh>
  );
});

RipplePlane.displayName = "RipplePlane";

export default RipplePlane;