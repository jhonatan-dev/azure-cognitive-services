const AzureAPI = require("../keys/AzureAPI");
const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require("@azure/ai-text-analytics");

const sentimentAnalyticsClient = new TextAnalyticsClient(
  AzureAPI.Text_Analysis.sentiment_api_url,
  new AzureKeyCredential(process.env.TEXT_ANALYSIS_API_SECRET_1)
);
const keyPhrasesAnalyticsClient = new TextAnalyticsClient(
  AzureAPI.Text_Analysis.keyPhrases_api_url,
  new AzureKeyCredential(process.env.TEXT_ANALYSIS_API_SECRET_1)
);
const languagesAnalyticsClient = new TextAnalyticsClient(
  AzureAPI.Text_Analysis.languages_api_url,
  new AzureKeyCredential(process.env.TEXT_ANALYSIS_API_SECRET_1)
);
const entitiesGeneralAnalyticsClient = new TextAnalyticsClient(
  AzureAPI.Text_Analysis.entities_general_api_url,
  new AzureKeyCredential(process.env.TEXT_ANALYSIS_API_SECRET_1)
);

const entitiesLinkingAnalyticsClient = new TextAnalyticsClient(
  AzureAPI.Text_Analysis.entities_linking_api_url,
  new AzureKeyCredential(process.env.TEXT_ANALYSIS_API_SECRET_1)
);

const entitiesPIIAnalyticsClient = new TextAnalyticsClient(
  AzureAPI.Text_Analysis.entities_pii_api_url,
  new AzureKeyCredential(process.env.TEXT_ANALYSIS_API_SECRET_1)
);

module.exports = {
  sentimentAnalyticsClient,
  keyPhrasesAnalyticsClient,
  languagesAnalyticsClient,
  entitiesGeneralAnalyticsClient,
  entitiesLinkingAnalyticsClient,
  entitiesPIIAnalyticsClient,
};
