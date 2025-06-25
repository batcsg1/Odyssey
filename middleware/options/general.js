const options = (req, res) => {
    const { role } = req.user;
    const methods = role === "NORMAL" ? "GET,OPTIONS" : "GET,PUT,PATCH,DELETE,OPTIONS";
    const permissions = role === "NORMAL" ? "GET all, GET by ID" : "GET all, GET by ID, UPDATE by ID, DELETE by ID"
    res.set({
        "Allow": methods,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": methods,
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Role": role,
        "Access-Control-Permissions": permissions
    });
    res.sendStatus(204);
};

export default options;