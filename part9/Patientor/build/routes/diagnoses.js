"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_1 = require("../services/service");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const diagnoses = (0, service_1.getDiagnoses)();
    res.json(diagnoses);
});
exports.default = router;
