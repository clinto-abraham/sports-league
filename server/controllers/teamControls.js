import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import TeamModel from "../Models/teamModel.js";

// 
export const createTeam = async (req, res,next) => {
  const post = req.body;

  const newPostMessage = new TeamModel({ ...post, createdAt: new Date().toISOString() })

  try {
      await newPostMessage.save();

      res.status(201).json(newPostMessage);
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
  next();
}


export const getTeam = async (req, res, next) => {
  try {
    const teamInfo = await TeamModel.find();

    const log = res.status(200).json(teamInfo);
    console.log(log);
  } catch (error) {
    res.status(404).json(error);
  }
  next();
};

 // let new_array = array.map(element => element.id == 2 ? {...element, name : 'New Name'} : element);
export const updateTeam = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No teams with id: ${id}`);
  
   
    const updatedPost  = {
      players: [req.body.players],
    };

    await TeamModel.findByIdAndUpdate(id, updatedPost , { new: true });

    res.status(200).json(updatedPost);
  next();
};

export const deleteTeam = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await TeamsModel.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully." });
  next();
};

export default router;