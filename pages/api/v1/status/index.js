function status(request, response) {
  response.status(200).json({ key: "Valor" });
}

export default status;
