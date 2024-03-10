import dbPool from "../config/database";

export const getListModel = (param1: string) => {
  const SqlSelect = `
    SELECT * FROM m_customer WHERE kode_cust = ${param1}
  `;
  return dbPool.execute(SqlSelect);
};

// SOAL NO. 5
export const getListModelJoin = (param1: string) => {
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
  return dbPool.execute(SqlSelect);
};

export const postCreateHeaderDetail = async (body: any) => {
  let connection;

  try {
    connection = await dbPool.getConnection();

    await connection.beginTransaction();

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
    await connection.execute(SqlQueryHeader, headerValues);

    const [lastInsertIdRows]: any = await connection.query(
      "SELECT LAST_INSERT_ID() as lastInsertId"
    );

    if (
      !lastInsertIdRows ||
      lastInsertIdRows.length === 0 ||
      !lastInsertIdRows[0].lastInsertId
    ) {
      throw new Error("Gagal mendapatkan kode_cust dari header");
    }

    const kode_cust = lastInsertIdRows[0].lastInsertId;

    for (const detail of body.detail) {
      const SqlQueryDetail = `
        INSERT INTO d_customer
        (kode_cust, tanggal_lahir, jenis_kelamin, pekerjaan)
        VALUES (?, ?, ?, ?)
      `;
      const detailValues = [
        kode_cust,
        detail.tanggal_lahir,
        detail.jenis_kelamin,
        detail.pekerjaan,
      ];
      const [detailResult] = await connection.execute(
        SqlQueryDetail,
        detailValues
      );

      if (!detailResult) {
        throw new Error("Gagal menyimpan detail");
      }
    }

    await connection.commit();

    return kode_cust;
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// SOAL NO. 6
export const patchUpdateHeaderDetail = async (body: any) => {
  let connection;

  try {
    connection = await dbPool.getConnection();

    await connection.beginTransaction();

    const SqlDeleteDetail = `DELETE FROM d_customer WHERE kode_cust = ?`;
    const deleteResult = await connection.execute(SqlDeleteDetail, [
      body.kode_cust,
    ]);

    if (!deleteResult) {
      throw new Error("Gagal menghapus detail");
    }

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
    const [headerResult] = await connection.execute(
      SqlQueryHeader,
      headerValues
    );

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
      const [detailResult] = await connection.execute(
        SqlQueryDetail,
        detailValues
      );

      if (!detailResult) {
        throw new Error("Gagal menyimpan detail");
      }
    }

    await connection.commit();

    return headerResult;
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const deleteHeaderDetail = async (body: any) => {
  let connection;

  try {
    connection = await dbPool.getConnection();

    await connection.beginTransaction();

    const SqlDeleteDetail = `DELETE FROM d_customer WHERE kode_cust = ?`;
    const deleteResult = await connection.execute(SqlDeleteDetail, [
      body.kode_cust,
    ]);

    if (!deleteResult) {
      throw new Error("Gagal menghapus detail");
    }

    const SqlDelete = `DELETE FROM m_customer WHERE kode_cust = ?`;
    const deleteResultHeader = await connection.execute(SqlDelete, [
      body.kode_cust,
    ]);

    if (!deleteResultHeader) {
      throw new Error("Gagal menghapus header");
    }

    await connection.commit();

    return [deleteResult, deleteResultHeader];
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
