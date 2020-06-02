"use strict";

const express = require("express");
const router = express.Router();
const {
  entitiesGeneralAnalyticsClient,
  entitiesLinkingAnalyticsClient,
  entitiesPIIAnalyticsClient,
  keyPhrasesAnalyticsClient,
  languagesAnalyticsClient,
  sentimentAnalyticsClient,
} = require("../config/azure-ai");

router.post("/api", async (req, res) => {
  try {
    const { frases } = req.body;
    const sentimentResult = await sentimentAnalyticsClient.analyzeSentiment(
      frases
    );
    const keyPhraseResult = await keyPhrasesAnalyticsClient.extractKeyPhrases(
      frases
    );
    const languageResult = await languagesAnalyticsClient.detectLanguage(
      frases
    );
    const entityGeneralResults = await entitiesGeneralAnalyticsClient.recognizeEntities(
      frases
    );
    const entityLinkingResults = await entitiesLinkingAnalyticsClient.recognizeEntities(
      frases
    );
    const entityPIIResults = await entitiesPIIAnalyticsClient.recognizeEntities(
      frases
    );
    const resultado = {
      idiomas: languageResult,
      palabrasClaves: keyPhraseResult,
      sentimientos: sentimentResult,
      entidades: {
        generales: entityGeneralResults,
        relacionados: entityLinkingResults,
        informacionesPersonales: entityPIIResults,
      },
    };
    res.json(resultado).status(200);
  } catch (error) {
    console.error(error);
    res
      .json({
        mensaje: `HTTP 500: Error Interno en el servidor, más detalle: ${error}`,
      })
      .status(500);
  }
});

router.get("/", async (req, res) => {
  res.render("index");
});

module.exports = router;
