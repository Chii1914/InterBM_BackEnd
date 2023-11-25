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
};

noSqlCliente.getEventoByIdNoSQL = async (req, res, next) => {
  try {
    const evento = await eventoModel.findById(req.params.id_evento);

    if (!evento) {
      return res.status(404).json({
        success: true,
        message: "No hay eventos en mongodb",
        evento,
      });
    }
    return res.status(200).json({
      success: true,
      evento,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

noSqlCliente.getEventoNoSql = async (req, res) => {
  try {
    const evento = await eventoModel.find({}).exec();

    if (evento.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Listando eventos en mongodb",
        evento,
      });
    }

    return res.status(404).json({
      success: true,
      message: "No hay eventos en mongodb",
      evento,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

noSqlCliente.deleteEventoNoSQL = async (req, res, next) => {
  try {
    const evento = await eventoModel.findByIdAndDelete(req.params.id_evento);
    if (!evento) {
      return res.status(404).json({
        success: false,
        message: "Evento no encontrado",
      });
    }
    res.status(200).json({
      success: true,
      message: "Evento eliminado con éxito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export default noSqlCliente;
