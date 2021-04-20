import { TypeHeader, typeRes } from "../hook/type";
var axios = require("axios");
var qs = require("qs");

export const handlePostTextToSpeech = async (input: string, speaker: number, speech: number) => {
  console.log("par", input, speaker, speech);

  var result: typeRes = {
    error_code: -1,
    data: { url: "" },
  };

  var data = qs.stringify({
    "input": `${input}`,
    "speaker_id": `${speaker}`,
    "speed": `${speech}`,
    "encode_type": 0,
  });
  var config = {
    method: "post",
    url: "https://api.zalo.ai/v1/tts/synthesize",
    headers: {
      "apikey": "s6GopJmGpsTiGyHiUYm252RsgH960r8Y",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response: any) {
      result.data.url = response.data.data.url;
      result.error_code = response.data.error_code;
    })
    .catch(function (error: Error) {
      console.log(error);
    });

  return result;
};
