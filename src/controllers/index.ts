// src/controllers/index.ts
import { Request, Response } from "express";
import axios from "axios";
import dbPool from "../config/database";
import {
  getListModel,
  getListModelJoin,
  postCreateHeaderDetail,
  patchUpdateHeaderDetail,
  deleteHeaderDetail,
} from "../models/index";

export const getListController = async (req: Request, res: Response) => {
  try {
    // SOAL NO. 9
    const param1: string | undefined = req.query.param1 as string | undefined;
    if (!param1) {
      return res
        .status(400)
        .json({ message: "Parameter 'param1' is required." });
    }
    const [data] = await getListModel(param1);

    res.json({
      status: true,
      message: "getList Success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

export const getListFromExternalController = async (
  req: Request,
  res: Response
) => {
  try {
    const param1: string | undefined = req.query.param1 as string | undefined;
    if (!param1) {
      return res
        .status(400)
        .json({ message: "Parameter 'param1' is required." });
    }
    // SOAL NO. 3
    const apiExternal = await axios.get(`https://dummyjson.com/products/1`);

    const externalData = apiExternal.data;

    const [localData] = await getListModel(param1);

    const combinedData = {
      externalData: externalData,
      localData: localData,
    };

    res.json({
      status: true,
      message: "Get data from external & local successful",
      data: combinedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

export const getListJoinController = async (req: Request, res: Response) => {
  try {
    const param1: string | undefined = req.query.param1 as string | undefined;
    if (!param1) {
      return res
        .status(400)
        .json({ message: "Parameter 'param1' is required." });
    }

    const [data] = await getListModelJoin(param1);

    res.json({
      status: true,
      message: "Data retrieval successful",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

export const postCreateHeaderDetailController = async (
  req: Request,
  res: Response
) => {
  let connection;

  const { body } = req;

  try {
    connection = await dbPool.getConnection();

    await connection.query("START TRANSACTION");

    try {
      const headerResult = await postCreateHeaderDetail(body);

      await connection.query("COMMIT");
    } catch (error) {
      console.error(error);

      await connection.query("ROLLBACK");

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
  } catch (error) {
    console.error(error);

    return res.json({
      status: false,
      message: "Server Error POST",
      serverMessage: error,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const patchUpdateHeaderDetailController = async (
  req: Request,
  res: Response
) => {
  let connection;

  const { body } = req;

  try {
    connection = await dbPool.getConnection();

    await connection.query("START TRANSACTION");

    try {
      const headerResult = await patchUpdateHeaderDetail(body);

      await connection.query("COMMIT");
    } catch (error) {
      console.error(error);

      await connection.query("ROLLBACK");

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
  } catch (error) {
    console.error(error);

    return res.json({
      status: false,
      message: "Server Error POST",
      serverMessage: error,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const deleteHeaderDetailController = async (
  req: Request,
  res: Response
) => {
  let connection;

  const { body } = req;

  try {
    connection = await dbPool.getConnection();

    await connection.query("START TRANSACTION");

    try {
      const headerResult = await deleteHeaderDetail(body);

      await connection.query("COMMIT");
    } catch (error) {
      console.error(error);

      await connection.query("ROLLBACK");

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
  } catch (error) {
    console.error(error);

    return res.json({
      status: false,
      message: "Server Error POST",
      serverMessage: error,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
