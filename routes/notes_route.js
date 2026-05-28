const express = require("express");
const { getNoteId, getNote, addNote, replaceNote, updateNote, delNote, summarizeNote } = require("../controllers/notes_controller");
const { authorize, authorizeOwner, authorizeRead } = require("../middlewares/auth");
const router = express.Router()

router.get("/", authorize, authorizeRead,  getNote);
router.get("/:id", authorize, authorizeOwner, getNoteId);
router.get("/:id/summary", authorize, authorizeOwner, summarizeNote);
router.post("/", authorize,  addNote)
router.put("/:id", authorize, authorizeOwner, replaceNote)
router.patch("/:id", authorize, authorizeOwner, updateNote)
router.delete("/:id", authorize, authorizeOwner, delNote)

module.exports = router