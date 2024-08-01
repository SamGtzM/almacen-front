export interface usuariosI{
    id_usuario:         number;
    id_acceso:          number;
    tipo_acceso:        string;
    id_area:            number;
    nombre_area:        string;
    nombre_usuario:     string;
    numero_empleado:    string;
    correo:             string;
    telefono:           string;
    usuario:            string; 
    pass:               string;
    usuario_alta:       string;
    fecha_alta:         Date;
    activo:             number;
}