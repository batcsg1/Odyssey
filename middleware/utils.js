const isContentTypeApplicationJSON = (req, res, next) => {
  if (req.path === "/api/v1/auth/logout") {
    return next(); // skip content-type check on logout
  }

  // Check if the request method is POST or PUT
  if (req.method === "POST" || req.method === "PUT") {
    // Check if the Content-Type header is application/json
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") {
      return res.status(409).json({
        error: {
          message: "Content-Type must be application/json",
        },
      });
    }
  }
  next();
};

export { isContentTypeApplicationJSON };