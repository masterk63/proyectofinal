export default class Usuario {
    idUsuario: number;
    mail: string;
    usuario: string;
    nombre: string;
    apellido: string;
    institucion: string;
    grado: string;
    residencia: string;
    fotoPerfil: string;
    estado: string;
    registros: number;
    rol:string;

    constructor({ apellido, estado, grado, idUsuario, institucion, mail, nombre, registros, residencia, usuario,rol }) {
        this.apellido = apellido;
        this.estado = estado;
        this.grado = grado;
        this.idUsuario = idUsuario;
        this.institucion = institucion;
        this.mail = mail;
        this.nombre = nombre;
        this.registros = registros;
        this.residencia = residencia;
        this.usuario = usuario;
        this.rol = rol;
    }

    get filtro() {
        return this.mail + ' ' + this.apellido + ' ' + this.nombre;
    }
}