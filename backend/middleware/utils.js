const isContentTypeApplicationJSON = (req, res, next) => {
  const contentType = req.headers["content-type"] || "";

  // Allow multipart/form-data (file uploads)
  if (contentType.startsWith("multipart/form-data")) {
    return next();
  }
  
  if (req.path.endsWith("/auth/logout")) {
    return next();
  }


  if (["POST", "PUT", "PATCH"].includes(req.method)) {
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