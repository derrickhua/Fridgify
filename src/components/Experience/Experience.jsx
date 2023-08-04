import { useThree, extend} from '@react-three/fiber'
import { useGLTF, PresentationControls } from '@react-three/drei'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// extend({ OrbitControls })

export default function Experience()
{
    const fridge = useGLTF('../../../cats_on_a_fridge.glb')
    const { camera, gl } = useThree()

    return <>
        {/* <orbitControls args={ [ camera, gl.domElement ] } /> */}

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } castShadow/>
        <ambientLight intensity={ 0.5 } />
        <PresentationControls
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
            <primitive receiveShadow rotation-y={[-0.75]}object={fridge.scene} scale={0.02} position={[-1, -3.5 , -1]} />
        </PresentationControls>

    </>
}