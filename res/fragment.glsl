#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;
 
// we need to declare an output for the fragment shader
out vec4 outColor;

in vec2 v_texCoord;
in vec3 v_color;

uniform sampler2D u_texture;

void main() {
  // Just set the output to a constant redish-purple
  // outColor = vec4(1, .5, 0, 1);
  // outColor = vec4(v_texCoord.x, v_texCoord.y, 0, 1);
  outColor = texture(u_texture, v_texCoord);
}