const express = require('express');
const router = express.Router();


/**
 * GET /
 * @description returns all users
 */
router.get("/", async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

/**
 * GET /:id
 * @description returns a user by id
 */
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ msg: "Resource not found!" });
  else res.json(user);
});

/**
 * POST /
 * @description creates a new user
 */
router.post("/", async (req, res) => {
  try {
   const user = await User.create(req.body);
   await Profile.create({user_id: user._id});
 
   res.status(203).json(user);
 
  } catch (error) {
   console.log(error);
  }
 });

/**
 * PUT /:id
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
    res.json(updatedUser);

  } catch (error) {
    console.log(error);
    res.json({msg: 'User Not found!'})
  }
});

/**
 * DELETE /:id
 */
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.json({msg: "User deleted", deletedUser});
    } catch (error) {
        console.log(error);
    }
});

export default router;
