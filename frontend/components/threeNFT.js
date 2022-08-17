import React, { Suspense, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Link from "next/link";

function ModelSeed(props) {
  const { nodes, materials } = useGLTF("/models/seed.glb");
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() / 2;
  });
  return (
    <group {...props} dispose={null} ref={group}>
      <group
        position={[0, -15, 0]}
        rotation={[-Math.PI / 2, 0, 45]}
        scale={0.75}
      >
        <group
          position={[23.3, 0, 64.83]}
          rotation={[0, -0.84, 0]}
          scale={0.76}
        >
          <mesh
            geometry={nodes.cocoa.geometry}
            material={materials["Cocoa Fruit"]}
            position={[-0.51, -30.44, 28.88]}
            rotation={[1.1, 0.08, 0.51]}
            scale={42.44}
          />
        </group>
        <mesh
          geometry={nodes.pot.geometry}
          material={materials["Subsurface Textured"]}
          position={[0, 0, -0.01]}
          scale={15.54}
        />
        <mesh
          geometry={nodes.wooden_rim.geometry}
          material={materials.Wood}
          position={[0, 0, -0.01]}
          scale={15.54}
        />
        <mesh
          geometry={nodes.soil.geometry}
          material={materials["Concrete 1"]}
          position={[0, 0, -0.01]}
          scale={1.55}
        />
      </group>
      <mesh
        geometry={nodes.Box.geometry}
        material={materials.Aurora}
        rotation={[-Math.PI / 2, 0, 45]}
        position={[0, -35, 0]}
        scale={0.8}
      />
    </group>
  );
}

function ModelPlant(props) {
  const { nodes, materials } = useGLTF("/models/plant.glb");
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() / 2;
  });
  return (
    <group {...props} dispose={null} ref={group}>
      <group
        position={[0, -30, 0]}
        rotation={[-Math.PI / 2, 0, -1.64]}
        scale={1}
      >
        <group
          position={[9.66, 7.42, 2.44]}
          rotation={[0, 0, 1.64]}
          scale={0.39}
        >
          <group position={[-13.27, 26.25, 0.59]}>
            <mesh
              geometry={nodes.tree.geometry}
              material={materials["Color 16"]}
              position={[544.45, -321.54, 0]}
              scale={100}
            />
            <mesh
              geometry={nodes.treetop.geometry}
              material={materials["Color 5"]}
              position={[544.45, -321.54, 0]}
              scale={100}
            />
          </group>
        </group>
        <mesh
          geometry={nodes.pot_1.geometry}
          material={materials["Subsurface Textured 1"]}
          position={[0, 0, -0.01]}
          scale={10}
        />
        <mesh
          geometry={nodes.wooden_rim_1.geometry}
          material={materials["Wood 1"]}
          position={[0, 0, -0.01]}
          scale={10}
        />
        <mesh
          geometry={nodes.soil_1.geometry}
          material={materials["Concrete 2"]}
          position={[0, 0, -0.01]}
        />
      </group>
      <mesh
        geometry={nodes.Box.geometry}
        material={materials.Aurora}
        rotation={[-Math.PI / 2, 0, 45]}
        position={[0, -50, 0]}
        scale={0.75}
      />
    </group>
  );
}

function ModelSingleTree(props) {
  const { nodes, materials } = useGLTF("/models/singleTree.glb");
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() / 2;
  });
  return (
    <group {...props} dispose={null} ref={group}>
      <group
        position={[0, -50, 0]}
        rotation={[-Math.PI / 2, 0, -2.9]}
        scale={0.5}
      >
        <group position={[25.94, -3.88, 0.8]}>
          <mesh
            geometry={nodes.tree_crown.geometry}
            material={materials["Color 1"]}
            position={[2313.77, -9.89, 0]}
            rotation={[-0.01, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.trunk_and_branches.geometry}
            material={materials["Color 2"]}
            position={[2313.77, -9.89, 0]}
            rotation={[-0.01, 0, 0]}
            scale={100}
          />
        </group>
      </group>
      <mesh
        geometry={nodes.Box.geometry}
        material={materials.Aurora}
        rotation={[-Math.PI / 2, 0, 45]}
        position={[0, -75, 0]}
        scale={0.75}
      />
    </group>
  );
}

function ModelGroupTree(props) {
  const { nodes, materials } = useGLTF("/models/groupTree.glb");
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() / 2;
  });
  return (
    <group {...props} dispose={null} ref={group}>
      <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.5}>
        <group position={[-100, 150, -100]} scale={0.75}>
          <mesh
            geometry={nodes.tree_crown.geometry}
            material={materials["Color 4"]}
            position={[2313.77, -9.89, 0]}
            rotation={[-0.01, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.trunk_and_branches.geometry}
            material={materials["Color 7"]}
            position={[2313.77, -9.89, 0]}
            rotation={[-0.01, 0, 0]}
            scale={100}
          />
        </group>
        <group position={[160, 50, -100]} scale={0.25}>
          <mesh
            geometry={nodes.treetop.geometry}
            material={materials["Color 8"]}
            position={[11208.48, 0, 0]}
            scale={1000}
          />
          <mesh
            geometry={nodes.trunk_and_branches_1.geometry}
            material={materials["Color 9"]}
            position={[11208.48, 0, 0]}
            scale={1000}
          />
        </group>
      </group>
      <group
        position={[0, -50, 45]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.6}
      >
        <group position={[-19.54, 0, 0]}>
          <mesh
            geometry={nodes.tree_crown_1.geometry}
            material={materials["Color 6"]}
            position={[1365.53, 43.11, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.trunk_and_branches_2.geometry}
            material={materials["Color 3"]}
            position={[1365.53, 43.11, 0]}
            scale={100}
          />
        </group>
      </group>
      <mesh
        geometry={nodes.Box.geometry}
        material={materials.Aurora}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -75, 0]}
        scale={0.75}
      />
    </group>
  );
}

