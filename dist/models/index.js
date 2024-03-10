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
exports.deleteHeaderDetail = exports.patchUpdateHeaderDetail = exports.postCreateHeaderDetail = exports.getListModelJoin = exports.getListModel = void 0;
const database_1 = require("../config/database");
const getListModel = (param1) => {
    const SqlSelect = `
    SELECT * FROM m_customer WHERE kode_cust = ${param1}
  `;
    return database_1.default.execute(SqlSelect);
};
exports.getListModel = getListModel;
const getListModelJoin = (param1) => {
    const SqlSelect = `
  SELECT 
  m_customer.*,
  d_customer.*
FROM 
  m_customer
JOIN 
  d_customer ON m_customer.kode_cust = d_customer.kode_cust
WHERE 
  m_customer.kode_cust = '${param1}';
  `;
    return database_1.default.execute(SqlSelect);
};
exports.getListModelJoin = getListModelJoin;
const postCreateHeaderDetail = (body) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield database_1.default.getConnection();
        yield connection.beginTransaction();
        // Query untuk menyimpan data header
        const SqlQueryHeader = `
      INSERT INTO m_customer
      (nama_cust, alamat_cust, telp_cust, email_cust)
      VALUES (?, ?, ?, ?)
    `;
        const headerValues = [
            body.nama_cust,
            body.alamat_cust,
            body.telp_cust,
            body.email_cust,
        ];
        yield connection.execute(SqlQueryHeader, headerValues);
        // Ambil nilai kode_cust yang baru saja dimasukkan
        const [lastInsertIdRows] = yield connection.query("SELECT LAST_INSERT_ID() as lastInsertId");
        if (!lastInsertIdRows ||
            lastInsertIdRows.length === 0 ||
            !lastInsertIdRows[0].lastInsertId) {
            throw new Error("Gagal mendapatkan kode_cust dari header");
        }
        const kode_cust = lastInsertIdRows[0].lastInsertId;
        // Loop untuk menyimpan data detail
        for (const detail of body.detail) {
            const SqlQueryDetail = `
        INSERT INTO d_customer
        (kode_cust, tanggal_lahir, jenis_kelamin, pekerjaan)
        VALUES (?, ?, ?, ?)
      `;
            const detailValues = [
                kode_cust, // Gunakan nilai kode_cust yang baru saja dimasukkan
                detail.tanggal_lahir,
                detail.jenis_kelamin,
                detail.pekerjaan,
            ];
            const [detailResult] = yield connection.execute(SqlQueryDetail, detailValues);
            if (!detailResult) {
                throw new Error("Gagal menyimpan detail");
            }
        }
        yield connection.commit();
        return kode_cust;
    }
    catch (error) {
        if (connection) {
            yield connection.rollback();
        }
        throw error;
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.postCreateHeaderDetail = postCreateHeaderDetail;
const patchUpdateHeaderDetail = (body) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield database_1.default.getConnection();
        yield connection.beginTransaction();
        // Delete detail berdasarkan kode_cust
        const SqlDeleteDetail = `DELETE FROM d_customer WHERE kode_cust = ?`;
        const deleteResult = yield connection.execute(SqlDeleteDetail, [
            body.kode_cust,
        ]);
        if (!deleteResult) {
            throw new Error("Gagal menghapus detail");
        }
        // Update data header m_customer
        const SqlQueryHeader = `
      UPDATE m_customer SET
      nama_cust = ?,
      alamat_cust = ?,
      telp_cust = ?,
      email_cust = ?
      WHERE kode_cust = ?
    `;
        const headerValues = [
            body.nama_cust,
            body.alamat_cust,
            body.telp_cust,
            body.email_cust,
            body.kode_cust,
        ];
        const [headerResult] = yield connection.execute(SqlQueryHeader, headerValues);
        // Insert data detail d_customer
        for (const detail of body.detail) {
            const SqlQueryDetail = `
        INSERT INTO d_customer
        (kode_cust, tanggal_lahir, jenis_kelamin, pekerjaan)
        VALUES (?, ?, ?, ?)
      `;
            const detailValues = [
                body.kode_cust,
                detail.tanggal_lahir,
                detail.jenis_kelamin,
                detail.pekerjaan,
            ];
            const [detailResult] = yield connection.execute(SqlQueryDetail, detailValues);
            if (!detailResult) {
                throw new Error("Gagal menyimpan detail");
            }
        }
        // Commit transaksi
        yield connection.commit();
        return headerResult;
    }
    catch (error) {
        // Rollback transaksi jika terjadi kesalahan
        if (connection) {
            yield connection.rollback();
        }
        throw error;
    }
    finally {
        // Selalu pastikan untuk melepas koneksi setelah selesai
        if (connection) {
            connection.release();
        }
    }
});
exports.patchUpdateHeaderDetail = patchUpdateHeaderDetail;
const deleteHeaderDetail = (body) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield database_1.default.getConnection();
        yield connection.beginTransaction();
        const SqlDeleteDetail = `DELETE FROM d_customer WHERE kode_cust = ?`;
        const deleteResult = yield connection.execute(SqlDeleteDetail, [
            body.kode_cust,
        ]);
        if (!deleteResult) {
            throw new Error("Gagal menghapus detail");
        }
        const SqlDelete = `DELETE FROM m_customer WHERE kode_cust = ?`;
        const deleteResultHeader = yield connection.execute(SqlDelete, [
            body.kode_cust,
        ]);
        if (!deleteResultHeader) {
            throw new Error("Gagal menghapus header");
        }
        yield connection.commit();
        return [deleteResult, deleteResultHeader];
    }
    catch (error) {
        if (connection) {
            yield connection.rollback();
        }
        throw error;
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
});
exports.deleteHeaderDetail = deleteHeaderDetail;
