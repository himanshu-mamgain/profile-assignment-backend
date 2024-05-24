import multer from "multer";
import educationModel from "../models/education.model";
import experienceModel from "../models/experience.model";
import profileModel from "../models/profile.model";
import userModel from "../models/user.model";
import { errorMonitor } from "nodemailer/lib/xoauth2";

export const getUserProfile = async (req: any, res: any) => {
  try {
    const userProfile = await userModel
      .findById(req.user._id)
      .select("name email phone");

    res.status(200).send({
      message: "Profile fetched successfully",
      profileData: userProfile,
    });
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const getSkillProfile = async (req: any, res: any) => {
  try {
    const skillProfile = await profileModel
      .findOne({ userId: req.user._id })
      .exec();

    res.status(200).send({
      message: "Profile fetched successfully",
      skillProfile: skillProfile,
    });
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const profileDetails = async (req: any, res: any) => {
  try {
    const educationDetails = await educationModel
      .find({ userId: req.user._id })
      .exec();
    const experienceDetails = await experienceModel
      .find({ userId: req.user._id })
      .exec();

    res.status(200).send({
      message: "Profile fetched successfully",
      profileDetails: {
        education: educationDetails,
        experience: experienceDetails,
      },
    });
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const updateBasicDetails = async (req: any, res: any) => {
  try {
    const { name, email } = req.body;

    if (name || email) {
      // Collect fields to update
      const updateFields: any = {};
      if (name) updateFields.name = name;
      if (email) updateFields.email = email;

      // Perform a single update operation
      await userModel.findByIdAndUpdate(req.user._id, updateFields);

      res.status(200).json({
        message: "Basic details updated successfully",
      });
    } else {
      res.status(400).send({
        message: "Please provide a field to update",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const uploadPhoto = async (req: any, res: any) => {
  try {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    upload.single("image")(req, res, async (err: any) => {
      if (err) {
        res.status(500).send({
          message: "Something went wrong!",
        });
        throw new Error(err?.message);
      }

      const file = req.file;

      if (!file || file.size <= 0) {
        res.status(400).send({
          message: "No file uploaded or file is empty.",
        });
        return;
      }

      try {
        const profile = await profileModel
          .findOne({ userId: req.user._id })
          .exec();

        if (!profile) {
          res.status(404).send({
            message: "Profile not found.",
          });
          return;
        }

        if (profile && profile.photo) {
          profile.photo.data = file.buffer;
          profile.photo.contentType = file.mimetype;
          profile.photo.name = file.originalname;
          profile.photo.size = file.size;

          await profile.save();
        }

        res.status(200).send({
          message: "Image uploaded successfully!",
        });
      } catch (saveErr: any) {
        res.status(500).send({
          message: "Failed to save profile image.",
        });
        throw new Error(saveErr.message);
      }
    });
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const profilePhoto = async (req: any, res: any) => {
  try {
    const profile = await profileModel
      .findOne({ userId: req.params.userId })
      .exec();
    if (!profile || !profile.photo || !profile.photo.data) {
      return res.status(404).send({
        message: "Image not found.",
      });
    }

    res.set("Content-Type", profile.photo.contentType);
    res.send(profile.photo.data);
  } catch (err) {
    res.status(500).send({
      message: "Failed to load image.",
    });
  }
};

export const addSkills = async (req: any, res: any) => {
  try {
    const { skills } = req.body;

    if (skills && skills.length > 0) {
      const previousProfile = await profileModel
        .findOne({ userId: req.user._id })
        .exec();

      if (previousProfile && previousProfile.skills) {
        // Merge the new skills with the existing ones and remove duplicates
        const updatedSkills = Array.from(
          new Set([...previousProfile.skills, ...skills])
        );

        // Update the skills in the database
        await profileModel.updateOne(
          { userId: req.user._id },
          { skills: updatedSkills }
        );
      } else {
        const profile = new profileModel({
          skills,
          userId: req.user._id,
        });

        await profile.save();
      }

      res.status(200).json({
        message: "Skills added successfully",
      });
    } else {
      res.status(400).send({
        message: "Please add one skill",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const deleteSkill = async (req: any, res: any) => {
  try {
    const { skillIndex } = req.query;

    if (typeof skillIndex !== "undefined") {
      const previousProfile = await profileModel
        .findOne({ userId: req.user._id })
        .exec();

      if (previousProfile && previousProfile.skills) {
        // Convert skillIndex to an integer
        const index = parseInt(skillIndex, 10);

        // Check if index is valid
        if (index >= 0 && index < previousProfile.skills.length) {
          // Remove the skill at the specified index
          previousProfile.skills.splice(index, 1);

          // Update the profile in the database
          await profileModel.updateOne(
            { userId: req.user._id },
            { skills: previousProfile.skills }
          );

          res.status(200).json({
            message: "Skill deleted successfully",
          });
        } else {
          res.status(400).send({
            message: "Invalid skill index",
          });
        }
      } else {
        res.status(404).send({
          message: "Profile not found",
        });
      }
    } else {
      res.status(400).send({
        message: "Skill index is required",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const addEducation = async (req: any, res: any) => {
  try {
    const { instituteName, courseName, startYear, endYear, percentage } =
      req.body;

    if (instituteName && courseName && startYear && endYear && percentage) {
      const education = new educationModel({
        instituteName,
        courseName,
        startYear,
        endYear,
        percentage,
        userId: req.user._id,
      });

      await education.save();

      res.status(200).send({
        message: "Education details added successfully",
      });
    } else {
      res.status(400).send({
        message: "Please provide all parameters!",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const addExperience = async (req: any, res: any) => {
  try {
    const { companyName, designation, startYear, endYear } = req.body;

    if (companyName && designation && startYear && endYear) {
      const education = new experienceModel({
        companyName,
        designation,
        startYear,
        endYear,
        userId: req.user._id,
      });

      await education.save();

      res.status(200).send({
        message: "Experience details added successfully",
      });
    } else {
      res.status(400).send({
        message: "Please provide all parameters!",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const deleteEducation = async (req: any, res: any) => {
  try {
    const { educationId } = req.params;

    if (educationId) {
      await educationModel.findByIdAndDelete(educationId);

      res.status(200).json({
        message: "Education record deleted successfully",
      });
    } else {
      res.status(200).json({
        message: "Education id not provided",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const deleteExperience = async (req: any, res: any) => {
  try {
    const { experienceId } = req.params;

    if (experienceId) {
      await experienceModel.findByIdAndDelete(experienceId);

      res.status(200).json({
        message: "Experience record deleted successfully",
      });
    } else {
      res.status(200).json({
        message: "Experience id not provided",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const updateEducation = async (req: any, res: any) => {
  try {
    const { educationId } = req.params;
    const payload = req.body;

    if (educationId && payload) {
      await educationModel.findByIdAndUpdate(educationId, payload);

      res.status(200).send({
        message: "Education details updated successfully",
      });
    } else {
      res.status(400).send({
        message: "Please provide educationId",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const updateExperience = async (req: any, res: any) => {
  try {
    const { experienceId } = req.params;
    const payload = req.body;

    if (experienceId && payload) {
      await experienceModel.findByIdAndUpdate(experienceId, payload);

      res.status(200).send({
        message: "Experience details updated successfully",
      });
    } else {
      res.status(400).send({
        message: "Please provide educationId",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const getEducationDetails = async (req: any, res: any) => {
  try {
    const { educationId } = req.params;

    if (educationId) {
      const educationDetails = await educationModel.findById(educationId);

      if (educationDetails) {
        res.status(200).send({
          message: "Education details fetched successfully",
          educationDetails: educationDetails,
        });
      } else {
        res.status(404).send({
          message: "No education details found",
        });
      }
    } else {
      res.status(400).send({
        message: "Please provide educationId",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};

export const getExperienceDetails = async (req: any, res: any) => {
  try {
    const { experienceId } = req.params;

    if (experienceId) {
      const experienceDetails = await experienceModel.findById(experienceId);

      if (experienceDetails) {
        res.status(200).send({
          message: "Experience details fetched successfully",
          experienceDetails: experienceDetails,
        });
      } else {
        res.status(404).send({
          message: "No experience details found",
        });
      }
    } else {
      res.status(400).send({
        message: "Please provide experienceId",
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message: err?.message,
    });
    throw new Error(err.message);
  }
};
