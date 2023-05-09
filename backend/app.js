const express = require("express");
const conversionController = require("./dna_to_aa_conversion/converter");
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.get("/dna-to-aa", conversionController);