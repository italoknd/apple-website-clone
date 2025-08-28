import * as THREE from "three";
import { Suspense } from "react";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";

import IPhone from "./IPhone";
import Lights from "./Lights";

function ModelView({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}) {
  return (
    <div>
      <View
        index={index}
        id={gsapType}
        className={`w-full h-[75vh] md:h-[90vh] ${
          index === 2 ? "right-[-100%]" : ""
        }`}
      >
        <ambientLight intensity={0.3} />
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <Lights />
        <OrbitControls
          makeDefault
          ref={controlRef}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          target={new THREE.Vector3(0, 0, 0)}
          onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
        />
        {/* OrbitControls habilita os controles de rotação do objeto */}

        <group
          ref={groupRef}
          name={`${index === 1} ? 'small': 'large'`}
          position={[0, 0, 0]}
        >
          <Suspense
            fallback={
              <Html>
                <div>Loading...</div>
              </Html>
            }
          >
            <IPhone
              scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
              item={item}
              size={size}
            />
          </Suspense>
        </group>
      </View>
    </div>
  );
}

export default ModelView;
