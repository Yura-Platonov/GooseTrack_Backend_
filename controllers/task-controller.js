import Task from "../models/task.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";


const getTask = async (req, res, next) => {
     const { _id: owner } = req.user;
    const { month, year } = req.query;
    if (!month || !year) {
        throw HttpError(400, "Місяць та рік є обов'язковими параметрами.");
    }
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const filter = { owner };
    const tasks = await Task.find({
        ...filter,
      date: {
        $gte: startDate.toISOString(),
        $lte: endDate.toISOString(),
      },
    }).populate("owner");
  if (!tasks.length) {
    throw HttpError(400, "Завдань не знайдено.");
  }
    res.status(200).json({ tasks });
};
 
const addTask = async (req, res, next) => {
    const { title, start, end, priority, date, category } = req.body;
    const owner = req.user._id;
    const newTask = await Task.create({
      title,
      start,
      end,
      priority,
      date,
      category,
      owner,
    });
 res.status(201).json({ task: newTask });
 }

const editTask = async (req, res, next) => {
    const taskId = req.params.taskId;
    const { title, start, end, priority, date, category } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, owner: req.user._id },
      {
        title,
        start,
        end,
        priority,
        date,
        category,
      },
      { new: true } 
    );
    if (!updatedTask) {
      throw HttpError(
        404,
        "Завдання не знайдено або немає прав на редагування."
      );
    }
    res.status(200).json({ task: updatedTask });
}
 
const deleteTask = async (req, res, next) => {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      owner: req.user._id,
    });

    if (!deletedTask) {
      throw HttpError(404, "Завдання не знайдено або немає прав на видалення.");
    }

    res.status(200).json({ message: "Завдання було видалено." });
};

export default {
  getTask: ctrlWrapper(getTask),
  addTask: ctrlWrapper(addTask),
  editTask: ctrlWrapper(editTask),
  deleteTask: ctrlWrapper(deleteTask),
};