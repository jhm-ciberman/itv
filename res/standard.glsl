[vertex]
out vec2 v_texCoord;
out vec3 v_color;
//uniform mat4 u_matrix;
void main() {
	gl_Position = u_matrix * a_position;
	v_texCoord = a_texCoord;
}

[fragment]
// we need to declare an output for the fragment shader
out vec4 outColor;
in vec2 v_texCoord;
in vec3 v_color;

void main() {
  // Just set the output to a constant redish-purple
  //outColor = vec4(1, .5, 0, 1);
  // outColor = vec4(v_texCoord.x, v_texCoord.y, 0, 1);
  outColor = texture(u_texture, v_texCoord);
}
