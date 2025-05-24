"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdooClient = void 0;
// src/client.ts
const xmlrpc_1 = __importDefault(require("xmlrpc"));
const errors_js_1 = require("./errors.js");
class OdooClient {
    constructor(config) {
        this.uid = null;
        this.config = config;
        const protocol = config.url.startsWith('https') ? 'https' : 'http';
        const createClient = protocol === 'https' ? xmlrpc_1.default.createSecureClient : xmlrpc_1.default.createClient;
        this.common = createClient(`${config.url}/xmlrpc/2/common`);
        this.object = createClient(`${config === null || config === void 0 ? void 0 : config.url}/xmlrpc/2/object`);
    }
    methodCall(client, method, params) {
        return new Promise((resolve, reject) => {
            client.methodCall(method, params, (error, value) => {
                if (error) {
                    reject(new Error(String(error)));
                }
                else {
                    resolve(value);
                }
            });
        });
    }
    async version() {
        try {
            return await this.methodCall(this.common, 'version', []);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new errors_js_1.OdooError(`Failed to get version: ${error.message}`);
            }
            throw new errors_js_1.OdooError('Failed to get version');
        }
    }
    async authenticate() {
        try {
            const uid = await this.methodCall(this.common, 'authenticate', [
                this.config.db,
                this.config.username,
                this.config.password,
                {},
            ]);
            if (!uid) {
                throw new errors_js_1.OdooAuthenticationError();
            }
            this.uid = uid;
            return uid;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new errors_js_1.OdooAuthenticationError(error.message);
            }
            throw new errors_js_1.OdooAuthenticationError();
        }
    }
    async execute(model, method, args = [], kwargs = {}) {
        if (!this.uid) {
            await this.authenticate();
        }
        try {
            return await this.methodCall(this.object, 'execute_kw', [
                this.config.db,
                this.uid,
                this.config.password,
                model,
                method,
                args,
                kwargs,
            ]);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new errors_js_1.OdooError(`Method ${method} failed on ${model}: ${error.message}`);
            }
            throw new errors_js_1.OdooError(`Method ${method} failed on ${model}`);
        }
    }
    async search(model, domain, options = {}) {
        return await this.execute(model, 'search', [domain], options);
    }
    async searchCount(model, domain) {
        return await this.execute(model, 'search_count', [domain]);
    }
    async read(model, ids, fields = []) {
        return await this.execute(model, 'read', [ids], { fields });
    }
    async searchRead(model, domain, options = {}) {
        return await this.execute(model, 'search_read', [domain], options);
    }
    async create(model, values) {
        return await this.execute(model, 'create', [values]);
    }
    async write(model, ids, values) {
        return await this.execute(model, 'write', [ids, values]);
    }
    async unlink(model, ids) {
        return await this.execute(model, 'unlink', [ids]);
    }
    async fieldsGet(model, attributes = ['string', 'help', 'type']) {
        return await this.execute(model, 'fields_get', [], { attributes });
    }
}
exports.OdooClient = OdooClient;
