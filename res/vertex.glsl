out vec2 v_texCoord;
out vec3 v_color;
//uniform mat4 u_matrix;
void main() {
	gl_Position = u_matrix * a_position;
	v_texCoord = a_texCoord;
}