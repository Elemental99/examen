let apuestas_desportivas = []

const postRequest = (req, res) => {
    const apuesta = req.body
    apuestas_desportivas.push(apuesta)
    res.send(apuesta)
}

export { postRequest }
