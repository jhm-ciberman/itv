#version 300 es

in vec4 a_position;
in vec2 a_texCoord;


out vec2 v_texCoord;
//uniform mat4 u_matrix;
void main() {
	gl_Position = a_position * .5;
	v_texCoord = a_texCoord;
}