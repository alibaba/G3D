# Lights

As we mentioned in the previous chapters, light will affect `StandardMaterial`. There're several types of light, let's see one by one.

## AmbientLight

Ambient light affect the face's color by simple apply to the face's color, without the face's direction. So if there's only ambient light, the scene will look likes that every mesh's materials is RawMaterial. But ambient light is not meaningless, because if there's no ambient light in the scene, certain parts of our scene will be totally black, whick is counter-intutive.

Usually, we set ambient color's intensity as a low number (0.1, for example), and apply other lights to make a reseanable scene.

See the scene with only ambient light:

<iframe class="playground" src="https://alibaba.github.io/G3D/playground/?embed#item=ambient-light"></iframe>

## Directional Light

Directional light is a kind of light like the sunlight. Directional light has a direction (position). The face perpendicular to the direction will be lighted more than the face oblique the light's direction. And the face paralle with the light's direction will be totally not lighted by the light.

<iframe class="playground" src="https://alibaba.github.io/G3D/playground/?embed#item=directional-light"></iframe>

See the example above, check when the light's `direction` is changing, how the light is affecting the cylinder mesh.

```javascript
light1.direction.x = Math.sin(Date.now() / 1000) * 1.0;
```

## Point Light

Point light is a little like directional light, how much the face is lighted depends on the light's direction and the face's direction, but point light has an origin, for each face (each pixel, actually), the light's direction is computed using the pixels position and the light's origin.

See the example.

<iframe class="playground" src="https://alibaba.github.io/G3D/playground/?embed#item=point-light"></iframe>

## Hemisphere Light

Hemisphere light simulate the out-door enviroment light, which has a sky color and a ground color.

See the example.

<iframe class="playground" src="https://alibaba.github.io/G3D/playground/?embed#item=hemisphere-light"></iframe>