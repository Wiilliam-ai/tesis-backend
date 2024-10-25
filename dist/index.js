"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const envs_config_1 = require("./config/envs.config");
app_1.app.listen(envs_config_1.PORT, () => {
    console.log('Server is running at http://localhost:3000');
});
