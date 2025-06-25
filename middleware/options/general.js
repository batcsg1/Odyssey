const options = (req, res) => {
    const { role } = req.user;
    const methods = role === "NORMAL" ? "GET,OPTIONS" : "GET,PUT,PATCH,DELETE,OPTIONS";
    res.set({
        "Allow": methods,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": methods,
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    res.sendStatus(204);
};

export default options;