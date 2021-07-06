const asyncHandler = require("../middleware/async");

// @desc      Get all user profile
// @route     GET /api/v1/profile
// @access    private
exports.getProfile = asyncHandler(async (req, res, next) => {
    console.log(req);
    res.status(200).json({data:"hello!"});
});
  