import Scene from './scene/G3D.Scene';
import Node from './core/G3D.Node';
import Env from './core/G3D.Env';
import Engine from './core/G3D.Engine';

import Buffer from './core/G3D.Buffer';
import BufferView from './core/G3D.BufferView';
import ElementBufferView from './core/G3D.ElementBufferView';
import Texture from './texture/G3D.Texture';
import CubeTexture from './texture/G3D.CubeTexture';

import Skybox from './scene/G3D.Skybox';
import BaseOrthographicCamera from './camera/G3D.BaseOrthographicCamera';
import BasePerspectiveCamera from './camera/G3D.BasePerspectiveCamera';
import RotatePerspectiveCamera from './camera/G3D.RotatePerspectiveCamera';
import RotateOrthographicCamera from './camera/G3D.RotateOrthographicCamera';
import ArcRotateCamera from './camera/G3D.ArcRotateCamera';

import Light from './light/G3D.Light';
import AmbientLight from './light/G3D.AmbientLight';
import DirectionalLight from './light/G3D.DirectionalLight';
import PointLight from './light/G3D.PointLight';

import Mesh from './mesh/G3D.Mesh';
import LineMesh from './mesh/G3D.LineMesh';

import Geometry from './geometry/G3D.Geometry';
import LineGeometry from './geometry/G3D.LineGeometry';

import Material from './material/G3D.Material';
import RawMaterial from './material/G3D.RawMaterial';
import PhongMaterial from './material/G3D.PhongMaterial';
import PBRMaterial from './material/G3D.PBRMaterial';
import PBREnviroment from './material/G3D.PBREnviroment';
import GemMaterial from './material/G3D.GemMaterial';
import StandardMaterial from './material/G3D.StandardMaterial';
import MeshBuilder from './mesh-builder/G3D.MeshBuilder';

import Mat4 from './math/G3D.Mat4';
import Mat3 from './math/G3D.Mat3';
import Vec4 from './math/G3D.Vec4';
import Vec3 from './math/G3D.Vec3';
import Quat from './math/G3D.Quat';
import Ray from './math/G3D.Ray';

import a from './shaders/material-gem.frag.glsl';
console.log(a);

export default {

    Scene,
    Node,
    Env,
    Engine,

    Buffer,
    BufferView,
    ElementBufferView,
    Texture,
    CubeTexture,

    Skybox,

    BasePerspectiveCamera,
    BaseOrthographicCamera,
    RotateOrthographicCamera,
    RotatePerspectiveCamera,

    // TODO: remove this on next major version
    ArcRotateCamera,

    Light,
    DirectionalLight,
    AmbientLight,
    PointLight,

    Mesh,
    LineMesh,

    Geometry,
    LineGeometry,

    Material,
    RawMaterial,
    PhongMaterial,
    PBRMaterial,
    GemMaterial,
    PBREnviroment,

    // TODO: remove this on next major version
    StandardMaterial,

    MeshBuilder,

    Mat4,
    Mat3,
    Vec4,
    Vec3,
    Quat,
    Ray
};