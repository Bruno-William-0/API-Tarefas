import { Request, Response } from 'express'
import Task from '../../models/task'

export default class TaskController {
  static async store (req: Request, res: Response) {
    const { title, completed } = req.body

    if (!title) {
       res.status(400).json({ error: 'O título é obrigatório' })
    }

    const task = new Task()
    task.title = title
    task.completed = completed || false
    await task.save()

    res.status(201).json(task)
    return
  }

  static async index (req: Request, res: Response) {
    const tasks = await Task.find()
 res.json(tasks)
 return
  }

  static async show (req: Request, res: Response) {
    const { id } = req.params

    if(!id || isNaN(Number(id))) {
    res.status(400).json({ error: 'O id é obrigatório' })
    }

    const task = await Task.findOneBy({id: Number(id)})
    res.json(task)
    return
  }
}