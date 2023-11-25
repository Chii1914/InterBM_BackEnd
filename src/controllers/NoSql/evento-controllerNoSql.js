import "../../models/evento/nosql.js";
const noSqlCliente = {};
noSqlCliente.crearEventoNoSQL = async (req, res, next) => {
  try {
    console.log(req.body)
    const evento = new Eventos(req.body);
    await evento.save();

    res.status(200).json({
      success: true,
      message: "Cliente creado en mongodb",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export default noSqlCliente;
