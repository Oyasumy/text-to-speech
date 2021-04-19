import { TypeHeader, typeRes } from "../hook/type";

export const handlePostTextToSpeech = async (input: string, speaker: number, speech: number) => {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "s6GopJmGpsTiGyHiUYm252RsgH960r8Y");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("input", `"${input}"`);
  urlencoded.append("speaker_id", `${speaker}`);
  urlencoded.append("speed", `${speech}`);

  var requestOptions: TypeHeader = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };
 
  var data: typeRes = {
    error_code: -1,
    data: { url: "" },
  };
  await fetch("https://api.zalo.ai/v1/tts/synthesize", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      data = result;
    })
    .catch((error) => console.log("error", error));

  return data;
};
