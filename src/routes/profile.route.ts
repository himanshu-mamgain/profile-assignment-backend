import { Router } from "express";
import { auth } from "../utils/auth";
import {
  getUserProfile,
  profileDetails,
  updateBasicDetails,
  uploadPhoto,
  profilePhoto,
  addSkills,
  addEducation,
  addExperience,
  deleteEducation,
  deleteExperience,
  getSkillProfile,
  deleteSkill,
  updateEducation,
  updateExperience,
  getEducationDetails,
  getExperienceDetails,
} from "../controllers/profile.controller";

const profileRoute = (router: Router) => {
  router.get("/profile", auth, getUserProfile);

  router.post("/update-basic-details", auth, updateBasicDetails);

  router.post("/upload-photo", auth, uploadPhoto);

  router.get("/profile-photo/:userId", profilePhoto);

  router.get("/skill-profile", auth, getSkillProfile);

  router.get("/profile-details", auth, profileDetails);

  router.post("/add-skills", auth, addSkills);

  router.post("/delete-skill", auth, deleteSkill);

  router.post("/add-education", auth, addEducation);

  router.post("/delete-education/:educationId", auth, deleteEducation);

  router.post("/update-education/:educationId", auth, updateEducation);

  router.post("/add-experience", auth, addExperience);

  router.post("/delete-experience/:experienceId", auth, deleteExperience);

  router.post("/update-experience/:experienceId", auth, updateExperience);

  router.get("/education-details/:educationId", auth, getEducationDetails);

  router.get("/experience-details/:experienceId", auth, getExperienceDetails);
};

export default profileRoute;
