import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Mahasiswa from "../models/mahasiswa";

export const mahasiswaRouter = express.Router();

mahasiswaRouter.use(express.json());

mahasiswaRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const mahasiswa = await collections.mahasiswa?.find({}).toArray() as unknown as Mahasiswa[];
    res.status(200).send({
      docs: mahasiswa,
    });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

mahasiswaRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const mahasiswa = await collections.mahasiswa?.findOne(query) as unknown as Mahasiswa;

    if (mahasiswa) {
      res.status(200).send(mahasiswa);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

mahasiswaRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newMahasiswa = req.body as Mahasiswa;
    const result = await collections.mahasiswa?.insertOne(newMahasiswa);

    result
      ? res
          .status(201)
          .send(`Successfully created mahasiswa with id ${result.insertedId}`)
      : res.status(500).send("Failed to create mahasiswa.");
  } catch (error) {
    console.error(error);
    res.status(400).send((error as Error).message);
  }
});

mahasiswaRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedMahasiswa: Mahasiswa = req.body as Mahasiswa;
    const query = { _id: new ObjectId(id) };

    const result = await collections.mahasiswa?.updateOne(query, {
      $set: updatedMahasiswa,
    });

    result
      ? res.status(200).send(`Successfully updated mahasiswa with id ${id}`)
      : res.status(304).send(`Mahasiswa with id: ${id} not updated`);
  } catch (error) {
    console.error((error as Error).message);
    res.status(400).send((error as Error).message);
  }
});

mahasiswaRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.mahasiswa?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed mahasiswa with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove mahasiswa with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Mahasiswa with id ${id} does not exist`);
    }
  } catch (error) {
    console.error((error as Error).message);
    res.status(400).send((error as Error).message);
  }
});
