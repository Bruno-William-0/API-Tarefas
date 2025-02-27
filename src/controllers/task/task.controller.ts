import { Request, Response } from 'express'
import Task from '../../models/Task'

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

  static async delete (req: Request, res: Response) {
    const { id } = req.params

    if(!id || isNaN(Number(id))) {
       res.status(400).json({ error: 'O id é obrigatório' })
       return
    }

    const task = await Task.findOneBy({id: Number(id)})
    if (!task) {
      res.status(404).json({ error: 'Task não encontrada' })
      return
    
    }

    await task.remove()
    res.status(204).json() // Vamos retornar 204 pois não temos conteúdo para retornar
    return
}

static async update (req: Request, res: Response) {
    const { id } = req.params
    const { title, completed } = req.body

    if(!id || isNaN(Number(id))) {
     res.status(400).json({ error: 'O id é obrigatório' })
     return
    }

    const task = await Task.findOneBy({id: Number(id)})
    if (!task) {
     res.status(404).json({ error: 'Task não encontrada' })
     return
    }

    task.title = title || task.title
    task.completed = (completed === undefined) ? task.completed : completed
    await task.save()

    res.json(task) // Vamos retornar a task atualizada
    return 
  }
}