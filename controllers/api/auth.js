const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const transporter = require("../../helpers/configNodemailer");
const generateJWT = require("../../helpers/generateJWT");

const UsuarioDAO = require("../../service/DAO/UsuarioDAO");
const Usuario = new UsuarioDAO();


const createUser = async ( req = request, res = response ) => {

    const { username, password, email, password_repeat } = req.body;

    if( !(username && password && email) ){
        res.status(401).json({ 
            msg: "Todos los campos son requeridos"
        });
        return;
    }
    
    if( password !== password_repeat){
        res.status(401).json({ 
            msg:"No coinciden las contraseñas"
        })
        return;
    }

    const isExistUsername = await Usuario.findOneDocument({ username });
    if(isExistUsername){
        return res.status(401).json({
            msg: `El nombre de usuario ${ username } ya existe`
        })
    }

    const isExistEmail = await Usuario.findOneDocument({ email });
    if(isExistEmail){
        return res.status(401).json({
            msg: `El email ${email} ya existe`
        })
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const obj = {
        username,
        password: hashPassword, 
        email,
        imgUrl: "https://res.cloudinary.com/dyxqlscek/image/upload/v1652413276/mercado-libre/general/perfil-vacio_tnctto.webp"
    }

    const userCreate = await Usuario.createDocument(obj);

    //Envío de correo de bienvenida al usuario registrado.
    await transporter.sendMail({
        from: ' Bienvenido a MercadoLibre <${email}>', // sender address
        to: email, // list of receivers
        subject: "Se ha registrado MercadoLibre | clon ✔", // Subject line
        html: "<h1>Bienvenido a nuesto sitio</h1>", // html body
    });

    //Requisito del ejercicio del curso - enviar email al administrador cuando un usuario se registra
    await transporter.sendMail({
        from: `Nuevo usuario registrado <${email}>`, // sender address
        to: process.env.EMAIL_NODEMAILER_GMAIL, // list of receivers
        subject: `Se registro ${ username }`, // Subject line
        html: "<h1>Nuevo usuario registrado</h1>", // html body
    });

    const token = await generateJWT({ id: userCreate._id, username: userCreate.username, email: userCreate.email });
    res.cookie("auth", {
        token,
        user: {
            id: userCreate._id,
            username: userCreate.username,
            imgUrl: userCreate.imgUrl
        }
    }, { maxAge: 3600000} ).json({token})
}

const loginUser = async ( req = request, res = response ) => {
    const { email, password } = req.body;
    
    const getUser = await Usuario.findOneDocument({ email });
    
    if( !getUser ){
        res.status(401).json({
            msg: "No hay un usuario registrado con este email"
        })
        return;
    }

    const comparePassword = bcrypt.compareSync( password, getUser.password );

    if(!comparePassword){
        res.status(401).json({
            msg: "Email/Contraseña Incorrecta"
        })
        return;
    }

    const token = await generateJWT({id: getUser._id, username: getUser.username, email: getUser.email});
    res.cookie("auth", {
        token,
        user: {
            id: getUser._id,
            username: getUser.username,
            imgUrl: getUser.imgUrl
        }
    }, { maxAge: 3600000}).json({token})
}

const getInfoUser = async ( req = request, res = response ) => {
    const usuario = await Usuario.findDocumentById(req.id);

    res.status(200).json(usuario)
}

const updateUser = async ( req = request, res = response ) => {
    const usuario = await Usuario.findDocumentAndUpdate({_id: req.id}, req.body)

    res.status(201).json(usuario)
}

module.exports = {
    createUser,
    loginUser,
    getInfoUser,
    updateUser
}