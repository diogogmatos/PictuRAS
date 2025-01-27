const express = require("express");
const deleteFile = require("../services/deleteFile");

const router = express.Router();

router.delete("/:userId/:projectId/:stage/:fileName", async (req, res) => {
  const { userId, projectId, stage, fileName } = req.params;

  if (!["src", "preview", "out"].includes(stage)) {
    return res
      .status(400)
      .json({ error: "O estágio deve ser src, preview ou out." });
  }

  try {
    const result = await deleteFile(userId, projectId, stage, fileName);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
