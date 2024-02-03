
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
require("dotenv").config();

const express = require('express');
const app = express.Router();

const fetch = require("node-fetch");

const API_KEY = process.env.daily_API_KEY;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};

const getRoom = (room) => {
  return fetch(`https://api.daily.co/v1/rooms/${room}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error("error:" + err));
};

const getRoomSession = (room) => {
  return fetch(`https://api.daily.co/v1/logs?mtgSessionId=cfda9ef5-30b2-467d-8ec3-956a6e701539      `, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error("error:" + err));
};

const createRoom = (room) => {
  return fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: room,
      privacy: "private",
      properties: {
        eject_after_elapsed: 4200,
        enable_advanced_chat: true,
        start_video_off: true,
        start_audio_off: false,
        lang: "en",
        enable_people_ui: true,
        enable_emoji_reactions: true,
        enable_hand_raising: true,
        enable_prejoin_ui: true,
        enable_knocking: true,
        enable_screenshare: true,
        enable_video_processing_ui: true,
        enable_chat:true,

      },
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.log("error:" + err));
};

app.get("/meeting/:id", async function (req, res) {
  const roomId = req.params.id;

  const room = await getRoom(roomId);
  if (room.error) {
    // const newRoom = await createRoom(roomId);
    res.status(200).send(room);
  } else {
    res.status(200).send(room);
  }
});


app.get("/session-data/:id", async function (req, res) {
  const roomId = req.params.id;

  const room = await getRoomSession(roomId);
  if (room.error) {
    // const newRoom = await createRoom(roomId);
    res.status(200).send(room);
  } else {
    res.status(200).send(room);
  }
});

app.get("/create-meeting/:id", async function (req, res) {
  const roomId = req.params.id;

  const room = await getRoom(roomId);
  console.log(room);
  if (room.error) {
    const newRoom = await createRoom(roomId);
    console.log(newRoom);
    res.status(200).send(newRoom);
  } else {
    res.status(200).send(room);
  }
});

module.exports = (app);