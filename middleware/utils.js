const isContentTypeApplicationJSON = (req, res, next) => {
  if (req.path === "/api/v1.1/auth/logout") {
    return next(); // skip content-type check on logout
  }

  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    const contentType = req.headers["content-type"];
    if (!contentType || !contentType.startsWith("application/json")) {
      return res.status(409).json({
        error: {
          message: "Content-Type must be application/json",
        },
      });
    }
  }

  next(); // ✅ always call next if valid
};


export default isContentTypeApplicationJSON;