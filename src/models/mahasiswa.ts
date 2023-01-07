import { ObjectId } from "mongodb";
import Alamat from "./alamat";

export default class Mahasiswa {
  constructor(
    public nama: string,
    public npm: number,
    public alamat: Alamat,
    public hobi: [],
    public id?: ObjectId,
  ){}
}