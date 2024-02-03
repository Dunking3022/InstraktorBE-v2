const User = require("../Models/User"); // Replace with your actual model

exports.preVerify = async (req, res) => {
  const id = req.params.id;

  try {
    const currentDocument = await User.findById(id);

    if (!currentDocument) {
      return res.status(404).send("Document Not Found");
    } else if (currentDocument.status === "VERIFIED") {
      return res.status(409).send("Already Verified");
    } else {
      await User.findByIdAndUpdate(id, { status: "VERIFIED" });
      return res.status(200).send("Document Verified");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
