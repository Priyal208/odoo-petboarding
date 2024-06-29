module.exports = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.json({
      success: false,
      status: 401,
      message: "Unauthorized",
      data: null,
    });
  };