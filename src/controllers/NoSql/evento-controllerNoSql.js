import eventoModel from "../../models/evento/nosql.js";
const noSqlCliente = {};
noSqlCliente.crearEventoNoSQL = async (req, res, next) => {
  try {
    const evento = new eventoModel(req.body);
    await evento.save();

    res.status(200).json({
      success: true,
      message: "Cliente creado en mongodb",
    });
  } catch (error) {
    console.log("error");
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

noSqlCliente.updateEventoNoSQL = async (req, res) => {
  try {
    const evento = await eventoModel.findByIdAndUpdate(
      req.params.id_evento,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Evento actualizado",
      evento,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
}

export default noSqlCliente;
