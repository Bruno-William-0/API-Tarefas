import { Request, Response, NextFunction } from 'express'
import Token from '../models/Token'

export default async function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) { res.status(401).json({ error: 'Token não informado' })
return}

  // Verifica se o token existe
  const userToken = await Token.findOneBy({ token: authorization })
  if (!userToken)  {res.status(401).json({ error: 'Token inválido' })
return}
  // Verifica se o token expirou
  if (userToken.expiresAt < new Date()) {
    await userToken.remove()
    res.status(401).json({ error: 'Token expirado' })
    return
}

  // Adiciona o id do usuário no header da requisição
  req.headers.userId = userToken.userId.toString()

  // Continua a execução
  next()
}