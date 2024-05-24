"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExperienceDetails = exports.getEducationDetails = exports.updateExperience = exports.updateEducation = exports.deleteExperience = exports.deleteEducation = exports.addExperience = exports.addEducation = exports.deleteSkill = exports.addSkills = exports.profilePhoto = exports.uploadPhoto = exports.updateBasicDetails = exports.profileDetails = exports.getSkillProfile = exports.getUserProfile = void 0;
const multer_1 = __importDefault(require("multer"));
const education_model_1 = __importDefault(require("../models/education.model"));
const experience_model_1 = __importDefault(require("../models/experience.model"));
const profile_model_1 = __importDefault(require("../models/profile.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userProfile = yield user_model_1.default
            .findById(req.user._id)
            .select("name email phone");
        res.status(200).send({
            message: "Profile fetched successfully",
            profileData: userProfile,
        });
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.getUserProfile = getUserProfile;
const getSkillProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skillProfile = yield profile_model_1.default
            .findOne({ userId: req.user._id })
            .exec();
        res.status(200).send({
            message: "Profile fetched successfully",
            skillProfile: skillProfile,
        });
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.getSkillProfile = getSkillProfile;
const profileDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const educationDetails = yield education_model_1.default
            .find({ userId: req.user._id })
            .exec();
        const experienceDetails = yield experience_model_1.default
            .find({ userId: req.user._id })
            .exec();
        res.status(200).send({
            message: "Profile fetched successfully",
            profileDetails: {
                education: educationDetails,
                experience: experienceDetails,
            },
        });
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.profileDetails = profileDetails;
const updateBasicDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        if (name || email) {
            const updateFields = {};
            if (name)
                updateFields.name = name;
            if (email)
                updateFields.email = email;
            yield user_model_1.default.findByIdAndUpdate(req.user._id, updateFields);
            res.status(200).json({
                message: "Basic details updated successfully",
            });
        }
        else {
            res.status(400).send({
                message: "Please provide a field to update",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.updateBasicDetails = updateBasicDetails;
const uploadPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storage = multer_1.default.memoryStorage();
        const upload = (0, multer_1.default)({ storage: storage });
        upload.single("image")(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(500).send({
                    message: "Something went wrong!",
                });
                throw new Error(err === null || err === void 0 ? void 0 : err.message);
            }
            const file = req.file;
            if (!file || file.size <= 0) {
                res.status(400).send({
                    message: "No file uploaded or file is empty.",
                });
                return;
            }
            try {
                const profile = yield profile_model_1.default
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
                    yield profile.save();
                }
                res.status(200).send({
                    message: "Image uploaded successfully!",
                });
            }
            catch (saveErr) {
                res.status(500).send({
                    message: "Failed to save profile image.",
                });
                throw new Error(saveErr.message);
            }
        }));
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.uploadPhoto = uploadPhoto;
const profilePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield profile_model_1.default
            .findOne({ userId: req.params.userId })
            .exec();
        if (!profile || !profile.photo || !profile.photo.data) {
            return res.status(404).send({
                message: "Image not found.",
            });
        }
        res.set("Content-Type", profile.photo.contentType);
        res.send(profile.photo.data);
    }
    catch (err) {
        res.status(500).send({
            message: "Failed to load image.",
        });
    }
});
exports.profilePhoto = profilePhoto;
const addSkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skills } = req.body;
        if (skills && skills.length > 0) {
            const previousProfile = yield profile_model_1.default
                .findOne({ userId: req.user._id })
                .exec();
            if (previousProfile && previousProfile.skills) {
                const updatedSkills = Array.from(new Set([...previousProfile.skills, ...skills]));
                yield profile_model_1.default.updateOne({ userId: req.user._id }, { skills: updatedSkills });
            }
            else {
                const profile = new profile_model_1.default({
                    skills,
                    userId: req.user._id,
                });
                yield profile.save();
            }
            res.status(200).json({
                message: "Skills added successfully",
            });
        }
        else {
            res.status(400).send({
                message: "Please add one skill",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.addSkills = addSkills;
const deleteSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skillIndex } = req.query;
        if (typeof skillIndex !== "undefined") {
            const previousProfile = yield profile_model_1.default
                .findOne({ userId: req.user._id })
                .exec();
            if (previousProfile && previousProfile.skills) {
                const index = parseInt(skillIndex, 10);
                if (index >= 0 && index < previousProfile.skills.length) {
                    previousProfile.skills.splice(index, 1);
                    yield profile_model_1.default.updateOne({ userId: req.user._id }, { skills: previousProfile.skills });
                    res.status(200).json({
                        message: "Skill deleted successfully",
                    });
                }
                else {
                    res.status(400).send({
                        message: "Invalid skill index",
                    });
                }
            }
            else {
                res.status(404).send({
                    message: "Profile not found",
                });
            }
        }
        else {
            res.status(400).send({
                message: "Skill index is required",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.deleteSkill = deleteSkill;
const addEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { instituteName, courseName, startYear, endYear, percentage } = req.body;
        if (instituteName && courseName && startYear && endYear && percentage) {
            const education = new education_model_1.default({
                instituteName,
                courseName,
                startYear,
                endYear,
                percentage,
                userId: req.user._id,
            });
            yield education.save();
            res.status(200).send({
                message: "Education details added successfully",
            });
        }
        else {
            res.status(400).send({
                message: "Please provide all parameters!",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.addEducation = addEducation;
const addExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyName, designation, startYear, endYear } = req.body;
        if (companyName && designation && startYear && endYear) {
            const education = new experience_model_1.default({
                companyName,
                designation,
                startYear,
                endYear,
                userId: req.user._id,
            });
            yield education.save();
            res.status(200).send({
                message: "Experience details added successfully",
            });
        }
        else {
            res.status(400).send({
                message: "Please provide all parameters!",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.addExperience = addExperience;
const deleteEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { educationId } = req.params;
        if (educationId) {
            yield education_model_1.default.findByIdAndDelete(educationId);
            res.status(200).json({
                message: "Education record deleted successfully",
            });
        }
        else {
            res.status(200).json({
                message: "Education id not provided",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.deleteEducation = deleteEducation;
const deleteExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { experienceId } = req.params;
        if (experienceId) {
            yield experience_model_1.default.findByIdAndDelete(experienceId);
            res.status(200).json({
                message: "Experience record deleted successfully",
            });
        }
        else {
            res.status(200).json({
                message: "Experience id not provided",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.deleteExperience = deleteExperience;
const updateEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { educationId } = req.params;
        const payload = req.body;
        if (educationId && payload) {
            yield education_model_1.default.findByIdAndUpdate(educationId, payload);
            res.status(200).send({
                message: "Education details updated successfully",
            });
        }
        else {
            res.status(400).send({
                message: "Please provide educationId",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.updateEducation = updateEducation;
const updateExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { experienceId } = req.params;
        const payload = req.body;
        if (experienceId && payload) {
            yield experience_model_1.default.findByIdAndUpdate(experienceId, payload);
            res.status(200).send({
                message: "Experience details updated successfully",
            });
        }
        else {
            res.status(400).send({
                message: "Please provide educationId",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.updateExperience = updateExperience;
const getEducationDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { educationId } = req.params;
        if (educationId) {
            const educationDetails = yield education_model_1.default.findById(educationId);
            if (educationDetails) {
                res.status(200).send({
                    message: "Education details fetched successfully",
                    educationDetails: educationDetails,
                });
            }
            else {
                res.status(404).send({
                    message: "No education details found",
                });
            }
        }
        else {
            res.status(400).send({
                message: "Please provide educationId",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.getEducationDetails = getEducationDetails;
const getExperienceDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { experienceId } = req.params;
        if (experienceId) {
            const experienceDetails = yield experience_model_1.default.findById(experienceId);
            if (experienceDetails) {
                res.status(200).send({
                    message: "Experience details fetched successfully",
                    experienceDetails: experienceDetails,
                });
            }
            else {
                res.status(404).send({
                    message: "No experience details found",
                });
            }
        }
        else {
            res.status(400).send({
                message: "Please provide experienceId",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err === null || err === void 0 ? void 0 : err.message,
        });
        throw new Error(err.message);
    }
});
exports.getExperienceDetails = getExperienceDetails;
