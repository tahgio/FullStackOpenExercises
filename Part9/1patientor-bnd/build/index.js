"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 3001;
//API-PING
app.get("/api/ping", (_req, res) => {
    console.log("there was a ping");
    res.send("pong");
});
//API-PATIENTS
app.get("/api/patients", (_req, _res) => {
    console.log("trying to get patients");
});
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
