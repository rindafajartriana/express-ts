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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHeaderDetailController = exports.patchUpdateHeaderDetailController = exports.postCreateHeaderDetailController = exports.getListJoinController = exports.getListFromExternalController = exports.getListController = void 0;
const axios_1 = require("axios");
const database_1 = require("../config/database");
const index_1 = require("../models/index");
const getListController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Mengubah nama fungsi menjadi getInfo
    const param1 = req.query.param1;
    try {
        const [data] = yield (0, index_1.getListModel)(param1);
        res.json({
            status: true,
            message: "getList Success",
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
});
exports.getListController = getListController;
const getListFromExternalController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const param1 = req.query.param1;
    try {
        const apiExternal = yield axios_1.default.get(`https://dummyjson.com/products/1`);
        // Mengambil data dari API eksternal
        const externalData = apiExternal.data;
        // Mengambil data dari model lokal
        const [localData] = yield (0, index_1.getListModel)(param1);
        // Menggabungkan data dari API eksternal dan lokal
        const combinedData = {
            externalData: externalData,
            localData: localData,
        };
        res.json({
            status: true,
            message: "Get data from external & local successful",
            data: combinedData,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
});
exports.getListFromExternalController = getListFromExternalController;
const getListJoinController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Memeriksa apakah parameter 'param1' ada dalam query
        const param1 = req.query.param1;
        if (!param1) {
            return res
                .status(400)
                .json({ message: "Parameter 'param1' is required." });
        }
        // Memanggil fungsi getListModelJoin dari model dengan menggunakan nilai param1
        const [data] = yield (0, index_1.getListModelJoin)(param1);
        // Memberikan respons dengan data yang diperoleh dari model
        res.json({
            status: true,
            message: "Data retrieval successful",
            data: data,
        });
    }
    catch (error) {
        // Menangani error yang terjadi selama proses
        res.status(500).json({
            message: "Server Error",
            serverMessage: error,
        });
    }
});
exports.getListJoinController = getListJoinController;
const postCreateHeaderDetailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    const { body } = req;
    try {
        connection = yield database_1.default.getConnection();
        yield connection.query("START TRANSACTION");
        try {
            const headerResult = yield (0, index_1.postCreateHeaderDetail)(body);
            yield connection.query("COMMIT");
        }
        catch (error) {
            console.error(error);
            yield connection.query("ROLLBACK");
            return res.json({
                status: false,
                message: "Server Error POST",
                serverMessage: error,
            });
        }
        return res.status(201).json({
            status: true,
            message: "Simpan Header Detail Success",
            data: body,
        });
    }
    catch (error) {
        console.error(error);
        return res.json({
            status: false,
            message: "Server Error POST",
            serverMessage: error,
        });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.postCreateHeaderDetailController = postCreateHeaderDetailController;
const patchUpdateHeaderDetailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    const { body } = req;
    try {
        connection = yield database_1.default.getConnection();
        yield connection.query("START TRANSACTION");
        try {
            const headerResult = yield (0, index_1.patchUpdateHeaderDetail)(body);
            yield connection.query("COMMIT");
        }
        catch (error) {
            console.error(error);
            yield connection.query("ROLLBACK");
            return res.json({
                status: false,
                message: "Server Error POST",
                serverMessage: error,
            });
        }
        return res.status(201).json({
            status: true,
            message: "Update Header Detail Success",
            data: body,
        });
    }
    catch (error) {
        console.error(error);
        return res.json({
            status: false,
            message: "Server Error POST",
            serverMessage: error,
        });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.patchUpdateHeaderDetailController = patchUpdateHeaderDetailController;
const deleteHeaderDetailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    const { body } = req;
    try {
        connection = yield database_1.default.getConnection();
        yield connection.query("START TRANSACTION");
        try {
            const headerResult = yield (0, index_1.deleteHeaderDetail)(body);
            yield connection.query("COMMIT");
        }
        catch (error) {
            console.error(error);
            yield connection.query("ROLLBACK");
            return res.json({
                status: false,
                message: "Server Error POST",
                serverMessage: error,
            });
        }
        return res.status(201).json({
            status: true,
            message: "Delete Header Detail Success",
            data: body,
        });
    }
    catch (error) {
        console.error(error);
        return res.json({
            status: false,
            message: "Server Error POST",
            serverMessage: error,
        });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.deleteHeaderDetailController = deleteHeaderDetailController;