function ModelForest(props) {
  const { nodes, materials } = useGLTF("/models/forest.glb");
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() / 2;
  });
  return (
    <group {...props} dispose={null} ref={group}>
      <group
        position={[-60, -60, 60]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.2}
      >
        <group position={[0, 0, 0]}>
          <mesh
            geometry={nodes.trunk_and_branches.geometry}
            material={materials["Color 11"]}
            position={[544.43, -326.19, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.treetop.geometry}
            material={materials["Color 22"]}
            position={[544.43, -326.19, 0]}
            scale={100}
          />
        </group>
      </group>
      <group
        position={[80, -60, 0]}
        rotation={[-Math.PI / 2, 0, 15]}
        scale={0.2}
      >
        <group position={[0, 0, 0]}>
          <mesh
            geometry={nodes.trunk_and_branches.geometry}
            material={materials["Color 11"]}
            position={[544.43, -326.19, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.treetop.geometry}
            material={materials["Color 12"]}
            position={[544.43, -326.19, 0]}
            scale={100}
          />
        </group>
      </group>
      <group
        position={[-0.07, 0.04, 0.17]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0}
      >
        <group position={[19.03, 18.74, 0.79]}>
          <mesh
            geometry={nodes.tree.geometry}
            material={materials["Color 19"]}
            position={[203.54, -14.46, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.treetop_1.geometry}
            material={materials["Color 20"]}
            position={[203.54, -14.46, 0]}
            scale={100}
          />
        </group>
      </group>
      <group
        position={[-70, -60, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.125}
      >
        <group position={[0, 0, 0]}>
          <mesh
            geometry={nodes.trunk_and_branches_1.geometry}
            material={materials["Color 14"]}
            position={[-1512.58, -358.5, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.tree_crown.geometry}
            material={materials["Color 15"]}
            position={[-1512.58, -358.5, 0]}
            scale={100}
          />
        </group>
      </group>
      <group
        position={[30, -60, -75]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.3}
      >
        <group position={[0, 0, 0]}>
          <mesh
            geometry={nodes.treetop_2.geometry}
            material={materials["Color 17"]}
            position={[204.59, -581.04, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.trunk_and_branches_2.geometry}
            material={materials["Color 18"]}
            position={[204.59, -581.04, 0]}
            scale={100}
          />
        </group>
      </group>
      <group
        position={[10, -60, 75]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.2}
      >
        <group position={[0, 0, 0]}>
          <mesh
            geometry={nodes.treetop_3.geometry}
            material={materials["Color 12"]}
            position={[204.59, -581.04, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.trunk_and_branches_3.geometry}
            material={materials["Color 13"]}
            position={[204.59, -581.04, 0]}
            scale={100}
          />
        </group>
      </group>
      <group
        position={[-75, -60, -75]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.3}
      >
        <group position={[0, 0, 0]}>
          <mesh
            geometry={nodes.treetop_4.geometry}
            material={materials["Color 10"]}
            position={[1362.99, -289, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.trunk_and_branches_4.geometry}
            material={materials["Color 11"]}
            position={[1362.99, -289, 0]}
            scale={100}
          />
        </group>
      </group>
      <group
        position={[10, -60, -10]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.6}
      >
        <group position={[0, 0, 0]}>
          <mesh
            geometry={nodes.tree_crown_1.geometry}
            material={materials["Color 6"]}
            position={[1365.53, 43.11, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.trunk_and_branches_5.geometry}
            material={materials["Color 3"]}
            position={[1365.53, 43.11, 0]}
            scale={100}
          />
        </group>
      </group>
      <group
        position={[75, -60, 75]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.3}
      >
        <group position={[0, 0, 0]}>
          <mesh
            geometry={nodes.tree_crown_2.geometry}
            material={materials["Color 1"]}
            position={[2313.77, -9.89, 0]}
            rotation={[-0.01, 0, 0]}
            scale={100}
          />
          <mesh
            geometry={nodes.trunk_and_branches_6.geometry}
            material={materials["Color 2"]}
            position={[2313.77, -9.89, 0]}
            rotation={[-0.01, 0, 0]}
            scale={100}
          />
        </group>
      </group>
      <mesh
        geometry={nodes.Box.geometry}
        material={materials.Aurora}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.75}
        position={[0, -90, 0]}
      />
    </group>
  );
}

const ThreeNFT = ({ type, pageType }) => {
  if (!type) {
    type = 1;
  }
  if (!pageType) {
    pageType = "component";
  }

  return (
    <Link href={`/nftDetails`}>
      <div
        className={
          pageType === "component"
            ? "three-nft-canvas"
            : "three-nft-page-canvas"
        }
        style={{ cursor: "pointer" }}
      >
        <Canvas camera={{ fov: 35, position: [-500, 250, 0] }} width="200">
          <Suspense fallback={null} />
          {/* <ambientLight /> */}
          <directionalLight intensity={1} position={[-600, 500, 500]} />
          {type === 1 && <ModelSeed />}
          {type === 2 && <ModelPlant />}
          {type === 3 && <ModelSingleTree />}
          {type === 4 && <ModelGroupTree />}
          {type === 5 && <ModelForest />}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
          />
        </Canvas>
      </div>
    </Link>
  );
};

export default ThreeNFT;
