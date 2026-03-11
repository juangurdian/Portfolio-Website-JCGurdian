"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const FresnelShaderMaterial = shaderMaterial(
  {
    color: new THREE.Color("#00d4ff"),
    fresnelPower: 2.0,
    opacity: 1.0,
    glowIntensity: 0.6,
  },
  // Vertex shader
  `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vViewDir = normalize(-mvPosition.xyz);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment shader
  `
    uniform vec3 color;
    uniform float fresnelPower;
    uniform float opacity;
    uniform float glowIntensity;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      float fresnel = pow(1.0 - abs(dot(vNormal, vViewDir)), fresnelPower);
      vec3 glowColor = color * (glowIntensity + fresnel * 1.5);
      float alpha = (0.15 + fresnel * 0.85) * opacity;
      gl_FragColor = vec4(glowColor, alpha);
    }
  `
);

extend({ FresnelShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      fresnelShaderMaterial: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        color?: THREE.Color | string;
        fresnelPower?: number;
        opacity?: number;
        glowIntensity?: number;
        transparent?: boolean;
        depthWrite?: boolean;
        side?: THREE.Side;
        blending?: THREE.Blending;
      };
    }
  }
}

export { FresnelShaderMaterial };
