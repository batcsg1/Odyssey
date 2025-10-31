const userOptions = (req, res) => {
    const { role } = req.user;

    const methods = role === "NORMAL"
        ? "GET,PUT,PATCH,OPTIONS" :
        "GET,POST,PUT,PATCH,DELETE,OPTIONS,DELETE";

    const permissions = role === "NORMAL"
        ? "GET own user profile; GET own user profile by ID; UPDATE own user profile by ID"
        : role === "ADMIN"
            ? "GET NORMAL & ADMIN users; GET own user profile and NORMAL & ADMIN users by ID; UPDATE own user profile by ID & NORMAL users; CREATE NORMAL users; DELETE NORMAL users"
            : "GET all users; GET own user profile and all users by ID; UPDATE own user profile by ID, NORMAL & ADMIN users; CREATE any user; DELETE NORMAL & ADMIN users"

    res.set({
        "Allow": methods,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": methods,
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Role": role,
        "Access-Control-User-Permissions": permissions
    });
    res.sendStatus(204);
};

export default userOptions;