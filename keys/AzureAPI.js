"use strict";

module.exports = {
  Text_Analysis: {
    sentiment_api_url: `${process.env.TEXT_ANALYSIS_API_ENDPOINT}/sentiment?showStats=true&opinionMining=true`,
    keyPhrases_api_url: `${process.env.TEXT_ANALYSIS_API_ENDPOINT}/keyPhrases?showStats=true`,
    languages_api_url: `${process.env.TEXT_ANALYSIS_API_ENDPOINT}/languages?showStats=true`,
    entities_pii_api_url: `${process.env.TEXT_ANALYSIS_API_ENDPOINT}/entities/recognition/pii?showStats=true`,
    entities_linking_api_url: `${process.env.TEXT_ANALYSIS_API_ENDPOINT}/entities/linking?showStats=true`,
    entities_general_api_url: `${process.env.TEXT_ANALYSIS_API_ENDPOINT}/entities/recognition/general?showStats=true`
  },
};
