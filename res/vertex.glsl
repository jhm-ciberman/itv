#version 300 es

in vec2 a_position;
in vec2 a_texCoord;

uniform mat3 u_matrix;

out vec2 v_texCoord;
out vec3 v_color;
//uniform mat4 u_matrix;
void main() {
	gl_Position = vec4((vec3(a_position, 1) * u_matrix).xy, 0, 1);
	//gl_Position = vec4(a_position * 1.0, 1);
	v_texCoord = a_texCoord;
}